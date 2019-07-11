'use strict';

var RSVP             = require('rsvp');
var DeployPluginBase = require('ember-cli-deploy-plugin');
var fanout           = require('fanoutpub');

module.exports = {
  name: require('./package').name,

  createDeployPlugin: function(options) {
    var DeployPlugin = DeployPluginBase.extend({
      name: options.name,

      defaultConfig: {
        realmId: null,
        realmKey: null,

        channelSuffix: null,
        channel: function(context, pluginHelper) {
          var channelSuffix = pluginHelper.readConfig('channelSuffix');
          if (channelSuffix) {
            return 'release/' + channelSuffix;
          }

          return 'release';
        },

        revisionKey: function(context) {
          return context.commandOptions.revision || (context.revisionData && context.revisionData.revisionKey);
        },

        payload: function(context, pluginHelper) {
          return {
            revision: pluginHelper.readConfig('revisionKey'),
            at: (new Date()).getTime()
          }
        }
      },

      configure: function(/*context*/) {
        this.log('validating config', { verbose: true });
        ['realmId', 'realmKey', 'channelSuffix', 'channel', 'revisionKey', 'payload'].forEach(this.applyDefaultConfigProperty.bind(this));
        this.log('config ok', { verbose: true });
      },

      didActivate: function(context) {
        var realmId = this.readConfig("realmId");
        var realmKey = this.readConfig("realmKey");
        var channel = this.readConfig("channel");
        var payload = this.readConfig("payload");

        var client = new fanout.Fanout(realmId, realmKey);
        var _this = this;

        return new RSVP.Promise(function(resolve, reject) {
          client.publish(channel, payload, function(success, message, context) {
            if (success) {
              _this.log('notified ' + channel + ' of activation');
              resolve();
            } else {
              reject(message);
            }
          });
        })
      }
    });

    return new DeployPlugin();
  }
};

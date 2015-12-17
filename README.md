# ember-cli-deploy-notify-fanout

> An ember-cli-deploy plugin to notify your application of a release through [Fanout](http://fanout.io/)

[![](https://ember-cli-deploy.github.io/ember-cli-deploy-version-badges/plugins/ember-cli-deploy-notify-fanout.svg)](http://ember-cli-deploy.github.io/ember-cli-deploy-version-badges/)

This plugin will send a message through [Fanout](http://fanout.io/) that can be consumed by your application to let your users know an update has occured.

## What is an ember-cli-deploy plugin?

A plugin is an addon that can be executed as a part of the ember-cli-deploy pipeline. A plugin will implement one or more of the ember-cli-deploy's pipeline hooks.

For more information on what plugins are and how they work, please refer to the [Plugin Documentation][1].

## Quick Start

- Install this plugin

```bash
$ ember install ember-cli-deploy-notify-fanout
```

- Run the pipeline

```bash
$ ember deploy
```

## Installation
Run the following command in your terminal:

```bash
ember install ember-cli-deploy-notify-fanout
```

## ember-cli-deploy Hooks Implemented

For detailed information on what plugin hooks are and how they work, please refer to the [Plugin Documentation][1].

- `configure`
- `didActivate`

## Configuration Options

For detailed information on how configuration of plugins works, please refer to the [Plugin Documentation][1].

### realmId

The realmId from your Fanout.io configuration (see their dashboard.)

### realmKey

The realmKey from your Fanout.io configuration (see their dashboard.)

### channel

Which channel you want to publish the message too.

### payload

The payload the send with the release activation.

## Prerequisites

None

## Running Tests

- `npm test`

[1]: http://ember-cli.github.io/ember-cli-deploy/plugins "Plugin Documentation"

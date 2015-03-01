# Sendo [![Build Status](https://travis-ci.org/kakchan/sendo.svg?branch=master)](http://travis-ci.org/kakchan/sendo)

Sendo is an open source Node.js ecommerce platform. It is developed with MongoDB, Express and Angular.


## Setup Local Development Environment
### Unit Tests
Our unit tests covered both client and server sides.

- **Karma** is used for the **client** side unit testing
- **Mocha** is used for the **server** side unit testing

To run client side unit tests
```shell
	grunt test:client
```
**Note**: If you would like to use **Webstorm** with Karma Plugin, make sure set the environment variable **NODE_ENV** to **test**

To run server side unit tests
```shell
	grunt test:server
```
**Note**: If you would like to use **Webstorm** with Mocha Plugin, make sure set the environment variable **NODE_ENV** to **test**

The following command is to run both client/server unit tests
```shell
	grunt test
```

### End-to-End Tests
To setup e2e testing, you will need to update your Chrome binary path of the protractor.conf.js

```javascript
    ...
    "chromeOptions": {
      binary: "<your chrome binary path>",
      ...
    }
```

To run End-to-End Tests
```shell
	grunt test:e2e
```

**Note**: If you would like to use **Webstorm** for e2e test, please follow the following instructions:

1. set "**Javascript files**" to **node_modules/grunt-protractor-runner/node_modules/protractor/lib/cli.js** and 
2. set "**Application Parameters**" to  **protractor.intellij.conf.js**

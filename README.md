# Sendo [![Build Status](https://travis-ci.org/kakchan/sendo.svg?branch=master)](http://travis-ci.org/kakchan/sendo)

Sendo is an open source Node.js ecommerce platform.


## Setup Local Development Environment
##### Unit Tests
To run unit tests. The following command will execute all the client/server unit tests
```shell
	# grunt test
```

##### End-to-End Tests
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
	# grunt test:e2e
```

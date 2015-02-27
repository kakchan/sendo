# Sendo [![Build Status](https://travis-ci.org/kakchan/sendo.svg?branch=master)](http://travis-ci.org/kakchan/sendo)

Sendo is an open source Node.js ecommerce platform.

## Setup Local Development Environment
##### End-to-End Tests
To setup e2e testing, you will need to update your Chrome binary path of the protractor.conf.js

```javascript
    ...
    "chromeOptions": {
      binary: "/Applications/Google Chrome Stable.app/Contents/MacOS/Google Chrome", // point this to your local Chrome binary file
      ...
    }
```

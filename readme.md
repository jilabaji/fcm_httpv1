
# fcm_httpv1 - FCM Package for Push notification

### Description
fcm_httpv1 is an npm package designed for seamless communication with Google Firebase Cloud Messaging (FCM). 
It simplifies the process of sending push notifications to mobile devices by handling token creation and management internally. This package supports sending push messages to both topics and individual tokens, providing flexibility for various notification strategies.

### How to Use
Get the service Account Json file from the google cloud console and place it- in safe directory of the project, 
such a JSON file is required to initiate the Package

#### Initiallize the Package with Service Account

``` const fcmhttp = require('fcm_httpv1'); ```

``` let fcm = new fcmhttp.FCM({serviceAccount: require('./serviceAccount.json')}) ```

#### declare pushMessage

``` 
    let pushMessage = {
        'message': {
            'token':${your FCM token},
            "notification": {
                "title": ${Push notificaiton title},
                "body": ${push notification body}
            },
            "data": {
                "additionalData": "true"
            }
       }
    }

```



### To Send a Push Notification
you can call the sendtoFCM

``` await fcm.sendToFCM(pushMessage) ```


[![ISC License](https://img.shields.io/badge/License-ISC-green.svg)](https://choosealicense.com/licenses/isc/)

## Authors

- [@jilabaji](https://github.com/jilabaji)




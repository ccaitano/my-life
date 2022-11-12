import React, { Fragment } from 'react';
import { Messaging } from './Messaging';
import { requestFirebaseNotificationPermission } from './firebaseInit';

const Notification = () => {
    requestFirebaseNotificationPermission()
    .then((firebaseToken) => {
      // eslint-disable-next-line no-console
      console.log(firebaseToken);
    })
    .catch((err) => {
      return err;
    });

  return (
    <Messaging />
  )
}

export default Notification;
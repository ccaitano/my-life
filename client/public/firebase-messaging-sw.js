// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const config = {
    apiKey: "AIzaSyADfgT2o5mECYS7EoEMAD_2NLXuRNyzb54",
    authDomain: "mylife-app-5fcb4.firebaseapp.com",
    projectId: "mylife-app-5fcb4",
    storageBucket: "mylife-app-5fcb4.appspot.com",
    messagingSenderId: "386202761532",
    appId: "1:386202761532:web:79f245d49a05fbfb344639",
    measurementId: "G-R90431D8QS"
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('notificationclick', event => {
  console.log(event)
  return event;
});
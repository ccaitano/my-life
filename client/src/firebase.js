import firebaseServices from "firebase";

const config = {
    apiKey: "AIzaSyADfgT2o5mECYS7EoEMAD_2NLXuRNyzb54",
    authDomain: "mylife-app-5fcb4.firebaseapp.com",
    projectId: "mylife-app-5fcb4",
    storageBucket: "mylife-app-5fcb4.appspot.com",
    messagingSenderId: "386202761532",
    appId: "1:386202761532:web:79f245d49a05fbfb344639",
    measurementId: "G-R90431D8QS"
}

firebaseServices.initializeApp(config)


export default firebaseServices;

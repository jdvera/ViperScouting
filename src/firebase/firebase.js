import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyDbNcf9tp6plW0GUouX5fOVgahBo9CbyQo",
    authDomain: "valorscouting.firebaseapp.com",
    databaseURL: "https://valorscouting.firebaseio.com",
    projectId: "valorscouting",
    storageBucket: "valorscouting.appspot.com",
    messagingSenderId: "363828699191"
};
firebase.initializeApp(config);
export default firebase;
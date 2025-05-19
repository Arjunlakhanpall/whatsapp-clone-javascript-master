const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {

    constructor() {

        this._config = {
            // Your web app's Firebase configuration

            apiKey: "AIzaSyAOqLKcs3kvAAgoq9J4EXFsUQcA--GUsGk",
            authDomain: "whatsapp-clone-2d266.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-2d266.firebaseio.com",
            projectId: "whatsapp-clone-2d266",
            storageBucket: "whatsapp-clone-2d266.appspot.com",
            messagingSenderId: "490367898089",
            appId: "1:490367898089:web:720c318b37075dbd52fb78",
            measurementId: "G-F5ERGSVXFM"

        }

        this.init();
    }

    init() {

        if (!window._initializedFirebase) {

            // Initialize Firebase
            firebase.initializeApp(this._config);
            firebase.analytics();

            firebase.firestore().settings({
                timestampsInSnapshots: true
            });

            window._initializedFirebase = true;
        }
    }
    static db() {

        return firebase.firestore();
    }

    static hd() {

        return firebase.storage();
    }

    initAuth() {

        return new Promise((resolve, reject) => {

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(result => {

                let token = result.credential.accessToken;
                let user = result.user;

                resolve({
                    user,
                    token
                });

            }).catch(err => {

                reject(err);
            });
        });
    }
}
import 'firebase/auth';
import firebase from './firebase';

export default {
  signIn(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },
  signOut() {
    return firebase.auth().signOut();
  },
  isLoggedIn() {
    return new Promise((resolve, reject) => firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        resolve(false);
      }
    }, error => reject(error)));
  },
};

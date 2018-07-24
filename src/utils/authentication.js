import 'firebase/auth';
import firebase from './firebase';

export default {
  signIn(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },
  signOut() {
    return firebase.auth().signOut();
  },
};

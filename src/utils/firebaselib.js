import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc, query, orderBy, onSnapshot, limit, startAfter } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA64nXPXkjHUIDUgICgnmO9BuBT59kHl7E",
  authDomain: "micro-blogger-29cda.firebaseapp.com",
  projectId: "micro-blogger-29cda",
  storageBucket: "micro-blogger-29cda.appspot.com",
  messagingSenderId: "698525231996",
  appId: "1:698525231996:web:d2068b71d4061229f8d2f9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const colRef = collection(db, 'serverPosts');
export const colRefQuery = query(colRef, orderBy('date', 'desc'), limit(7));
export const firebaseStorage = getStorage(app);

export const suscribeToFirebase = async (setPostsList, setLastDocument) => {
  try {
    onSnapshot(colRefQuery, (snapshot) => {
      const posts = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setPostsList(posts);
      const lastDoc = snapshot.docs[snapshot.docs.length - 1];
      setLastDocument(lastDoc);
    })
  }
  catch (e) {
    console.log(e)
  }
};

export const suscribeToAuthChange = (setCurrentUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('Auth state change. Current user:', user);
      const userObj = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      }
      setCurrentUser(userObj);
    } else {
      setCurrentUser(null);
    }
  });
};

export const updateDocuments = async (uid, updatedFields) => {
  try {
    const querySnapshot = await getDocs(colRef);
    querySnapshot.forEach((document) => {
      if (document.data().uid === uid) {
        const docRef = doc(db, 'serverPosts', document.id);
        updateDoc(docRef, updatedFields);
      }
    });
    console.log("Documents updated successfully!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export const loadNextPage = (postsList, setPostsList, lastDocument, setLastDocument) => {
  if (!lastDocument) {
      console.log('no more posts to show')
      return
  }
  const colRefQueryLastDoc = query(colRef, orderBy('date', 'desc'), startAfter(lastDocument), limit(7));
  try {
      onSnapshot(colRefQueryLastDoc, (snapshot) => {
          const posts = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
          setPostsList([...postsList, ...posts]);
          const lastDoc = snapshot.docs[snapshot.docs.length - 1];

          if (snapshot.docs.length < 5) {
              setLastDocument(null);
          } else {
              setLastDocument(lastDoc);
          }
      });
  }
  catch (e) {
      console.log(e)
  }
};

export const updateFirebaseUser = (key, value, currentUser, setCurrentUser) => {
  updateProfile(auth.currentUser, {
      [key]: value
  }).then(() => {
      setCurrentUser({
          ...currentUser,
          [key]: value,
      });
  }).catch((error) => {
      console.log(error);
  });
};

import { FirebaseOptions, getApps, initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

const config: FirebaseOptions = {
  projectId: "form-with-multi-images-example-demo",
  storageBucket: "gs://form-with-multi-images-e-6998d.appspot.com/",
};

const emulatorHost = "localhost";
const firestorePort = 8080;
const storagePort = 9199;

export const createFirebaseClientApp = () => {
  if (!getApps().length) {
    initializeApp(config);
    const db = getFirestore();
    connectFirestoreEmulator(db, emulatorHost, firestorePort);
    const storage = getStorage();
    connectStorageEmulator(storage, emulatorHost, storagePort);
  }
};

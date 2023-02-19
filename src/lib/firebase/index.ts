import { FirebaseOptions, getApps, initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const config: FirebaseOptions = {
  projectId: "form-with-multi-images-example-demo",
};

const emulatorHost = "localhost";
const firestorePort = 8080;

export const createFirebaseClientApp = () => {
  if (!getApps().length) {
    initializeApp(config);
    const db = getFirestore();
    connectFirestoreEmulator(db, emulatorHost, firestorePort);
  }
};

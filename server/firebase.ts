// import firebase admin
import admin from 'firebase-admin';

import firebaseCreds from "./firebase.json";
// @ts-ignore
import CryptoJS from 'crypto-js';

const bytes = CryptoJS.AES.decrypt(firebaseCreds.encrypted, process.env.SECRET_KEY);
const serviceAccount = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

let init = false
let app;

if (!init) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://lifelines-13337-default-rtdb.firebaseio.com"
  });

  init = true
}

export const db = admin.app().database();

// export the firebase admin
export default admin;
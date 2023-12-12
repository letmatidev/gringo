import { initializeApp } from "firebase/app";
import {
  addDoc,
  doc,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const getVidrios = async () => {
  const response = await getDocs(collection(db, "vidrios"));
  const result = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return result;
};

export const updateVidrio = async ({ id, data, action }) => {
  const docRef = doc(db, "vidrios", id);

  try {
    await updateDoc(docRef, data);
    alert("Los cambios han sido guardados");
    action();
  } catch (err) {
    console.error("Error al actualizar el documento:", err);
    throw err;
  }
};

export const createVidrio = async ({ data, action }) => {
  const colRef = collection(db, "vidrios");

  // Verificar si ya existe un documento con el mismo nombre y precio
  const duplicateQuery = query(
    colRef,
    where("name", "==", data.name.toLowerCase()),
    where("price", "==", data.price)
  );

  const duplicateSnapshot = await getDocs(duplicateQuery);

  if (!duplicateSnapshot.empty) {
    // Ya existe un documento con el mismo nombre y precio, manejar según necesidades
    alert(
      `El tipo de vidrio ya se encuentra en el sistema: ${
        duplicateSnapshot.docs[0].data().name
      }`
    );
    return;
  }

  try {
    const newDocRef = await addDoc(colRef, data);
    alert("Se agregó un nuevo tipo de vidrio al sistema");
    action();
    // return newDocRef.id; // Devuelve el ID del nuevo documento creado
  } catch (error) {
    console.error("Error al agregar nuevo tipo de vidrio:", error);
    throw error;
  }
};

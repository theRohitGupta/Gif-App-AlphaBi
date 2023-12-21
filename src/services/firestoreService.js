// firebaseFunctions.js
"use client"
import { db } from './firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export const getItems = async (email) => {
  console.log("INSIDE FETCH DATA",email)
  try {
    const querySnapshot = await getDocs(collection(db, 'users', email, "favourites"));
    // return querySnapshot.docs.map((doc) => ({
    //   id: doc.id,
    //   ...doc.data(),
    // }));
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    return data
  } catch (error) {
    console.error('ERROR FETCHING DATA', error);
    return [];
  }
};

export const addItem = async (email,newItem) => {
  try {
    await addDoc(collection(db, 'users', email, "favourites"), {
      item: newItem,
    });
  } catch (error) {
    console.error('ERROR ADDING ITEM', error);
  }
};

export const updateItem = async (id, updatedItem) => {
  try {
    const itemRef = doc(db, 'items', id);
    await updateDoc(itemRef, {
      name: updatedItem,
    });
  } catch (error) {
    console.error('ERROR UPDATING ITEM', error);
  }
};

export const deleteItem = async (id) => {
  try {
    const itemRef = doc(db, 'items', id);
    await deleteDoc(itemRef);
  } catch (error) {
    console.error('ERROR DELETING ITEM', error);
  }
};

// firebaseFunctions.js
"use client"
import toast from 'react-hot-toast';
import { db } from './firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

export const getItems = async (email) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users', email, "favourites"));
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

export const addItem = async (email,gif) => {
  try {
    await addDoc(collection(db, 'users', email, "favourites"), {
      item: gif,
    });
    toast.success("Added Gif into Favourites")
  } catch (error) {
    console.error('ERROR ADDING ITEM', error);
  }
};

export const deleteItem = async (email, id) => {
  // console.log(id)
  try {
    const itemRef = doc(db, 'users', email, 'favourites', id);
    await deleteDoc(itemRef);
    toast.success('Removed Gif From Favourites');
  } catch (error) {
    console.error('ERROR DELETING ITEM', error);
  }
};

import {initializeApp} from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, getDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBrL38mHVtUIQXKK4qN_h2MzU1Za9AX6jw",
  authDomain: "test-f42aa.firebaseapp.com",
  projectId: "test-f42aa",
  storageBucket: "test-f42aa.appspot.com",
  messagingSenderId: "714484858761",
  appId: "1:714484858761:web:6848609ca147c9c2f4eb58"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const collName = 'users'

async function createUser(name,email,phone){
  const newDoc = await addDoc(collection(db,collName),{ name,email,phone })
  return newDoc.id
}

async function getUsers(){
  const usersCol = collection(db,collName)
  const userList = await getDocs(usersCol)

  const users = []

  userList.docs.forEach(x =>{
    const {name,email,phone} = x.data()
    users.push({
      id: x.id,
      name,email,phone
    })
  })

  return users
}

async function getUserById(id){
  const ref = doc(db, collName, id)
  const refdoc = await getDoc(ref)
  const {name,email, phone} = refdoc.data()
  return {id: refdoc.id, name,email,phone}
}

async function deleteUser(id){
  const ref = doc(db, collName, id)
  const refdoc = await getDoc(ref)
  await deleteDoc(refdoc.ref)
}

async function editUser(id, name,email,phone){
  const ref = doc(db, collName, id)
  const refdoc = await getDoc(ref)

  const updates = {name,email,phone }
  await updateDoc(refdoc.ref, updates);
}

export { createUser, getUsers, getUserById, deleteUser, editUser }

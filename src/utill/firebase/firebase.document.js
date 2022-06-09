import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  getDocs,
  addDoc,
  where,
  updateDoc,
} from "firebase/firestore";

import { db } from "./firebase.config";

export const createandAddRoomDocuments = async (roomId, user) => {
  const roomDocRef = collection(db, "rooms");
  const roomQuery = query(roomDocRef, where("roomName", "==", roomId));

  const roomSnapshot = await getDocs(roomQuery);
  const { email, displayName, id } = user;

  if (roomSnapshot.empty) {
    console.log("roomSnapShot ", roomSnapshot);
    try {
      const newRoom = await addDoc(roomDocRef, {
        roomName: roomId,
        userList: [{ email, displayName, id }],
      });
      // await setDoc(doc(newRoom, "userList", id), {
      //   email,
      //   displayName,
      //   id,
      // });

      return newRoom;
    } catch (error) {
      console.log("error occur from adding room ", error);
    }
  } else {
    try {
      const newRoomRef = doc(roomDocRef, roomSnapshot.docs[0].id);
      await setDoc(
        newRoomRef,
        {
          userList: [
            ...roomSnapshot.docs[0].data().userList,
            {
              email,
              displayName,
              id,
            },
          ],
        },
        { merge: true }
      );
    } catch (error) {
      console.log("error occur from updating room ", error);
    }
  }

  return roomSnapshot.docs[0];
};

export const getUserRoomArray = async (user) => {
  const roomDocRef = collection(db, "rooms");
  // const roomQuery = query(roomDocRef, where("userList", "in", [user.id]));

  const userRoomSnapshot = await getDocs(roomDocRef);
  const myRoomSnapshot = userRoomSnapshot.docs.filter((roomDoc) =>
    roomDoc.data().userList.find((users) => users.id.includes(user.id))
  );
  return myRoomSnapshot;
};

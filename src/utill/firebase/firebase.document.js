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

// user 가 있는 방 가져오기
export const getUserRoomArray = async (user) => {
  const roomDocRef = collection(db, "rooms");
  const userRoomSnapshot = await getDocs(roomDocRef);
  const myRoomSnapshot = userRoomSnapshot.docs.filter((roomDoc) =>
    roomDoc.data().userList.find((users) => users.id.includes(user.id))
  );
  return myRoomSnapshot;
};

// message 업로드 하는 기능 추가 room 안에서 message 교환하니까
// useparam으로 room id 가져와서 doc(db, "rooms", roomid)로 들어가서
// update message 하든 addDoc을 하던

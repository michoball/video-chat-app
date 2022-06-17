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
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";

import { db } from "./firebase.config";

//방 새로이 만들기
export const createRoomDocuments = async (roomName, user) => {
  const roomDocRef = collection(db, "rooms");
  const { email, displayName, id } = user;

  try {
    const timestamp = serverTimestamp();

    const newRoom = await addDoc(roomDocRef, {
      roomName,
      timestamp,
      userList: [{ email, displayName, id }],
    });
    console.log(newRoom);

    return newRoom;
  } catch (error) {
    console.log("error occur from adding room ", error);
  }
};

// 작동이 안되는 중....
export const addMyRoomToUsersDocuments = async (roomId, user) => {
  const roomRef = doc(db, "rooms", roomId);
  const roomSnapshot = await getDoc(roomRef);

  const userRef = doc(db, "users", user.id);
  const myRoomRef = doc(userRef, "myRooms", roomId);
  const myRoomSnapshot = await getDoc(myRoomRef);

  console.log("myRoomSnapshot :", myRoomSnapshot);

  try {
    // update 내방 정보
    if (myRoomSnapshot.exists()) {
      await deleteDoc(myRoomRef);
    } else {
      // 내방 없으면
      const newRoomData = {
        roomName: roomSnapshot.data().roomName,
        roomId: roomId,
        timestamp: roomSnapshot.data().timestamp,
        userList: roomSnapshot.data().userList,
      };
      await setDoc(myRoomRef, newRoomData);
    }
  } catch (error) {
    console.log(" error occur from add My Room : ", error);
  }
};

// 방 id 입력해서 들어가기

export const findRoomAndAddInfoDocuments = async (roomId, user) => {
  const { email, displayName, id } = user;

  const roomDocRef = doc(db, "rooms", roomId);
  const roomSnapshot = await getDoc(roomDocRef);

  console.log(roomSnapshot.data());

  if (!roomSnapshot.exists()) return alert("Try another room Id");
  try {
    if (
      roomSnapshot.data().userList.find((roomUser) => roomUser.id === user.id)
    ) {
      return { id: roomId, ...roomSnapshot.data() };
    } else {
      await setDoc(
        roomDocRef,
        {
          userList: [
            ...roomSnapshot.data().userList,
            {
              email,
              displayName,
              id,
            },
          ],
        },
        { merge: true }
      );
    }
  } catch (error) {
    console.log("error occur from adding room ", error);
  }

  return { id: roomId, ...roomSnapshot.data() };
};

// user를 방에서 삭제하기
export const deleteUserRoom = async (roomId, user) => {
  const roomDocRef = doc(db, "rooms", roomId);
  const userRoomSnapshot = await getDoc(roomDocRef);

  const newUserList = userRoomSnapshot
    .data()
    .userList.filter((roomUser) => roomUser.id !== user.id);

  if (newUserList.length === 0) {
    await deleteDoc(roomDocRef);
  } else {
    await updateDoc(roomDocRef, {
      userList: newUserList,
    });
  }
  console.log(userRoomSnapshot.id);

  return userRoomSnapshot.id;
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

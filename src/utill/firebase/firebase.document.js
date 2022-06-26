import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  getDocs,
  addDoc,
  updateDoc,
  serverTimestamp,
  deleteDoc,
  orderBy,
} from "firebase/firestore";

import { db } from "./firebase.config";
import { auth } from "./firebase.auth";

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

// 방 id 입력해서 들어가기
export const joinRoomAndAddInfoDocuments = async (roomId, user) => {
  const { email, displayName, id } = user;
  const roomDocRef = doc(db, "rooms", roomId);
  const roomSnapshot = await getDoc(roomDocRef);

  if (!roomSnapshot.exists()) {
    alert("Try another room Id");
    return null;
  }

  try {
    if (roomSnapshot.data().userList.find((roomUser) => roomUser.id === id)) {
      return {
        id: roomId,
        ...roomSnapshot.data(),
      };
    } else if (roomSnapshot.data().userList.length >= 5) {
      alert("The room you entered is full :/");
      return null;
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
      return { id: roomId, ...roomSnapshot.data() };
    }
  } catch (error) {
    console.log("error occur from adding room ", error);
  }
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

  const userRef = doc(db, "users", user.id);
  const myRoomRef = doc(userRef, "myRooms", roomId);
  const myRoomSnapshot = await getDoc(myRoomRef);

  if (myRoomSnapshot.exists()) {
    await deleteDoc(myRoomRef);
  }

  return userRoomSnapshot.id;
};

export const updateMyRoomToUsersDocuments = async (roomId, currentUser) => {
  const roomRef = doc(db, "rooms", roomId);
  const roomSnapshot = await getDoc(roomRef);

  const userRef = doc(db, "users", currentUser.id);
  const myRoomRef = doc(userRef, "myRooms", roomId);
  const myRoomSnapshot = await getDoc(myRoomRef);

  try {
    const newRoomData = {
      roomName: myRoomSnapshot
        ? myRoomSnapshot.data().roomName
        : roomSnapshot.data().roomName,
      roomId: roomId,
      timestamp: roomSnapshot.data().timestamp,
      userList: roomSnapshot.data().userList,
    };
    await setDoc(myRoomRef, newRoomData);

    return newRoomData;
  } catch (error) {
    console.log(" error occur from add My Room : ", error);
  }
};

//방이름 편집하기
export const UpdateUserRoomName = async (roomId, newRoomName) => {
  const userRef = doc(db, "users", auth.currentUser.uid);
  const userRoomRef = doc(userRef, "myRooms", roomId);

  try {
    await updateDoc(userRoomRef, {
      roomName: newRoomName,
    });
  } catch (error) {
    console.log(" error occur from update room Name~~!!", error);
  }
};

// user 가 있는 방 가져오기
export const getUserRoomArray = async (user) => {
  const userRef = doc(db, "users", user.id);
  const roomDocRef = collection(userRef, "myRooms");
  const roomQuery = query(roomDocRef, orderBy("timestamp"));

  const roomQuerySnapshot = await getDocs(roomQuery);

  // const myRoomSnapshot = userRoomSnapshot.docs.filter((roomDoc) =>
  //   roomDoc.data().userList.find((users) => users.id.includes(user.id))
  // );

  let myRoomSnapshot = [];
  roomQuerySnapshot.docs.forEach((userRoom) =>
    myRoomSnapshot.push({ id: userRoom.id, ...userRoom.data() })
  );

  return myRoomSnapshot;
};

// message 업로드 하는 기능 추가 ?

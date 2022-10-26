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
  DocumentReference,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";

import { db } from "./firebase.config";
import { auth, UserData } from "./firebase.auth";

export type RoomData = {
  // id: string;
  roomName: string;
  timestamp: Date;
  userList: UserData[];
};

//방 새로이 만들기
export const createRoomDocuments = async (
  roomName: string,
  user: UserData
): Promise<DocumentReference<DocumentData> | void> => {
  const roomDocRef = collection(db, "rooms");
  const { email, displayName, id } = user;

  try {
    const timestamp = serverTimestamp();

    const newRoom = await addDoc(roomDocRef, {
      roomName,
      timestamp,
      userList: [{ email, displayName, id }],
    });
    console.log(newRoom.id);

    return newRoom as DocumentReference<DocumentData>;
  } catch (error) {
    console.log("error occur from adding room ", error);
  }
};

// 방 id 입력해서 들어가기
export const joinRoomAndAddInfoDocuments = async (
  roomId: string,
  user: UserData
): Promise<QueryDocumentSnapshot<RoomData> | void> => {
  const { email, displayName, id } = user;
  const roomDocRef = doc(db, "rooms", roomId);
  const roomSnapshot = await getDoc(roomDocRef);

  if (!roomSnapshot.exists()) {
    alert("Try another room Id");
    return;
  }

  try {
    if (
      roomSnapshot
        .data()
        .userList.find((roomUser: UserData) => roomUser.id === id)
    ) {
      return {
        ...roomSnapshot.data(),
      } as QueryDocumentSnapshot<RoomData>;
    } else if (roomSnapshot.data().userList.length >= 5) {
      alert(`The room ${roomSnapshot.data().roomName} is full :/`);
      return;
    } else {
      await setDoc(
        roomDocRef,
        {
          userList: [
            ...roomSnapshot.data().userList,
            {
              email,
              displayName,
            },
          ],
        },
        { merge: true }
      );
      return {
        ...roomSnapshot.data(),
      } as QueryDocumentSnapshot<RoomData>;
    }
  } catch (error) {
    console.log("error occur from adding room ", error);
  }
};

// user를 방에서 삭제하기
export const deleteUserRoom = async (
  roomId: string,
  user: UserData
): Promise<string | void> => {
  const roomDocRef = doc(db, "rooms", roomId);
  const userRoomSnapshot = await getDoc(roomDocRef);
  if (!userRoomSnapshot.exists()) return;

  const newUserList = userRoomSnapshot
    .data()
    .userList.filter((roomUser: UserData) => roomUser.id !== user.id);

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

// 방 정보 유저의 myRooms collection에 update하기
export const updateMyRoomToUsersDocuments = async (
  roomId: string,
  currentUser: UserData
): Promise<RoomData | void> => {
  const roomRef = doc(db, "rooms", roomId);
  const roomSnapshot = await getDoc(roomRef);
  if (!roomSnapshot.exists()) {
    throw Error("room doesn't exist");
  }
  const userRef = doc(db, "users", currentUser.id);
  const myRoomRef = doc(userRef, "myRooms", roomId);
  const myRoomSnapshot = await getDoc(myRoomRef);

  try {
    const newRoomData = {
      roomName: myRoomSnapshot.exists()
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
export const UpdateUserRoomName = async (
  roomId: string,
  newRoomName: string
): Promise<void> => {
  if (!auth.currentUser) {
    console.log("No current User");
    return;
  }
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
export const getUserRoomArray = async (
  user: UserData
): Promise<QueryDocumentSnapshot<RoomData>[]> => {
  // 유저 컬렉션 안 유저의 방 컬렉션에서 방 목록 가져오기
  // 이렇게 해야 각자 방이름을 따로 만들어서 저장할 수 있음
  let myRoomSnapshot = [] as QueryDocumentSnapshot<RoomData>[];

  const userRef = doc(db, "users", user.id);
  const roomDocRef = collection(userRef, "myRooms");
  const roomQuery = query(roomDocRef, orderBy("timestamp"));
  const roomQuerySnapshot = await getDocs(roomQuery);

  roomQuerySnapshot.docs.forEach((userRoom) =>
    myRoomSnapshot.push(userRoom.data() as QueryDocumentSnapshot<RoomData>)
  );

  // rooms 컬렉션에서 방 가져오기
  // const roomRef = collection(db, "rooms");
  // const roomQuery = query(roomRef, orderBy("timestamp"));
  // const userRoomSnapshot = await getDocs(roomQuery);
  // const roomSnapshot = userRoomSnapshot.docs.filter((roomDoc) =>
  //   roomDoc.data().userList.find((users) => users.id.includes(user.id))
  // );
  // roomSnapshot.forEach((userRoom) =>
  //   myRoomSnapshot.push({ id: userRoom.id, ...userRoom.data() })
  // );

  return myRoomSnapshot;
};

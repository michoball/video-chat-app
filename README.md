📸 VIDEO CHAT ROOM
=================

<div align="center">
 <img src="https://user-images.githubusercontent.com/79836148/176141888-bd85687d-0a49-4074-9a00-769c76eeca5c.png" width="700px" height="450px" title="video chat app" alt="video chat app 메인 이미지"></img><br/>



바로가기 [Go to the App](https://video-chat-app-neon.vercel.app/)

</div>

# 😄 소개 
친구들과 소규모 화상채팅을 위한 소박한 공간!   
멀리사는 친구들과 얼굴보고 재미있는 영상이나 사진보며 웃고 떠들고 싶어서 만든 App  
<br/>
코로나가 한창 심할 때 친구들과 만나지는 못하고 아쉬운대로 줌을 이용하여 비대면 만남을 가진경험을 바탕으로 개발   
친한친구끼리 서로 화면을 켜고 수다떨고 같이 재미있는 영상을 보며 놀 수 있는 창구를 마련하고 싶어 만들어보았습니다.

# 🤖 기술스택


 <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"><img src="https://img.shields.io/badge/styled_components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"><img src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=MUI&logoColor=white"><br/>
 <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"><img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"><img src="https://img.shields.io/badge/Redux_Saga-999999?style=for-the-badge&logo=Redux-Saga&logoColor=white"><br/> 
 <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white"><img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white">



### Agora SDK 
<img src="https://user-images.githubusercontent.com/79836148/176159030-a82929c0-1cdf-4d39-86fa-5141bc6eaf0a.png" width="300px" height="100px" title="agora 로고" alt="agora"></img>  agora 로고    
 둘러보기 [Agora](https://www.agora.io/en/)

해외 유명 소셜 미디어 ClubHose 에서 실시간 음성채팅을 위해 사용된 서비스    
Agora에서 제공하는 Live video call 과 Real Time messaging sdk 를 이용하여 화상 채팅과 메시지 채팅기능 생성  



# 💻 기능   

| 기능 | 세부 내용 | 시연 모습 |
|:--:|:--:|:--:|
| 유저 로그인 | - 기본적인 email, password 로그인과 google OAuth 로그인 지원 <br/>    - 로그인에서 회원가입 페이지전환  |<img src="https://user-images.githubusercontent.com/79836148/176622200-a179ce90-447c-4264-9216-c713db84ff28.gif" width="60%" height="60%" /> |
| Lobby에서 간단한 Room CRUD 기능 지원 | - Join 으로 새로운 Room 아이디 입력 후 입장<br/> -Create 로 새로운 Room 이름으로 생성<br/> - 편집 버튼으로 Room 이름 편집(나에게만)<br/> - 삭제 버튼으로 Room 삭제 ( 다른 유저들은 그대로 잔류, 유저가 없을 시 DB에서 완전 삭제 |<img src="https://user-images.githubusercontent.com/79836148/176622316-3cba81d9-db82-4014-9672-715a432f394c.gif" width="60%" height="60%" />|
| Agora SDK를 활용한 화상 채팅 & 실시간 메세지 교환| - Agora SDK의 rtc-sdk 와 rtm sdk를 활용하여 video call 과 message call 파트를 생성 |<img src="https://user-images.githubusercontent.com/79836148/176708551-46dd381c-0ca0-4b01-8cb0-673ea545ede8.gif" width="60%" height="60%" /> |
| Room 안에서 유저들 화면 big size 조정 기능 | - 각 유저들의 화면 클릭 시 big 사이즈로 전환<br/> - Big 사이즈 유저 이외에는 small 사이즈가 됨<br/> |<img src="https://user-images.githubusercontent.com/79836148/176708023-d8825b60-6314-41e2-bb68-7075a44bef77.gif" width="60%" height="60%" />|
| Setting 버튼으로 메인 테마 색 변경 & Room Id 복사 기능 | ⚙️ 버튼 클릭시 App 테마 색 변경 가능<br/>  📄 버튼으로 현재 Room Id 카피|<img src="https://user-images.githubusercontent.com/79836148/176622375-3ff4beb8-cd1b-4c7b-ad40-764019c5882c.gif" width="60%" height="60%" /> | 
| Room 안 영상 컨트롤러 기능 지원 | - 유저가 컨트롤러의 각 기능들 클릭시 음소거, 화면 끄기, 화면 공유, 방 나가기 기능 지원|<img src="https://user-images.githubusercontent.com/79836148/176622258-ce645368-e9b6-4e09-989e-36bf340fb4da.gif" width="60%" height="60%" /> |
| 화면 공유 기능| contorl의 내 화면을 공유기능으로 화면을 공유 |<img src="https://user-images.githubusercontent.com/79836148/176710541-8b7ba0f4-f287-4344-a1a7-9bcc78a9a9a9.gif" width="60%" height="60%" />  |



# 🛠️ 특징


#### Local user 화면, Remote user 화면, Share 화면과 봇, Local 사용자 그리고 remote사용자 메세지에 따른 다른 *UI 적용 간편화*를 고려한    
#### Message Content & Video Player 컴포넌트 코드
 
 > 각 상황에 맞는 TYPE을 지정,  prop으로 들어온 type에 맞는 style을 반환해주는 **getType** 코드 적용
 
 > VideoPlayer.jsx Code Snippet   
 ```js
 export const VIDEO_TYPE_CLASS = {
  base: "base",
  local: "local",
  share: "share",
  small: "small",
};

const getVideoType = (VideoType = VIDEO_TYPE_CLASS.base, share) =>
  ({
    [VIDEO_TYPE_CLASS.base]: share ? SmallVideoContainer : BaseVideoContainer,
    [VIDEO_TYPE_CLASS.local]: LocalVideoContainer,
    [VIDEO_TYPE_CLASS.share]: ShareVideoContainer,
    [VIDEO_TYPE_CLASS.small]: SmallVideoContainer,
  }[VideoType]);

function VideoPlayer({ rtcUser, track, videoType }) {

  const CustomVideoContainer = getVideoType(videoType, share);

  return (
    <CustomVideoContainer>
      { video 재생을 위한 코드 }
    </CustomVideoContainer>
  );
}

export default VideoPlayer;
 ```

#### firebase Auth의 관찰자를 이용 유저의 login 세션을 관리
 > firebase/auth의 onAuthStateChanged 관찰자를 이용 유저의 로그인 로그아웃 상태를 관리   
 > 초기 관찰자 사용모습 firebase.auth.js & userContext.js Code Snippet   

 ```js
 // firebase.auth
 export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
 ```
  ```js
 // userContext 
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      let userAuth = null;
      if (user) {
        const userSnapshot = await createUserDocumentFromAuth(user);
        userAuth = { id: userSnapshot.id, ...userSnapshot.data() };
      }
      setCurrentUser(userAuth);
    });
    return unsubscribe;
  }, []);
 ```
 > redux-saga 사용 후 모습 firebase.auth.js Snippet   
 > 유저 auth 상태관리를 위해 위 비동기 함수를 합침
 ```js
 // firebase.auth
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
 ```
# 이슈 

- Agora rtc SDK 의 동시 화상 통화 지원인원이 최대 25명으로 나와 있지만 실제 5명이서 통화를 한 결과 속도가 현저히 떨어지는 것을 느꼈다
  StackoverFlow와 Agora FAQ에 보면 7명 밑의 인원을 추천하는 것으로 나와 있어 화상통화 인원을 늘리는 것은 힘들어보인다.     
   > 관련글 stackoverFlow [클릭](https://stackoverflow.com/questions/58000316/maximum-number-of-participants-on-an-agora-video-call-unity3d) Agora VideoCall FAQ [클릭](https://docs.agora.io/en/Video/faq/capacity)
- Agora 자체적인 이슈 이외에 room에 유저가 들어올 때마다 Agora rtc가 너무 많이 user publish & unpublish Event를 듣고 있는 것을 확인,  
  video call 안의 useEffect 훅 떄문에 많은 publish& unpublish event가 발생한다고 판단하여 이를 줄이기위해 불필요한 dependency를 제거했지만 여전히 불필요한 reRendering이 조금 발생. 
  
  
# 📝 Todo 리스트 

 - [x] 기존 반응형 비디오 UI 개선
 - [x] lobby에서 join버튼 ux 수정 & 유저의 room list 최신버전으로 fetch 할 수 있도록 개선 
 - [ ] 유저 avatar 추가
 - [ ] TypeScript로 변환해서 정적으로 타입을 명시하고 여러 변수와 함수의 목적을 분명히하기
 - [ ] 방에 참여한 유저들 이름 tag를 video에 붙이기


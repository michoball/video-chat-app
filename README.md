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
<img src="https://user-images.githubusercontent.com/79836148/176159030-a82929c0-1cdf-4d39-86fa-5141bc6eaf0a.png" width="300px" height="100px" title="agora 로고" alt="agora"></img>   

해외 유명 소셜 미디어 clubhouse에서 실시간 음성채팅을 위해 사용된 서비스    
Agora에서 제공하는 Live video call 과 Real Time messaging sdk 를 이용하여 화상 채팅과 메시지 채팅기능 추가     
둘러보기 [Agora](https://www.agora.io/en/)


# 💻 기능   
| 기능 | 세부 내용 | 시연 모습 |
|:--:|:--|:--:|
| 유저 로그인 | - 기본적인 email, password 로그인과 google OAuth 로그인 지원 <br/>    - 로그인에서 회원가입 페이지전환  | |
| Agora SDK를 활용한 화상 채팅 & 실시간 메세지 교환| - Agora SDK의 rtc-sdk 와 rtm sdk를 활용하여 video call 과 message call 파트를 생성 | |
| Room 안에서 유저들 화면 big size 조정 기능 | - 각 유저들의 화면 클릭 시 big 사이즈로 전환<br/> - Big 사이즈 유저 이외에는 small 사이즈가 됨<br/> ||
| Room 안 영상 컨트롤러 기능 지원 | - 유저가 컨트롤러의 각 기능들 클릭시 음소거, 화면 끄기, 화면 공유, 방 나가기 기능 지원| |
| Lobby에서 간단한 Room CRUD 기능 지원 | - Join 으로 새로운 Room 아이디 입력 후 입장<br/> -Create 로 새로운 Room 이름으로 생성<br/> - 편집 버튼으로 Room 이름 편집(나에게만)<br/> - 삭제 버튼으로 Room 삭제 ( 다른 유저들은 그대로 잔류, 유저가 없을 시 DB에서 완전 삭제 ||
| Setting 버튼으로 메인 테마 색 변경 & Room Id 복사 기능 | ⚙️ 버튼 클릭시 App 테마 색 변경 가능<br/>  📄 버튼으로 현재 Room Id 카피| | 
| 반응형 채팅방 | 화면 사이즈에 따른 반응형 video & message 사이즈 조정 | |


# 주요 특징

#### Local user 화면, Remote user 화면, Share 화면과 봇, Local 사용자 그리고 remote사용자 메세지에 따른 다른 *UI 적용 간편화*를 고려한    
#### Message Content & Video Player 컴포넌트 코드
 
 > 각 상황에 맞는 TYPE을 지정,  prop으로 들어온 type에 맞는 style을 반환해주는 **getType** 코드 적용
 
 > VideoPlayer.jsx Code Snippet   
 ```jsx
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
    <CustomVideoContainer
      onClick={
        !share && videoType !== VIDEO_TYPE_CLASS.local
          ? toggleSizeHandler
          : undefined}>
      {track || rtcUser.hasVideo ? <Video videoTrack={track} /> : <CamIcon />}
    </CustomVideoContainer>
  );
}

export default VideoPlayer;
 ```
 
  > MessageContent.jsx Code Snippet   
  ```jsx
  export const MESSAGE_TYPE = { me: "me", other: "other", bot: "bot",}; 

const getMessageType = (from) =>
  ({
    [MESSAGE_TYPE.me]: MyMessage,
    [MESSAGE_TYPE.other]: OtherMessage,
    [MESSAGE_TYPE.bot]: BotMessage,
  }[from]);

const getContainerType = (from) =>
  ({
    [MESSAGE_TYPE.me]: MyContainer,
    [MESSAGE_TYPE.other]: MessageContainer,
    [MESSAGE_TYPE.bot]: BotContainer,
  }[from]);

function MessageContent({ message }) {
  const { from, displayName } = message;
  const CustomContainer = getContainerType(from);
  const CustomMessage = getMessageType(from);

  return (
    <CustomContainer>
      <span>{displayName && displayName}</span>
      <CustomMessage>{message.message}</CustomMessage>
    </CustomContainer>
  );
}

export default MessageContent; 
 ```




# 추가 개선사항

 - TypeScript로 변환해서 정적으로 타입을 명시하고 여러 변수와 함수의 목적을 분명히하기
 - 방에 참여한 유저들 이름 tag를 video에 붙이기
 - message 말고 다른 종류의 파일주고 받는기능 
 - 유저 avatar 추가


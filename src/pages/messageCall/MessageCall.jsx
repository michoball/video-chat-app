import { config } from "../../utill/Agora.config";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { RtcContext } from "../../context/rtcContext";
import { UserContext } from "../../context/userContext";
import { createInstance } from "agora-rtm-sdk";
import MessageContent from "../../components/message/MessageContent";

import {
  MessageCallContainer,
  Header,
  FormContainer,
  MessageConainer,
  EndOfMessage,
} from "./MessageCall.styles";
// 임의로 만드는 message Uid
const messageUid = () => {
  return Math.floor(Math.random() * 100000 + Math.random() * 10000).toString();
};

function MessageCall() {
  const { roomId } = useParams();
  const { toggleStart, localUser } = useContext(RtcContext);
  // const { currentUser } = useContext(UserContext);
  const [channel, setChannel] = useState(null);
  const messageRef = useRef("");
  const endfMessagesRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [rtmClient, setRtmClient] = useState({});

  useEffect(() => {
    const init = async () => {
      const RTMclient = createInstance(config.appId);
      await RTMclient.login({ uid: String(localUser.user.uid), token: null });
      const rtmChannel = RTMclient.createChannel(roomId);
      await rtmChannel.join();

      if (rtmChannel) {
        setChannel(rtmChannel);
        // setRtmClient(RTMclient);
        // console.log("RTMClient : ", RTMclient);
      }
    };
    init();
  }, [localUser]);

  useEffect(() => {
    const init = async (channel) => {
      channel.on("MemberJoined", async (MemberId) => {
        console.log("NEW Member Joined~!!", MemberId);
      });

      channel.on("MemberLeft", (MemberId) => {
        console.log("leaving", MemberId);
      });

      channel.on("ChannelMessage", async (messageData, MemberId) => {
        let data = JSON.parse(messageData.text);
        const messageuid = messageUid();

        const reciveMessageData = {
          ...data,
          id: messageuid,
          from: "others",
        };
        setMessages((prevState) => {
          return [...prevState, reciveMessageData];
        });

        console.log("A new Message was recieved ", data);
      });

      console.log("rtmClient", rtmClient);
      toggleStart(true);
      scrollToBottom();
    };

    if (channel) {
      console.log("starting Message point", roomId, channel);
      init(channel);
    }
  }, [roomId, channel]);

  // window.onpopstate = async () => {
  //   await rtmClient.logout();
  //   toggleStart(false);
  // };

  const scrollToBottom = () => {
    endfMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const messageuid = messageUid();
    const sendMessageData = {
      type: "chat",
      id: messageuid,
      from: "me",
      message: messageRef.current.value,
      displayName: localUser.user.uid,
    };
    setMessages((prev) => {
      return [...prev, sendMessageData];
    });
    channel.sendMessage({
      // 다음 JSON 양식을 string으로 만들어서 보냄
      text: JSON.stringify({
        type: "chat",
        message: messageRef.current.value,
        displayName: localUser.user.uid,
      }),
    });
    messageRef.current.value = "";
    scrollToBottom();
  };

  console.log(messages);

  return (
    <MessageCallContainer>
      <Header>
        <h1>Meassge Call Part</h1>
      </Header>
      <MessageConainer>
        {messages.map((message) => {
          return <MessageContent key={message.id} message={message} />;
        })}
        <EndOfMessage ref={endfMessagesRef} />
      </MessageConainer>

      <FormContainer>
        <form onSubmit={SubmitHandler}>
          <input type="text" id="message" ref={messageRef} />

          <button type="submit">SEND</button>
        </form>
      </FormContainer>
    </MessageCallContainer>
  );
}

export default MessageCall;

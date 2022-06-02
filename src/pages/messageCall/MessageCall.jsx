import { config } from "../../utill/Agora.config";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { RtcContext } from "../../context/rtcContext";
import { UserContext } from "../../context/userContext";
import { createInstance } from "agora-rtm-sdk";
import MessageContent from "../../components/message/MessageContent";
import { Button } from "@mui/material";
import {
  MessageCallContainer,
  Header,
  FormContainer,
  MessageConainer,
  EndOfMessage,
  ButtonContainer,
  MessageFormInput,
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
        scrollToBottom();
      });

      toggleStart(true);
    };

    if (channel) {
      console.log("starting Message point", roomId, channel);
      init(channel);
    }
  }, [roomId, channel]);

  const scrollToBottom = () => {
    endfMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const messageSendHandler = async () => {
    if (messageRef.current.value === "") {
      return;
    }
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

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   messageSendHandler();
  // };

  const changeHandler = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      messageSendHandler();
      e.preventDefault();
    }
  };

  return (
    <MessageCallContainer>
      <Header>
        <h1>Meassge Room</h1>
      </Header>
      <MessageConainer>
        {messages.map((message) => {
          return <MessageContent key={message.id} message={message} />;
        })}
        <EndOfMessage ref={endfMessagesRef} />
      </MessageConainer>

      <FormContainer>
        <MessageFormInput
          type="text"
          id="input"
          ref={messageRef}
          onKeyPress={changeHandler}
        />
        <ButtonContainer>
          <Button
            style={{ display: "block" }}
            variant="contained"
            color="secondary"
            size="small"
            type="click"
            onClick={messageSendHandler}
          >
            SEND
          </Button>
        </ButtonContainer>
      </FormContainer>
    </MessageCallContainer>
  );
}

export default MessageCall;

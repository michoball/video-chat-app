import { config } from "../../utill/Agora.config";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { RtcContext } from "../../context/rtcContext";
import { UserContext } from "../../context/userContext";
import { createInstance } from "agora-rtm-sdk";
import MessageContent from "../../components/message/MessageContent";
import { SendingIcon } from "../../UI/Icons";
import { MESSAGE_TYPE } from "../../components/message/MessageContent";

import {
  MessageCallContainer,
  Header,
  FormContainer,
  MessageConainer,
  EndOfMessage,
  MessageFormInput,
  SendButton,
} from "./MessageCall.styles";
// 임의로 만드는 message Uid
const messageUid = () => {
  return Math.floor(Math.random() * 100000 + Math.random() * 10000).toString();
};

function MessageCall() {
  const { roomId } = useParams();
  const { toggleStart, localUser } = useContext(RtcContext);
  const { currentUser } = useContext(UserContext);
  const [channel, setChannel] = useState(null);
  const [rtmClient, setRtmClient] = useState(null);
  const messageRef = useRef("");
  const endfMessagesRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const init = async () => {
      const RTMclient = createInstance(config.appId);
      await RTMclient.login({ uid: String(localUser.user.uid), token: null });
      await RTMclient.addOrUpdateLocalUserAttributes({
        name: currentUser.displayName,
      });
      const rtmChannel = RTMclient.createChannel(roomId);
      await rtmChannel.join();
      if (rtmChannel) {
        setChannel(rtmChannel);
        setRtmClient(RTMclient);
      }
    };
    if (currentUser && localUser) {
      init();
    }
  }, [localUser, currentUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const init = async (channel) => {
      channel.on("MemberJoined", async (MemberId) => {
        const { name } = await rtmClient.getUserAttributesByKeys(MemberId, [
          "name",
        ]);
        const messageuid = messageUid();

        const botMessageData = {
          type: "chat",
          id: messageuid,
          from: MESSAGE_TYPE.bot,
          message: `New Member Joined ${name} `,
          displayName: "Bot 🤖",
        };
        setMessages((prevState) => [...prevState, botMessageData]);

        console.log("NEW Member Joined~!!", MemberId, name);
      });

      channel.on("MemberLeft", async (MemberId) => {
        const { name } = await rtmClient.getUserAttributesByKeys(MemberId, [
          "name",
        ]);
        const messageuid = messageUid();

        const botMessageData = {
          type: "chat",
          id: messageuid,
          from: MESSAGE_TYPE.bot,
          message: `Member left ${name} `,
          displayName: "Bot 🤖",
        };
        setMessages((prevState) => [...prevState, botMessageData]);
        console.log("leaving", MemberId);
      });

      channel.on("ChannelMessage", async (messageData, MemberId) => {
        try {
          let data = JSON.parse(messageData.text);

          const messageuid = messageUid();

          const reciveMessageData = {
            ...data,
            id: messageuid,
            from: MESSAGE_TYPE.other,
          };
          setMessages((prevState) => [...prevState, reciveMessageData]);

          console.log("A new Message was recieved ", data);
          scrollToBottom();
        } catch (error) {
          console.log(error);
        }
      });

      toggleStart(true);
    };

    if (channel && rtmClient) {
      console.log("starting Message point", roomId, channel);
      init(channel);
    }
  }, [roomId, channel, rtmClient]);

  const scrollToBottom = () => {
    endfMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const messageSendHandler = async () => {
    try {
      if (messageRef.current.value === "") {
        return;
      }

      const messageuid = messageUid();
      const sendMessageData = {
        type: "chat",
        id: messageuid,
        from: MESSAGE_TYPE.me,
        message: messageRef.current.value,
        displayName: currentUser.displayName,
      };

      setMessages((prev) => [...prev, sendMessageData]);
      channel.sendMessage({
        // 다음 JSON 양식을 string으로 만들어서 보냄
        text: JSON.stringify({
          type: "chat",
          message: messageRef.current.value,
          displayName: currentUser.displayName,
        }),
      });

      messageRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      messageSendHandler();
      e.preventDefault();
    }
  };

  return (
    <MessageCallContainer>
      <Header>
        <p> Meassge Room </p>
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

        <SendButton type="click" onClick={messageSendHandler}>
          <SendingIcon />
        </SendButton>
      </FormContainer>
    </MessageCallContainer>
  );
}

export default MessageCall;

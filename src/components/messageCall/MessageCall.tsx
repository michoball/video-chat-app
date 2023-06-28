import { useEffect, useRef } from "react";

import MessageContent, { MESSAGE_TYPE } from "../message/MessageContent";
import { SendingIcon } from "../../UI/Icons";

import {
  MessageCallContainer,
  Header,
  FormContainer,
  MessageConainer,
  EndOfMessage,
  MessageFormInput,
  SendButton,
} from "./MessageCall.styles";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import {
  selectRtmChannel,
  selectRtmMessages,
  selectRtmClient,
  // selectRtmUsers,
} from "../../store/rtm/rtm.selector";

import { addMessages, clearRtm } from "../../store/rtm/rtm.action";
import { RtmChannel, RtmClient } from "agora-rtm-sdk";

// 임의로 만드는 message Uid
const messageUidGenerator = () => {
  return Math.floor(Math.random() * 100000 + Math.random() * 10000).toString();
};

function MessageCall() {
  const dispatch = useDispatch();
  const channel = useSelector(selectRtmChannel);
  const rtmClient = useSelector(selectRtmClient);
  const messages = useSelector(selectRtmMessages);
  const currentUser = useSelector(selectCurrentUser);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const endfMessagesRef = useRef<HTMLDivElement>(null);

  // 채팅 화면 계속 밑으로 향하게 하는 기능
  const scrollToBottom = () => {
    if (endfMessagesRef.current) {
      endfMessagesRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 봇 메세지 만드는 기능 ( join 과 left )
  const makeBotMessage = (userState: string, name = "") => {
    const messageid = messageUidGenerator();
    if (userState === "join") {
      return {
        id: messageid,
        type: "chat",
        from: MESSAGE_TYPE.bot,
        message: `New Member Joined "${name}" `,
        displayName: "Bot 🤖",
      };
    }
    if (userState === "left") {
      return {
        id: messageid,
        type: "chat",
        from: MESSAGE_TYPE.bot,
        message: `Member left `,
        displayName: "Bot 🤖",
      };
    }
  };

  useEffect(() => {
    const init = async (channel: RtmChannel, rtmClient: RtmClient) => {
      channel.on("MemberJoined", async (MemberId) => {
        try {
          const { name } = await rtmClient.getUserAttributesByKeys(MemberId, [
            "name",
          ]);
          if (name) {
            const botMessageData = makeBotMessage("join", name);
            if (botMessageData) dispatch(addMessages(botMessageData));
          }
          console.log("NEW Member Joined~!!", MemberId, name);
        } catch (error) {
          console.log("Rtm Member join error", error);
        }
      });

      channel.on("MemberLeft", async (MemberId) => {
        try {
          const botMessageData = makeBotMessage("left");
          if (botMessageData) dispatch(addMessages(botMessageData));
          console.log("leaving", MemberId);
        } catch (error) {
          console.log("Rtm MemberLeft error", error);
        }
      });

      channel.on("ChannelMessage", async (messageData, MemberId) => {
        try {
          if (messageData.messageType === "TEXT") {
            let data = JSON.parse(messageData.text);

            const reciveMessageData = {
              ...data,
              from: MESSAGE_TYPE.other,
            };
            dispatch(addMessages(reciveMessageData));
            console.log("A new Message was recieved ", data);
          }
          scrollToBottom();
        } catch (error) {
          console.log(error);
        }
      });
    };

    if (channel && rtmClient) {
      console.log("starting Message point", channel, "rtmClient : ", rtmClient);
      init(channel, rtmClient);
    }
  }, [channel, rtmClient, dispatch]);

  const messageSendHandler = async () => {
    if (
      !messageRef.current ||
      (messageRef.current && messageRef.current.value === "")
    )
      return;

    try {
      const messageid = messageUidGenerator();
      if (!currentUser || !channel) return;
      const sendMessageData = {
        id: messageid,
        type: "chat",
        from: MESSAGE_TYPE.me,
        message: messageRef.current.value,
        displayName: currentUser.displayName,
      };

      dispatch(addMessages(sendMessageData));
      await channel.sendMessage({
        // 다음 JSON 양식을 string으로 만들어서 보냄
        text: JSON.stringify({
          type: "chat",
          message: messageRef.current.value,
          displayName: currentUser.displayName,
        }),
      });
    } catch (error) {
      console.log(error);
    }
    messageRef.current.value = "";
  };

  const changeHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      messageSendHandler();
      e.preventDefault();
    }
  };

  window.onpopstate = async () => {
    try {
      if (channel && rtmClient) {
        await channel.leave();
        await rtmClient.logout();
      }
      dispatch(clearRtm());
    } catch (error) {
      console.log(error);
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
        <MessageFormInput id="input" ref={messageRef} onKeyUp={changeHandler} />

        <SendButton type="button" onClick={messageSendHandler}>
          <SendingIcon />
        </SendButton>
      </FormContainer>
    </MessageCallContainer>
  );
}

export default MessageCall;

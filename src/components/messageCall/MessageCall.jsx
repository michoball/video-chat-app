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
} from "../../store/rtm/rtm.selector";

import { addMessages, clearAll, addRtmUser } from "../../store/rtm/rtm.action";

function MessageCall() {
  const dispatch = useDispatch();
  const channel = useSelector(selectRtmChannel);
  const rtmClient = useSelector(selectRtmClient);
  const messages = useSelector(selectRtmMessages);
  const currentUser = useSelector(selectCurrentUser);
  const messageRef = useRef("");
  const endfMessagesRef = useRef(null);

  // 채팅 화면 계속 밑으로 향하게 하는 기능
  const scrollToBottom = () => {
    endfMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 봇 메세지 만드는 기능 ( join 과 left )
  const makeBotMessage = (userState, name = "") => {
    if (userState === "join") {
      return {
        type: "chat",
        from: MESSAGE_TYPE.bot,
        message: `New Member Joined "${name}" `,
        displayName: "Bot 🤖",
      };
    }
    if (userState === "left") {
      return {
        type: "chat",
        from: MESSAGE_TYPE.bot,
        message: `Member left `,
        displayName: "Bot 🤖",
      };
    }
  };

  useEffect(() => {
    const init = async (channel) => {
      channel.on("MemberJoined", async (MemberId) => {
        const { name } = await rtmClient.getUserAttributesByKeys(MemberId, [
          "name",
        ]);

        const botMessageData = makeBotMessage("join", name);
        dispatch(addMessages(botMessageData));
        dispatch(addRtmUser(MemberId, name));

        console.log("NEW Member Joined~!!", MemberId, name);
      });

      channel.on("MemberLeft", async (MemberId) => {
        const botMessageData = makeBotMessage("left");
        dispatch(addMessages(botMessageData));

        console.log("leaving", MemberId);
      });

      channel.on("ChannelMessage", async (messageData, MemberId) => {
        try {
          let data = JSON.parse(messageData.text);

          const reciveMessageData = {
            ...data,
            from: MESSAGE_TYPE.other,
          };
          dispatch(addMessages(reciveMessageData));

          console.log("A new Message was recieved ", data);
          scrollToBottom();
        } catch (error) {
          console.log(error);
        }
      });
    };

    if (channel && rtmClient) {
      console.log("starting Message point", channel, "rtmClient : ", rtmClient);
      init(channel);
    }
  }, [channel, rtmClient, dispatch]);

  const messageSendHandler = async () => {
    if (messageRef.current.value === "") {
      return;
    }
    try {
      const sendMessageData = {
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

  const changeHandler = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      messageSendHandler();
      e.preventDefault();
    }
  };

  window.onpopstate = async () => {
    await channel.leave();
    await rtmClient.logout();

    dispatch(clearAll());
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

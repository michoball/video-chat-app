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
import {
  clearClientAndChannel,
  clearMessages,
  addMessages,
} from "../../store/rtm/rtm.action";

function MessageCall() {
  const dispatch = useDispatch();
  const channel = useSelector(selectRtmChannel);
  const rtmClient = useSelector(selectRtmClient);
  const messages = useSelector(selectRtmMessages);

  // const {
  //   channel,
  //   rtmClient,
  //   clearMessages,
  //   clearClientAndChannel,
  //   messages,
  //   addMessages,
  // } = useContext(RtmContext);

  const currentUser = useSelector(selectCurrentUser);

  const messageRef = useRef("");
  const endfMessagesRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const init = async (channel) => {
      channel.on("MemberJoined", async (MemberId) => {
        console.log(" New Member Id : ", MemberId);
        const { name } = await rtmClient.getUserAttributesByKeys(MemberId, [
          "name",
        ]);
        // addRtmUser(MemberId, name);
        const botMessageData = {
          type: "chat",
          from: MESSAGE_TYPE.bot,
          message: `New Member Joined "${name}" `,
          displayName: "Bot 🤖",
        };
        dispatch(addMessages(botMessageData));

        console.log("NEW Member Joined~!!", MemberId, name);
      });

      channel.on("MemberLeft", async (MemberId) => {
        // 이미 나갔다고 나간 맴버의 id로는 name attributes를 가져올수 없다고 함

        const botMessageData = {
          type: "chat",
          from: MESSAGE_TYPE.bot,
          message: `Member left `,
          displayName: "Bot 🤖",
        };
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
      console.log("starting Message point", channel);
      console.log("rtmClient : ", rtmClient);
      init(channel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel, rtmClient]);

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

    dispatch(clearMessages());
    dispatch(clearClientAndChannel());

    console.log("rtm User Out~!!!!!!!!!");
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

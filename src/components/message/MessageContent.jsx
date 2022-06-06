import {
  MessageContainer,
  MyContainer,
  BotContainer,
  OtherMessage,
  MyMessage,
  BotMessage,
} from "./MessageContent.styles";

export const MESSAGE_TYPE = {
  me: "me",
  other: "other",
  bot: "bot",
};

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

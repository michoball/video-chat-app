import {
  MessageContainer,
  Sender,
  reciveMessage,
  SenderMessage,
} from "./MessageContent.styles";

function MessageContent({ message }) {
  const { from, displayName } = message;

  const CustomContainer = from === "me" ? Sender : MessageContainer;
  const CustomMessage = from === "me" ? SenderMessage : reciveMessage;
  return (
    <CustomContainer>
      <span>{displayName && displayName}</span>
      <CustomMessage>{message.message}</CustomMessage>
    </CustomContainer>
  );
}

export default MessageContent;

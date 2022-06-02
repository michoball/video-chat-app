import { MessageContainer, Sender } from "./MessageContent.styles";

function MessageContent({ message }) {
  const { from } = message;
  console.log(from);
  const CustomContainer = from === "me" ? Sender : MessageContainer;

  return (
    <CustomContainer>
      <span>{message.from}</span>
      <p>{message.message}</p>
    </CustomContainer>
  );
}

export default MessageContent;

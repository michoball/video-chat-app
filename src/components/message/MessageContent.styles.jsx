import styled from "styled-components";

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 10px 10px;
  font-size: 10px;
  span {
    color: #a52aca;
  }
`;

export const Message = styled.div`
  display: inline-block;
  background-color: #363739;
  border-radius: 10px;
  padding: 10px 10px;
  width: auto;
  max-width: 60%;
  font-weight: bold;
  color: white;
  white-space: pre;
  letter-spacing: 0.75px;
`;

export const Sender = styled(MessageContainer)`
  span {
    display: block;
    text-align: end;
    color: #a52aca;
  }
`;

export const SenderMessage = styled(Message)`
  margin-left: auto;
`;
export const reciveMessage = styled(Message)`
  margin-right: auto;
`;

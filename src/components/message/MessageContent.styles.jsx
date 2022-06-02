import styled from "styled-components";

export const MessageContainer = styled.div`
  display: flex;
  position: relative;
  gap: 10px;
  margin: 0.5rem;
  background-color: #363739;
  border-radius: 10px;
  padding: 10px 15px;
  width: fit-content;
  width: 200px;
  word-wrap: break-word;

  /* white-space: pre-wrap;
  overflow-wrap: break-word; */
  p {
    font-weight: bold;
    color: white;
    word-wrap: break-word;
  }
  span {
    margin-right: 5px;
    color: #a52aca !important;
  }
`;

export const Sender = styled(MessageContainer)`
  margin-left: auto;
  background-color: #3f4043;
`;

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
  max-width: 900px;
  p {
    font-weight: bold;
    color: white;
  }
  span {
    margin-right: 10px;
    color: #a52aca !important;
  }
`;

export const Sender = styled(MessageContainer)`
  margin-left: auto;
  background-color: #3f4043;
`;

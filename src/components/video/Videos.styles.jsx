import styled from "styled-components";

export const VideosContainer = styled.div`
  display: flex;
`;

export const LocalUserVideoContianer = styled.div`
  flex: 0.2;
`;

export const OtherVideoContianer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.8;
`;

export const RemoteUserVideoContianer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
`;

import styled from "styled-components";

export const VideosContainer = styled.div`
  display: flex;
  min-width: 800px;
  max-width: 1200px;
`;

export const LocalUserVideoContianer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ShareOrBigVideoContianer = styled.div`
  display: flex;
  @media screen and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
  }
`;

export const RemoteUserVideoContianer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

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

  @media screen and (max-width: 1400px) {
    display: flex;
    flex-direction: column;
  }
`;

export const BaseUserVideoContianer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  grid-gap: 1vw;
`;

export const SmallUserVideoContianer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  @media screen and (max-width: 1400px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1vw;
  }
`;

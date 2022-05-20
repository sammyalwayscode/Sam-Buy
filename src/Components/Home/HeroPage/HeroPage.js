import React from "react";
import styled from "styled-components";
import data from "../../json/heroData.json";

const HeroPage = () => {
  return (
    <Container>
      <Wrapper>
        <HeroOne>
          {data?.map((props) => {
            return (
              <HeroOneHold key={props.id}>
                <img src={props.imag} alt="" />
                <OneTextHold>
                  <span> {props.title} </span>
                  <div> {props.category} </div>
                </OneTextHold>
              </HeroOneHold>
            );
          })}
        </HeroOne>

        <HeroTwo>
          <TextHold>
            <Title>sunglass collection</Title>
            <SubTitle>Olorunda Samuel</SubTitle>
          </TextHold>
          <ImgDiv>
            {" "}
            <img src="/Image/woman.png" alt="" />{" "}
          </ImgDiv>
        </HeroTwo>

        <HeroThree>
          <SubDivs>
            <img src="/Image/bracelet.png" alt="" />
            <span>Trendy Collections</span>
          </SubDivs>
          <SubDivs wt bg>
            <img src="/Image/bag.png" alt="" />
            <span>Watch Collections</span>
          </SubDivs>
        </HeroThree>
      </Wrapper>
    </Container>
  );
};

export default HeroPage;

const Container = styled.div`
  height: 80vh;
  width: 100%;
  /* background-color: darkcyan; */
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 1250px;
  /* background-color: aqua; */
  height: 100%;
  display: flex;

  @media (max-width: 1250px) {
    width: 90%;
  }
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;
const HeroOne = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 800px) {
    width: 90%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  img {
    height: 50px;
    margin-right: 15px;

    @media (max-width: 800px) {
      height: 20px;
    }
  }
`;

const HeroOneHold = styled.div`
  height: 70px;
  width: 90%;
  margin: 12px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  @media (max-width: 800px) {
    width: 100px;
  }
`;
const OneTextHold = styled.div`
  font-family: poppins;
  span {
    font-weight: 700;
    @media (max-width: 800px) {
      font-size: 10px;
    }
    :hover {
      color: darkorange;
    }
  }

  div {
    font-size: small;
    @media (max-width: 800px) {
      font-size: smaller;
    }
    /* font-weight: 700; */
    text-transform: capitalize;
  }
`;
const HeroTwo = styled.div`
  flex: 1;
  background-color: peachpuff;
  display: flex;
  justify-content: space-around;
`;

const TextHold = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  font-family: poppins;
`;
const Title = styled.div`
  width: 170px;
  text-transform: uppercase;
  font-size: 27px;
  font-weight: 800;
  line-height: 1.2;
`;
const SubTitle = styled.div`
  margin-bottom: 30px;
  font-size: small;
  font-weight: 800;
  color: darkred;
`;
const ImgDiv = styled.div`
  display: flex;
  align-items: flex-end;
  overflow: hidden;

  img {
    width: 320px;
    margin-bottom: -25px;
  }
`;
const HeroThree = styled.div`
  width: 350px;
  /* background-color: darkkhaki; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  @media (max-width: 800px) {
    width: 100%;
  }
`;
const SubDivs = styled.div`
  height: 230px;
  width: 300px;
  background-color: ${({ bg }) => (bg ? "lightpink" : "skyblue")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 800px) {
    width: 100%;
  }

  img {
    width: ${({ wt }) => (wt ? "190px" : "170px")};
  }

  span {
    font-family: poppins;
    font-weight: 800;
  }
`;

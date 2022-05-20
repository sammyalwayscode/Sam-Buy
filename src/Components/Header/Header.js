import React from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { IoNotifications } from "react-icons/io5";
import { AiTwotoneSetting, AiOutlineMenuUnfold } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";

const Header = () => {
  return (
    <Container>
      <Wrapper>
        <Logo>BUY.</Logo>
        <SearchBarHold>
          <input placeholder="Make Your Search Hear..." />
          <button>
            {" "}
            <Icon />{" "}
          </button>
          <Side>
            <BarIcon />
          </Side>
        </SearchBarHold>
        <OtherIcons>
          <IcHold>
            <Icon1 />
          </IcHold>
          <IcHold>
            <Icon2 />
          </IcHold>
          <button>
            Account <BtnIcon />{" "}
          </button>
        </OtherIcons>
      </Wrapper>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  height: 70px;
  /* background-color: gold; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: poppins;
`;
const Wrapper = styled.div`
  width: 1200px;
  height: 100%;
  /* background-color: brown; */
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1200px) {
    width: 85%;
  }
`;
const Logo = styled.div`
  font-size: 25px;
  font-weight: 900;
`;
const SearchBarHold = styled.div`
  width: 400px;
  display: flex;
  /* background-color: aqua; */

  @media (max-width: 500px) {
    width: 150px;
  }

  button {
    border: 0;
    outline: none;
    background-color: darkorange;
    margin: 0 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    border-radius: 2px;
  }

  input {
    outline: none;
    font-family: poppins;
    border: none;
    background-color: lightgray;
    flex: 1;
  }
`;
const Icon = styled(BiSearch)`
  font-size: 20px;
  color: #fff;
`;
const OtherIcons = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    height: 35px;
    width: 120px;
    border-radius: 200px;
    outline: none;
    border: 0;
    font-family: poppins;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    background-color: darkorange;
  }

  @media (max-width: 800px) {
    display: none;
  }
`;
const Icon1 = styled(IoNotifications)`
  font-size: 20px;
`;
const Icon2 = styled(AiTwotoneSetting)`
  font-size: 20px;
`;
const BtnIcon = styled(MdAccountCircle)`
  /* margin-left: 4px; */
`;

const BarIcon = styled(AiOutlineMenuUnfold)`
  margin: 0 6px;
`;
const Side = styled.div`
  display: none;

  @media (max-width: 800px) {
    display: block;
    background-color: gray;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    border-radius: 2px;
  }
`;

const IcHold = styled.div`
  height: 35px;
  width: 35px;
  background-color: lightgrey;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
  transition: all 350ms;

  :hover {
    color: #fff;
    background-color: darkorange;
  }
`;

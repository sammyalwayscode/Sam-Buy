import React from "react";
import styled from "styled-components";

const Category = () => {
  return (
    <Container>
      <Wrapper>
        <CatButton>Female Collection</CatButton>
        <CatNav>
          <span>Men Collection</span>
          <span style={{ color: "darkorange" }}>Female Collection</span>
          <span>Kiddies Special</span>
          <span>Shoes</span>
          <span>Jewelleries</span>
        </CatNav>
      </Wrapper>
    </Container>
  );
};

export default Category;

const Container = styled.div`
  width: 100%;
  min-width: 100vw;
  min-height: 50px;
  height: 100%;
  background-color: black;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: poppins;
`;
const Wrapper = styled.div`
  width: 1200px;
  display: flex;
  margin: 10px 0;

  @media (max-width: 1200px) {
    width: 85%;
  }
`;
const CatButton = styled.button`
  padding: 5px 10px;
  border-radius: 3px;
  outline: none;
  border: 0;
  font-family: poppins;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background-color: darkorange;

  @media (max-width: 800px) {
    display: none;
  }
`;
const CatNav = styled.div`
  margin-left: 30px;

  span {
    margin: 0 10px;
    font-size: 13px;
    font-weight: bold;
    cursor: pointer;
  }
`;

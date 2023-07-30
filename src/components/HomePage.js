// HomePage.js for HomePage displayed when user visits the site

import React from "react";
import { styled } from "styled-components";
import LockIcon from "../files/lock.png";
import WorkImage from "../files/image.jpg";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: grid;
  max-width: 100%;
  overflow: hidden;
  grid-template-columns: repeat(2, 60% 40%);
  padding: 20px;

  @media screen and (max-width: 490px) {
    grid-template-columns: auto;
    grid-template-rows: auto;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #edbdab;

  .content2 {
    width: 80%;
    margin: 80px auto;
  }
`;
const Content = styled.figure`
  display: flex;

  text-transform: uppercase;
  align-items: center;
  position: relative;

  img {
    width: 65px;
    height: auto;
  }
  blockquote {
    position: absolute;
    top: 6px;
    left: 60px;
  }
`;

const Text = styled.div`
  font-size: 85px;
  color: #f5963d;
  line-height: 83px;

  @media screen and (max-width: 769px) {
    font-size: 54px;
    color: #f5963d;
    line-height: 60px;
  }
  @media screen and (max-width: 590px) {
    font-size: 45px;
    color: #f5963d;
    line-height: 50px;
  }
  @media screen and (max-width: 376px) {
    font-size: 30px;
    color: #f5963d;
    line-height: 40px;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: start;
  gap: 40px;
  margin-top: 40px;

  .btn1 {
    background-color: #f5963d;
    color: #1c1b17;
    border: none;
    padding: 15px 80px;
    border-radius: 30px;
    cursor: pointer;
    transition: 0.3s ease all;
    &:hover {
      background-color: #edbdab;
    }
  }

  .btn2 {
    padding: 15px 80px;
    border-radius: 30px;
    border: 2px solid #f5963d;
    cursor: pointer;
    transition: 0.3s ease all;
    background-color: #1c1b17;
    color: #f5963d;
    &:hover {
      background-color: #2b2924;
    }
  }

  @media screen and (max-width: 769px) {
    .btn1 {
      padding: 15px 50px;
    }
    .btn2 {
      padding: 15px 50px;
    }
  }
  @media screen and (max-width: 590px) {
    .btn1 {
      padding: 15px 30px;
    }
    .btn2 {
      padding: 15px 30px;
    }
  }
  @media screen and (max-width: 344px) {
    .btn1 {
      padding: 8px 20px;
    }
    .btn2 {
      padding: 8px 20px;
    }
  }
`;

const Photo = styled.div`
  object-fit: cover;

  @media screen and (max-width: 769px) {
    img {
      width: 295px;
      height: 460px;
    }
  }

  @media screen and (max-width: 590px) {
    img {
      width: 230px;
      height: 350px;
    }
  }
  @media screen and (max-width: 490px) {
    grid-row: 2;
    display: none;
  }
`;

const HomePage = () => {
  return (
    <>
      <Container>
        <ContentWrapper>
          <Content>
            <img src={LockIcon} alt="LockIcon" />
            <blockquote>See Locker</blockquote>
          </Content>
          <div className="content2">
            <Text> Ensures your privacy and keeps you away from Chaos.</Text>

            <ButtonWrapper>
              <Link to="/login">
                <button className="btn1">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn2">Sign Up</button>
              </Link>
            </ButtonWrapper>
          </div>
        </ContentWrapper>

        <Photo>
          <img src={WorkImage} alt="" width="550px" height="650px" />
        </Photo>
      </Container>
    </>
  );
};

export default HomePage;

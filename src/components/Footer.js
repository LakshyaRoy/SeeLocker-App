// Footer.js for footer component in all pages

import React from "react";

import { styled } from "styled-components";

const FooterMain = styled.div`
  width: 100%;
`;
const FooterWrapper = styled.div`
  width: 100%;
  background-color: #663405;
  padding: 20px;
  margin: 0;
  text-align: center;
  color: white;
  font-size: 14px;
  font-family: "Poppins", sans-serif;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
`;
const InnerFooterWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  gap: 20px;
  margin: 0 auto;
`;
const Footer = () => {
  return (
    <div>
      <FooterMain>
        <FooterWrapper class="footer-container">
          <InnerFooterWrapper class="footer-content">
            <p>
              Securely store and manage your passwords with our SeeLocker App.
              Safeguard your digital life with ease and peace of mind.
            </p>

            <p>Copyrights 2023 ©️ All Rights Reserved</p>
          </InnerFooterWrapper>
        </FooterWrapper>
      </FooterMain>
    </div>
  );
};

export default Footer;

import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Styles from "./Footer.module.css";

const Footer = () => {
  return (
    <Row className={Styles.wrapper}>
      <Col
        xs={{ span: 8, offset: 2 }}
        sm={{ span: 8, offset: 2 }}
        md={{ span: 8, offset: 2 }}
        lg={{ span: 8, offset: 2 }}
      >
        Made with 🖤 by
        <a
          href="https://daisukeyukita.com"
          className={Styles.link}
          target="_blank"
          rel="noreferrer"
        >
          Dice Yukita
        </a>
      </Col>
    </Row>
  );
};

export default Footer;

import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Styles from "./Header.module.css";

const Header = () => {
  return (
    <Row className={Styles.wrapper}>
      <Col
        xs={{ span: 8, offset: 0 }}
        sm={{ span: 8, offset: 0 }}
        md={{ span: 8, offset: 0 }}
        lg={{ span: 8, offset: 0 }}
      >
        Oppai Logger
      </Col>
    </Row>
  );
};

export default Header;

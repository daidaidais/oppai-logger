import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Styles from "./AddNew.module.css";
import MutateDatabase from "./MutateDatabase.js";

const AddNew = ({ firebaseConfig }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <Row className={Styles.wrapper}>
      <Col
        xs={{ span: 10, offset: 1 }}
        sm={{ span: 8, offset: 2 }}
        md={{ span: 8, offset: 2 }}
        lg={{ span: 8, offset: 2 }}
      >
        <Button
          variant="dark"
          size="lg"
          block
          className={Styles.button}
          onClick={() => {
            setClicked(true);
          }}
        >
          授乳します
        </Button>
        {clicked && (
          <MutateDatabase
            firebaseConfig={firebaseConfig}
            setClicked={setClicked}
          />
        )}
      </Col>
    </Row>
  );
};

export default AddNew;

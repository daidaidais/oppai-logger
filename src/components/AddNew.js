import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Styles from "./AddNew.module.css";

import firebase from "firebase/app";
import "firebase/database";
import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseMutation,
} from "@react-firebase/database";

const AddNew = ({ firebaseConfig }) => {
  const getMYD = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
    const day = (date.getDate() < 10 ? "0" : "") + date.getDate();
    const formattedMYD = `${year}${month}${day}`;
    return formattedMYD;
  };

  return (
    <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
      <Row className={Styles.wrapper}>
        <Col
          xs={{ span: 10, offset: 1 }}
          sm={{ span: 8, offset: 2 }}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 8, offset: 2 }}
        >
          <FirebaseDatabaseMutation type="push" path="oppai/">
            {({ runMutation }) => (
              <Button
                variant="dark"
                size="lg"
                block
                className={Styles.button}
                onClick={async () => {
                  await runMutation({
                    MYD: getMYD(),
                    createdAt: firebase.database.ServerValue.TIMESTAMP,
                  });
                }}
              >
                授乳します！
              </Button>
            )}
          </FirebaseDatabaseMutation>
        </Col>
      </Row>
    </FirebaseDatabaseProvider>
  );
};

export default AddNew;

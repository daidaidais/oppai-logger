import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Styles from "./Log.module.css";
import Button from "react-bootstrap/Button";

import firebase from "firebase/app";
import "firebase/database";
import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode,
} from "@react-firebase/database";

const Log = ({ firebaseConfig }) => {
  const [limit, setLimit] = useState(1);

  const convertTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
    const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    //const seconds = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();
    const formattedTime = `${hours}時${minutes}分`;

    return formattedTime;
  };

  return (
    <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
      <Row className={Styles.wrapper}>
        <Col
          xs={{ span: 10, offset: 1 }}
          sm={{ span: 10, offset: 1 }}
          md={{ span: 10, offset: 1 }}
          lg={{ span: 10, offset: 1 }}
        >
          <FirebaseDatabaseNode
            path="oppai/"
            limitToLast={limit}
            orderByValue={"createdAt"}
          >
            {({ value }) => {
              if (value === null || typeof value === "undefined") return null;
              const keys = Object.keys(value);
              const values = Object.values(value);
              return values.reverse().map((val, i) => (
                <>
                  <h3 className={Styles.title} key={keys.reverse()[i]}>
                    {keys.reverse()[i].slice(0, 4)}年
                    {keys.reverse()[i].slice(4, 6)}月
                    {keys.reverse()[i].slice(6, 8)}日 （
                    {Object.values(val).length}回）
                  </h3>
                  <ol className={Styles.list} key={i}>
                    {Object.values(val).map((timeVal, timeI) => (
                      <li key={timeI}>{convertTimestamp(timeVal.createdAt)}</li>
                    ))}
                  </ol>
                </>
              ));
            }}
          </FirebaseDatabaseNode>
          <Button
            variant="outline-dark"
            size="sm"
            className={Styles.loadMore}
            onClick={() => {
              setLimit(limit + 1);
            }}
          >
            Load more
          </Button>
        </Col>
      </Row>
    </FirebaseDatabaseProvider>
  );
};

export default Log;

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
  const [limit, setLimit] = useState(10);

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
          xs={{ span: 8, offset: 2 }}
          sm={{ span: 8, offset: 2 }}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 8, offset: 2 }}
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
              const regrouped = values.reduce((regrouped, item) => {
                const group = regrouped[item.MYD] || [];
                group.push(item.createdAt);
                regrouped[item.MYD] = group;
                return regrouped;
              }, {});
              const regroupedKeys = Object.keys(regrouped);
              return regroupedKeys.reverse().map((keyVal, keyI) => (
                <>
                  <h3 className={Styles.title} key={keyI}>
                    {keyVal.slice(0, 4)}年{keyVal.slice(4, 6)}月
                    {keyVal.slice(6, 8)}日 （
                    {regrouped[regroupedKeys[keyI]].length}回）
                  </h3>
                  <ol className={Styles.list}>
                    {regrouped[regroupedKeys[keyI]].map((val, i) => (
                      <li key={i}>{convertTimestamp(val)}</li>
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
              setLimit(limit + 10);
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

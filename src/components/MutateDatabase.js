import React, { useEffect } from "react";

import firebase from "firebase/app";
import "firebase/database";
import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseMutation,
} from "@react-firebase/database";

const MutateDatabase = ({ firebaseConfig, setClicked }) => {
  useEffect(() => {
    //console.log(`MutateDatabse mounted`);

    return () => {
      //console.log(`MutateDatabse unmounted`);
    };
  }, []);

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
      <FirebaseDatabaseMutation type="push" path={`oppai/${getMYD()}`}>
        {({ runMutation }) => {
          const mutation = async () => {
            await runMutation({
              //MYD: getMYD(),
              createdAt: firebase.database.ServerValue.TIMESTAMP,
            });
            await setClicked(false);
          };
          setTimeout(() => {
            mutation();
          }, 200);
          return <></>;
        }}
      </FirebaseDatabaseMutation>
    </FirebaseDatabaseProvider>
  );
};

export default MutateDatabase;

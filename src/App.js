import React, { useState, useEffect } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import Log from "./components/Log";
import AddNew from "./components/AddNew";
import Footer from "./components/Footer";
import Spinner from "./components/Spinner";
import Button from "react-bootstrap/Button";

import {
  FirebaseAuthProvider,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed,
} from "@react-firebase/auth";
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "./credentials";

const App = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 2000);
  }, []);

  return (
    <Container fluid className="wrapper">
      <Header />
      <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
        <IfFirebaseAuthed>
          {({ isSignedIn, user, providerId }) => {
              return (
                <>
                  <div className="message">
                    <span>Hello {user.displayName} 🎉</span>
                      {/* <p>{`isSignedIn:${isSignedIn}`}</p>
                      <p>{`name:${user.displayName}`}</p>
                      <p>{`id:${user.uid}`}</p>
                      <p>{`email:${user.email}`}</p>
                      <p>{`providerId:${providerId}`}</p> */}
                    <Button
                      variant="secondary"
                      size="sm"
                      className="btn-signout"
                      onClick={() => {
                        firebase.app().auth().signOut();
                      }}
                    >
                      Sign out
                    </Button>
                  </div>
                  <AddNew firebaseConfig={firebaseConfig} uid={user.uid}/>
                  <Log firebaseConfig={firebaseConfig} uid={user.uid}/>
                </>
              );
          }}
        </IfFirebaseAuthed>
        <IfFirebaseUnAuthed>
          {({ firebase }) => {
            if (!ready) return <Spinner />;
            else
              return (
                <div className="signin">
                  <p>Let's log those oppai 🍼 </p>
                  <Button
                    variant="primary"
                    onClick={() => {
                      const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                      firebase.auth().signInWithPopup(googleAuthProvider);
                    }}
                  >
                    Sign in with Google
                  </Button>
                </div>
              );
          }}
        </IfFirebaseUnAuthed>
      </FirebaseAuthProvider>
      <Footer />
    </Container>
  );
};

export default App;

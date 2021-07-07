import React from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import Log from "./components/Log";
import AddNew from "./components/AddNew";
import Footer from "./components/Footer";
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
  return (
    <Container fluid className="wrapper">
      <Header />
      <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
        <IfFirebaseAuthed>
          {({ isSignedIn, user, providerId }) => (
            <>
              <div className="message">
                <span>Hello {user.displayName} 🎉</span>
                {/*
                  <p>{`isSignedIn:${isSignedIn}`}</p>
                  <p>{`name:${user.displayName}`}</p>
                  <p>{`email:${user.email}`}</p>
                  <p>{`providerId:${providerId}`}</p>
                  */}
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
              <AddNew firebaseConfig={firebaseConfig} />
              <Log firebaseConfig={firebaseConfig} />
            </>
          )}
        </IfFirebaseAuthed>
        <IfFirebaseUnAuthed>
          {({ firebase }) => (
            <div>
              <p>You're not signed in </p>
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
          )}
        </IfFirebaseUnAuthed>
      </FirebaseAuthProvider>
      <Footer />
    </Container>
  );
};

export default App;

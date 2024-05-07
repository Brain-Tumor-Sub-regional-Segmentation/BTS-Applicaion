// Home.jsx

import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/auth';


function Home() {
  //using currentuser property from firebase
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
      // Add an observer to check for changes in authentication state
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          setCurrentUser(user);
      });

      // Clean up the observer when the component unmounts
      return () => unsubscribe();
  }, []);

  return (
      <div>
          <h1>Welcome to the Home Page</h1>
          {currentUser ? (
              <p>Welcome, {currentUser.email}</p>
          ) : (
              <p>No user signed in.</p>
          )}
          <p>This is the main page of your application.</p>
      </div>
  );
}

export default Home;

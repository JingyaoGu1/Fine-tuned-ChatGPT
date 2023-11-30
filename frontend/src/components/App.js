// src/App.js
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import SignUp from './SignUp';
import Login from './Login';
import Dashboard from './Dashboard';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe; // Detach listener on unmount
  }, []);

  return (
    <div>
      {!currentUser ? (
        <div>
          <SignUp />
          <Login />
        </div>
      ) : (
        <Dashboard user={currentUser} />
      )}
    </div>
  );
};

export default App;

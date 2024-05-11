// components/Account.js
import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const Account = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const [userPreferences, setUserPreferences] = useState({});
  
  useEffect(() => {
    const fetchUserPreferences = async () => {
      const firestore = getFirestore();
      const userDocRef = doc(firestore, 'users', user.uid);
      
      try {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserPreferences(userDoc.data());
        }
      } catch (error) {
        console.error('Error fetching user preferences:', error.message);
      }
    };

    fetchUserPreferences();
  }, [user.uid]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out');
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div className="max-w-[600px] mx-auto my-16 p-4">
      <h1 className="text-2xl font-bold py-4">Account</h1>
      <p>User Email: {user && user.email}</p>

      {/* Display user preferences */}
      <div className="mt-4">
        <h2 className="text-lg font-bold mb-2">User Preferences</h2>
        <pre>{JSON.stringify(userPreferences, null, 2)}</pre>
      </div>

      <button onClick={handleLogout} className="border px-6 py-2 my-4">
        Logout
      </button>
    </div>
  );
};

export default Account;

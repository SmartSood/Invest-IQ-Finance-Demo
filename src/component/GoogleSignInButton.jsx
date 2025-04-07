import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const GoogleSignInButton = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async (response) => {
    try {
      const res = await fetch("http://localhost:5001/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential: response.credential }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.token, data.user);
        navigate("/login/Dashboard");
      } else {
        console.error("Google login failed:", data.error);
      }
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: "663431890139-kjeq0tdk42u4dq59ie7fbgpoa2agod1b.apps.googleusercontent.com",
        callback: handleGoogleSignIn
      });

      google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"),
        { 
          theme: "outline", 
          size: "large",
          width: "300"
        }
      );
    }
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div id="googleSignInButton" className="w-full"></div>
    </div>
  );
};

export default GoogleSignInButton;
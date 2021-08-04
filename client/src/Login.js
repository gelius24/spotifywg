import React from "react";
import "./Login.css";

// url to connect the app with spotify
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=293329c309994c0e9ca7c95bb6dc9bc3&response_type=code&redirect_uri=${window.location.origin}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

console.log('le ID client est >>>', process.env.CLIENT_ID)

function Login() {
  return (
    <div className="login">
      <a href={AUTH_URL}>Connexion</a>
    </div>
  );
}

export default Login;

import { useEffect, useState } from "react";
import axios from "axios";
const port = process.env.PORT || 3001;

export default function Auth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  // posting of the code (in exchange of access token)
  useEffect(() => {
    axios
      .post(`/login`, { code })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresInToken);
        window.history.pushState({}, null, "/");
      })
      .catch((e) => {
        // window.location = '/'
        console.log(e);
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post(`/refresh`, { refreshToken })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch((e) => {
          console.log(e);
          // window.location = '/'
        });
    }, (expiresIn - 60) * 1000);
    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}

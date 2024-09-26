import { useState,useEffect,useCallback } from "react";

let logOutTime;
export const useAuth=()=>{
    const [token, setToken] = useState();
    const [userId, setUserId] = useState();
    const [tokenExpirationDate, settokenExpirationDate] = useState();
    const login = useCallback((uid, token, expiresInDate) => {
      setToken(token);
      setUserId(uid);
      const tokenExpirationDate = expiresInDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      settokenExpirationDate(tokenExpirationDate);
      localStorage.setItem('userData', JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString()
      }
      ));
    }, []);
    // console.log(logOutTime)
    const logout = useCallback(() => {
      setToken(null);
      settokenExpirationDate(null);
      setUserId(null);
      localStorage.removeItem('userData');
    }, []);
    useEffect(() => {
      if (token && tokenExpirationDate) {
        const remainingTime=tokenExpirationDate.getTime()-new Date().getTime();
        // console.log(remainingTime)
        logOutTime= setTimeout(logout,remainingTime);
      }
      else{
        clearTimeout(logOutTime);
      }
    }, [token, logout, tokenExpirationDate]);
    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem('userData'));
      if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
        login(storedData.userId, storedData.token, new Date(storedData.expiration));
      }
    }, [login]);
    return { login, logout, token, userId }; 
}
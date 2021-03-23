import React, { useEffect, useState } from "react";
import AppRouter from "components/Router"
import { authService} from "fbInstance";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  // setInterval(() => {
  //   console.log("d", authService.currentUser);
  // }, 2000);
  const refreshUser = () => {
    //react에서 큰 객체 내부 값이 변하면 알아차리지 못하는 경우가 있기에 작은 객체로 쪼갠다
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    })
  }
  return (
  <>
    {init ? <AppRouter refreshUser={refreshUser} isLoggiedIn={Boolean(userObj)} userObj={userObj} /> : "Initializing..."} 
    {/* <footer>&copy; Nwitter {new Date().getFullYear()}</footer> */}
  </>
  )
}

export default App;

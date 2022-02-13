import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SiginForm } from "./siginForm";
import { motion } from "framer-motion";
import { AuthContext } from "./authContext";
import { SignupForm } from "./signupForm";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "../../fire";
import HomePage from "../dashboard/homePage";

const BoxContainer = styled.div`
  width: 280px;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  margin-top : 45px;
  overflow: hidden;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;

const BackDrop = styled(motion.div)`
  width: 160%;
  height: 550px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(60deg);
  top: -290px;
  left: -70px;
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`;

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(60deg)",
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)",
  },
};

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};

export function AuthBox(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");

  const [user, setUser ] = useState(null);
  const [userName, setUserName ] = useState('');
  const [uEmail, setUserEmail] = useState('');
  const [uPass, setuPass] = useState('');
  const [confirmPass, setconfirmPass] = useState('');
  const [emailError, setemailError] = useState('');
  const [passError, setpassError] = useState('');

  const clearUserInputs = () => {
    setUserName('');
    setUserEmail('');
    setconfirmPass('');
    setuPass('');
  }

  const clearErrors = () => {
    setemailError('');
    setpassError('');
  }

  const handleLogin = () => {
    clearErrors();
    signInWithEmailAndPassword(auth, uEmail, uPass).catch((err) => {
      switch (err.code) {
        case "auth/invalid-email":
          setemailError('Invalid Email');
          break;
        case "auth/user-diabled":
          setemailError(err.message);
          break;
        case "auth/user-not-found":
          setemailError('User not registered');
          break;
        case "auth/wrong-password":
          setpassError('Invalid password!');
          break;
        default :
          break;  
      }
    });
  }

  const handleSignUp = () => {
    clearErrors();
    createUserWithEmailAndPassword(auth, uEmail, uPass).catch((err) => {
      console.log(err.code);
      switch (err.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setemailError(err.message);
          break;
        case "auth/weak-password":
          setpassError('Password should be at least 6 characters');
          break;
        default :
          break;  
      }
    });
  }

  const handleLogut = () => {
    clearUserInputs();
    signOut(auth);
  }

  const authListner = () => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        setUser(user);
      }else {
        // clearUserInputs();
        setUser(null);
      }
    });
  }

  useEffect(() => {
    authListner();
  },[]);

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    clearUserInputs();
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  const switchToSignin = () => {
    clearUserInputs();
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };

  const contextValue = { switchToSignup, switchToSignin, handleLogin, handleSignUp, handleLogut,
     setUserName, setUserEmail, setuPass, setconfirmPass, setemailError, setpassError,
     userName, uEmail, uPass, confirmPass, emailError, passError };

  return (
    <AuthContext.Provider value={contextValue}>
      {user ? (
        <HomePage />
      ) : (
        <BoxContainer>
          <TopContainer>
            <BackDrop
              initial={false}
              animate={isExpanded ? "expanded" : "collapsed"}
              variants={backdropVariants}
              transition={expandingTransition}
            />
            {active === "signin" && (
              <HeaderContainer>
                <HeaderText>Welcome</HeaderText>
                <HeaderText>Back</HeaderText>
                <SmallText>Please sign-in to continue!</SmallText>
              </HeaderContainer>
            )}
            {active === "signup" && (
              <HeaderContainer>
                <HeaderText>Create</HeaderText>
                <HeaderText>Account</HeaderText>
                <SmallText>Please sign-up to continue!</SmallText>
              </HeaderContainer>
            )}
          </TopContainer>
          <InnerContainer>
            {active === "signin" && <SiginForm />}
            {active === "signup" && <SignupForm />}
          </InnerContainer>
        </BoxContainer>
      )}
    </AuthContext.Provider>

  );
}

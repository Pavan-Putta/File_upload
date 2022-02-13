import React, { useContext, useState, useEffect } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,ErrorSpan,
  MutedSpan,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AuthContext } from "./authContext";

export function SignupForm(props) {

  const { switchToSignin, userName, uEmail, uPass, confirmPass, passError,
     setUserName, setUserEmail, setuPass, setconfirmPass, handleSignUp } = useContext(AuthContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Full Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <Input type="email" placeholder="Email" value={uEmail} onChange={(e) => setUserEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={uPass} onChange={(e) => setuPass(e.target.value)} />
        <ErrorSpan>{passError}</ErrorSpan>
        <Input type="password" placeholder="Confirm Password" value={confirmPass} onChange={(e) => setconfirmPass(e.target.value)} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit"  onClick={handleSignUp}>Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedSpan>
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedSpan>
    </BoxContainer>
  );
}

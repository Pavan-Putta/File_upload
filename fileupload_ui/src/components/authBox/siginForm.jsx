import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input, ErrorSpan,
  MutedLink, MutedSpan,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AuthContext } from "./authContext";


export function SiginForm(props) {
  const { switchToSignup, uEmail, uPass, emailError, passError, setUserEmail, setuPass, handleLogin } = useContext(AuthContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" value={uEmail} onChange={(e) => setUserEmail(e.target.value)} />
        <ErrorSpan>{emailError}</ErrorSpan>
        <Input type="password" placeholder="Password" value={uPass} onChange={(e) => setuPass(e.target.value)} />
        <ErrorSpan>{passError}</ErrorSpan>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={handleLogin}>Signin</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedSpan>
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedSpan>
    </BoxContainer>
  );
}

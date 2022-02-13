import "./App.css";
import styled from "styled-components";
import { AuthBox } from "./components/authBox";
import React from "react";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <AppContainer>
      <AuthBox />
    </AppContainer>
  );
}

export default App;

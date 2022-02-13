import React, { useContext } from "react";
import styled from "styled-components";
import { useState } from "react/cjs/react.development";
import { AuthContext } from "../authBox/authContext";
import axios from "axios";

const Section = styled.section`
  width: 100%;
`;

const CardDiv = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 100px;
`;

const HomePage = () => {

    const [fileData, setFileData] = useState(null);
    const [data, setData] = useState(false);
    const {uEmail, handleLogut } = useContext(AuthContext);

    const validateFile = (uploadFile) => {
        console.log(uploadFile);
        const uFile = uploadFile.files[0];

        // const dotIndex = uploadFile.lastIndexOf(".") + 1;
        // const fileExtension = uploadFile.substr(dotIndex, uploadFile.length).toLowerCase();
        if (uFile.type === 'application/json') {
        const reader = new FileReader();
        reader.readAsText(uFile);
        reader.onload = () => {
            console.log(uFile.name,reader.result);
            setFileData(reader.result);
        }
        }else {
            setFileData(null);
        alert("Only json files are allowed!");
        }
    }

    const handleUpload = () => {
        const url = 'http://localhost:4500/fileUpload'
        if(fileData) {
            const data = {_id: "pavan@gmail.com", fileData: JSON.parse(fileData)};
            axios.post(url,data).then( (value) => {
                console.log(value);
            }).catch((error) => {
                console.log(error);
            })
        }
    }
    
    return (
        <Section>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <h2 className="navbar-brand">Welcome</h2>
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <span className="nav-link" onClick={() => setData(false)} >Home</span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link" onClick={() => setData(true)}  >Link</span>
                    </li>
                </ul>
                <button className="btn btn-danger ml-auto" onClick={handleLogut}>Logout</button>
            </nav>
            {data ? (
               <div></div>
            ) : (
                <CardDiv>
                <div className="card w-50" >
                    <div className="card-body">
                        Select File :
                        <input type="file" id="myFile" name="jsonFile" className="ml-2"
                            onChange={(e) => { validateFile(e.target) }} accept=".json" />
                        <div className="d-flex justify-content-center mt-4">
                        <button className="btn btn-primary" onClick={handleUpload}>Upload</button>    
                        </div>    
                    </div>
                </div>
            </CardDiv>
            ) }
            
        </Section>
    )
}

export default HomePage;
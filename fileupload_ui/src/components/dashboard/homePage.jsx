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
    const [fileDataList, setFileDataList] = useState([]);
    const [viewData, setViewData] = useState(false);
    const { user, handleLogut } = useContext(AuthContext);

    const validateFile = (uploadFile) => {
        console.log(uploadFile);
        const uFile = uploadFile.files[0];

        // const dotIndex = uploadFile.lastIndexOf(".") + 1;
        // const fileExtension = uploadFile.substr(dotIndex, uploadFile.length).toLowerCase();
        if (uFile.type === 'application/json') {
            const reader = new FileReader();
            reader.readAsText(uFile);
            reader.onload = () => {
                console.log(uFile.name, reader.result);
                try {
                    JSON.parse(JSON.stringify(reader.result));
                    setFileData(reader.result);
                } catch (error) {
                    setFileData(null);
                }
            }
        }else {
            setFileData(null);
            alert("Only json files are allowed!");
        }
    }

    const handleUpload = () => {
        const url = 'http://localhost:4500/fileUpload'
        if(fileData && user) {
            const data = {_id: user.email, fileData: JSON.parse(fileData) };
            setFileData(null);
            axios.post(url,data).then( (value) => {
                console.log(value);
                alert("File Upload Successfull!");
            }).catch((error) => {
                console.log(error);
                alert(error.message);
            })
        } else {
           alert("Please select a Json file!");
        }
    }

    const handleData = () => {
        setViewData(true);
        const url = `http://localhost:4500/viewData/${user.email}`
        axios.get(url).then( (value) => {
            // console.log(value.data.fData);
            setFileDataList(value.data.fData);
        }).catch((error) => {
            setFileDataList([]);
            console.log(error);
        })
    }
    
    return (
        <Section>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <h2 className="navbar-brand">Welcome</h2>
                <ul className="navbar-nav">
                    <li className={viewData ? "nav-item" : "nav-item active"}>
                        <span className="nav-link" onClick={() => setViewData(false)} >Home</span>
                    </li>
                    <li className={viewData ? "nav-item active" : "nav-item"}>
                        <span className="nav-link" onClick={() => handleData() } >View Data</span>
                    </li>
                </ul>
                <button className="btn btn-danger ml-auto" onClick={handleLogut}>Logout</button>
            </nav>
            {viewData ? (
                <div className="m-4">
                    <table className="table table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>User Id</th>
                                <th>Title</th>
                                <th>Body Text</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                fileDataList.map(row => 
                                    <tr key={row.id}>
                                        <td>{row.userId}</td>
                                        <td>{row.title}</td>
                                        <td>{row.body}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
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
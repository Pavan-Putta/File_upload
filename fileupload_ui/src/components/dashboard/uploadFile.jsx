import styled from "styled-components";
import React from "react";



const CardDiv = styled.div`
align-items: center;
display: flex;
justify-content: center;
flex-direction: column;
margin-top: 100px;
`;


const UploadFile = ({validateFile, file }) => {
    return (
        <CardDiv>
        <div className="card w-50" >
            <div className="card-body">
                Select File :
                <input type="file" id="myFile" name="jsonFile" value={file} className="ml-2"
                    onChange={(e) => { validateFile(e.target.value) }} accept=".json" />
                <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-primary ">Upload</button>    
                </div>    
            </div>
        </div>
    </CardDiv>
    )
}

export default UploadFile
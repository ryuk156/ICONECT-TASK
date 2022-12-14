import React, { useEffect, useRef, useState } from "react";
import { CustodianType } from "../../types";
import ProfileCard from "../ProfileCard";
import ProgressBar from "../ProgressBar";
import TextInput from "../TextInput";
import "./index.css";

const DropBox: React.FC<{}> = () => {
  //hooks
  const [files, setFiles] = useState<File[]>([]);
  const [filled, setFilled] = useState<number>(0);
  const [custodians, setCustodians] = useState<CustodianType[]>([]);
  const [custodianName, setCustodianName] = useState<string>("");
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLDivElement>(null);
  const [tempCustodians, setTempCustodians] = useState<CustodianType[]>([]);
  //drag & drop effect
  const onDragIn = () => {
    if (fileInputRef.current) {
      fileInputRef.current.classList.add(`dragOpacity`);
    }
  };
  const onDragOut = () => {
    if (fileInputRef.current) {
      fileInputRef.current.classList.remove(`dragOpacity`);
    }
  };
  const onDrop = () => {
    if (fileInputRef.current) {
      fileInputRef.current.classList.remove(`dragOpacity`);
    }
  };

  //file upload and data submit
  const onFileUpload = (e: any) => {
    const newFile: File = e.target.files[0];
    if (newFile) {
      setFiles([...files, newFile]);
    }
  };

  const onRemoveFile = (index: number) => {
    const newFileArray = files.filter((item, indexID) => indexID !== index);
    console.log(newFileArray);
    setFiles(newFileArray);
  };

  const onSubmit = () => {
    if (files.length === 0) {
      alert("Please upload files");
    } else if (custodianName.length === 0) {
      alert("Please enter custodian name");
    } else {
      setIsLoader(true);
      setTempCustodians([
        ...tempCustodians,
        {
          custodianName: custodianName,
          custodianFiles: files,
        },
      ]);
      setFiles([]);
      setCustodianName("");
    }
  };

  useEffect(() => {
    if (filled < 100 && isLoader) {
      setTimeout(() => setFilled((prev) => (prev += 2)), 50);
    } else if (filled === 100) {
      if (filled === 100) {
        setCustodians(tempCustodians);
      }
      setFilled(0);
      setIsLoader(false);
    }
  }, [filled, isLoader, tempCustodians]);

  return (
    <>
      <div className="dropboxContainer">
        <div className="fileInputContainer">
          <div
            ref={fileInputRef}
            className="fileInputDropBox"
            onDragEnter={onDragIn}
            onDragLeave={onDragOut}
            onDrop={onDrop}
          >
            <input
              className="fileInput"
              type="file"
              onChange={onFileUpload}
              disabled={isLoader ? true : false}
            ></input>
            <div className="fileInoutPlaceholder fileInputText">
              <i className="fa fa-upload uploadIcon" /> Drop your files here
            </div>
          </div>
          <div className="fileList">
            {files.length > 0 ? (
              files.map((file: File, index: number) => {
                return (
                  <div className="fileListName" key={index}>
                    <div className="fileNameContainer">
                      <i
                        className="fa fa-file fileIcon"
                        onClick={() => {
                          onRemoveFile(index);
                        }}
                      />
                      {file.name}
                    </div>

                    <i
                      className="fa fa-trash removeIcon"
                      onClick={() => {
                        onRemoveFile(index);
                      }}
                    />
                  </div>
                );
              })
            ) : (
              <div className="fileInputText">Oops! no files</div>
            )}
          </div>
        </div>

        <div className="progressbarConatiner">
          {isLoader ? <ProgressBar filled={filled} /> : null}
        </div>

        <div className="secondarycontainer">
          <TextInput
            value={custodianName}
            onChange={(e) => {
              setCustodianName(e.target.value);
            }}
          />

          <button className="button" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>

      <div className={"profileCards"}>
        {custodians.map((cust) => {
          return (
            <ProfileCard
              custodianFiles={cust.custodianFiles}
              custodianName={cust.custodianName}
            />
          );
        })}
      </div>
    </>
  );
};

export default DropBox;

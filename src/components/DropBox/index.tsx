import React, { useEffect, useRef, useState } from "react";
import { CustodianType } from "../../types";
import ProfileCard from "../ProfileCard";
import ProgressBar from "../ProgressBar";
import TextInput from "../TextInput";
import "./index.css";
const DropBox: React.FC<{}> = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [filled, setFilled] = useState<number>(0);
  const [custodian, setCustodian] = useState<CustodianType[]>([]);
  const [custodianName, setCustodianName] = useState<string>("");
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLDivElement>(null);
  const onDragIn = () =>  {if(fileInputRef.current){fileInputRef.current.classList.add(`dragOpacity`)}};

  const onDragOut = () => {if(fileInputRef.current){fileInputRef.current.classList.remove(`dragOpacity`)}};

  const onDrop = () => {if(fileInputRef.current){fileInputRef.current.classList.remove(`dragOpacity`)}};

  const [tempCustodians, setTempCustodians] = useState<CustodianType[]>([]);
  const onFileUpload = (e: any) => {
    const newFile: File = e.target.files[0];
    if (newFile) {
      setFiles([...files, newFile]);
    }
  };

  const onSubmit = () => {
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
  };

  useEffect(() => {
    console.log(custodian, custodianName);
  }, [custodian, custodianName]);

  useEffect(() => {
    if (filled < 100 && isLoader) {
      setTimeout(() => setFilled((prev) => (prev += 2)), 50);
    } else if (filled === 100) {
      if (filled === 100) {
        setCustodian(tempCustodians);
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
              Drop your file here
            </div>
          </div>
          <div className="fileList">
            {files.length > 0 ? (
              files.map((file: File, index: number) => {
                return (
                  <div className="fileListName" key={index}>
                    {file.name}
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

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
        className={"profileCards"}
      >
        {custodian.map((cust) => {
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

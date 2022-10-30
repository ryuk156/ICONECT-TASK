import { CustodianType } from "../../types";
import "./index.css";

const ProfileCard: React.FC<CustodianType> = ({
  custodianName,
  custodianFiles,
}) => {
  return (
    <div className="profileCardContainer">
      <div className="profileName">Custodian Name: {custodianName}</div>
      <div className="fileHeader"> Uploaded files</div>
      {custodianFiles.map((custodianFile: File, index: number) => {
        return <div className="fileName" key={index}>{custodianFile.name}</div>;
      })}
    </div>
  );
};

export default ProfileCard;

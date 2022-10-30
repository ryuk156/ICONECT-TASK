import { CustodianType } from "../../types";
import "./index.css";

const ProfileCard: React.FC<CustodianType> = ({
  custodianName,
  custodianFiles,
}) => {
  return (
    <div className="profileCardContainer">
      <b> Custodian Name</b>
      <div className="profileName">{custodianName}</div>
      <div className="fileHeader"> Uploaded files</div>
      {custodianFiles.map((custodianFile: File, index: number) => {
        return (
          <div className="fileName" key={index}>
            <i className="fa fa-file fileIcon" /> {custodianFile.name}
          </div>
        );
      })}
    </div>
  );
};

export default ProfileCard;

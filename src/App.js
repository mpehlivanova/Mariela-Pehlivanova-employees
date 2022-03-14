import * as React from "react";
import { makeStyles } from "@mui/styles";
import Btn from "./components/Btn";
import GetAppIcon from '@mui/icons-material/GetApp';
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import TableInfo from "./components/TableInfo";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { fineMax, createPropertyWorkDays, getKeysObject } from "./util";

const useStyles = makeStyles({
  fon: {
    width: "100%",
    height: "100vh",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    width: "100%",
    height: "10vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
  tableInformation: {
    width: "100%",
    height: "40vh",
  },
  tableResult: {
    width: "100%",
    height: "30vh",
  },
  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

function App(props) {
  const style = useStyles();
  const [table, setTable] = React.useState(false);
  const [tableAllInfo, setTableAllInfo] = React.useState(false);
  const [file, setFile] = React.useState();
  const [array, setArray] = React.useState([]);
  const fileReader = new FileReader();
  const fileInput = React.useRef(null);

  const viewResultTable = () => {
    setTableAllInfo(true);
  };
  const viewResultTableLongestProject = () => {
    setTable(true);
  };

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = (string) => {
    const lines = string.split("\n");
    const array = [];
    const headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i]) continue;
      const obj = {};
      const currentline = lines[i].split(",");

      for (let j = 0; j < headers.length; j++) {
        let header = headers[j].trim();
        let curuntLine = currentline[j].trim();
        obj[header] = curuntLine;
      }
      array.push(obj);
    }
    setArray(array);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };
      fileReader.readAsText(file);
    }
  };
  createPropertyWorkDays(array);

  let maxDayOfProject = fineMax(array);

  let headerArr = array.map((row) =>
    getKeysObject(row).map((el) => {
      return el;
    })
  )[0];

  return (
    <>
      <div className={style.fon}>
        <div className={style.input}>
          <form
            onClick={() => {
              fileInput.current.click();
            }}
          >
            <input
              onChange={handleOnChange}
              type="file"
              accept={".csv"}
              ref={fileInput}
              style={{ display: "none" }}
            ></input>
            <Btn name="Uplode File CSV" icon={<DriveFolderUploadIcon />}></Btn>
          </form>
          <div
            onClick={(ev) => {
              handleOnSubmit(ev);
              viewResultTable();
            }}
          >
            <Btn name="Import" icon={<GetAppIcon />}/>
          </div>
        </div>
        {tableAllInfo && (
          <>
            <h3 className={style.flex}>Table of all projects</h3>
            {array.length !== 0 && (
              <TableInfo array={array} headerArr={headerArr} />
            )}
          </>
        )}
        <div
          className={style.flex}
          onClick={() => {
            viewResultTableLongestProject();
          }}
        >
          <Btn name="Find the longest project" icon={<ZoomInIcon />} />
        </div>

        {table && (
          <>
            <h3 className={style.flex}>The longest working project</h3>
            <TableInfo array={maxDayOfProject} headerArr={headerArr} />
          </>
        )}
      </div>
    </>
  );
}

export default App;

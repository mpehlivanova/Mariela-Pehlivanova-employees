import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  fon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  fonTable: {
    width: "50%",
    backgroundColor: " #e6f2ff",
  },
});
export default function TableInfo(props) {
  const style = useStyles();

  return (
    <TableContainer className={style.fon}>
      <Table
        sx={{ width: 500 }}
        aria-label="simple table"
        className={style.fonTable}
      >
        { 
          props.headerArr.map((header,i)=>(
            <TableCell key={i} align="right">
              <strong>{header}</strong>
            </TableCell>
            
          ))
        }
       

        <TableBody>
          {props.array.map((row) => (
            <TableRow
              key={row.EmpID + row.WorkDays}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{row.EmpID}</TableCell>
              <TableCell align="right">{row.ProjectID}</TableCell>
              <TableCell align="right">{row.DateFrom}</TableCell>
              <TableCell align="right">{row.DateTo}</TableCell>
              <TableCell align="right">{row.WorkDays}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

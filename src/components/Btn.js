import * as React from "react";
import { Button } from "@mui/material";

export default function Btn(props) {
  return (
    <Button variant="contained" sx={{ textTransform: "none" }}>
      {props.icon}
      {props.name}
    </Button>
  );
}

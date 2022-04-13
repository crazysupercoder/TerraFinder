import { FC } from "react";
import * as React from "react";

import "assets/css/Landing.css";
import {
  Box,
} from "@mui/material";

interface Props {
    title: string
    children?: any
    style?: any
}

const ItemContainer: FC<Props> = (props:Props) => {

  return (
    <Box
      display="flex"
      flexDirection="column"
      borderRadius="5px"
      overflow="hidden"
      border="1px solid #d8ddf0"
      boxShadow="0 1px 1px 0 rgb(0 0 0 / 5%)"
      mb="30px"
    >
        <Box p="12px 25px" borderBottom="1px solid #d8ddf0" bgcolor="rgba(84,147,247,.1)" fontSize="15px" fontWeight="700">{props.title}</Box>
        <Box p="25px">{props.children}</Box>
    </Box>
  );
};

export default ItemContainer;

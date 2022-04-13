import { FC, useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";
import logo from "assets/images/logo.svg";

import "assets/css/Landing.css";
import { Box } from "@mui/material";
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';

export const CustomInput = styled.input`
    border: none;
    outline: none;
    padding: 5px;
    background: transparent;
    color: white;
    width: 350px;
`

interface LandingProps {
    onSearch: (tokenAddr: string, net: string, currency: string)=>void
}

const Landing: FC<LandingProps> = (props:LandingProps) => {
  useEffect(() => {}, []);
  const [net, setNet] = React.useState("mainnet");
  const [currency, setCurrency] = React.useState("uusd");
  const [value, setValue] = React.useState("");

  const handleChange = (event: any) => {
    setNet(event.target.value);
  };

  const changeCurrency = (event: any) => {
    setCurrency(event.target.value);
  };

  const changeValue = (event: any) => {
    setValue(event.target.value);
  };

  const onKeyEnter = (event: any) => {
    if (event.key === 'Enter' || event.key === 'NumpadEnter') {
      console.log(event.target.value);
      setValue(event.target.value);
      props.onSearch(value, net, currency)
    }
  }

  const onSearch = () => {
      if (!value) return;
      console.log(value, net, currency);
    props.onSearch(value, net, currency)
  }

  return (
    <Box
      position="relative"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      style={{
        backgroundColor: "#0c3694",
        backgroundSize: "cover",
        backgroundPosition: "50%",
      }}
      py="30px"
      px="100px"
    >
      <Box width="100%" display="flex" justifyContent="flex-end">
        <FormControl sx={{ m: 1, minWidth: 150, mr: "30px" }}>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={net}
            onChange={handleChange}
            label="Net"
            sx={{ color: "white" }}
          >
            <MenuItem value={"mainnet"}>MainNet</MenuItem>
            <MenuItem value={"testnet"}>TestNet</MenuItem>
            <MenuItem value={"local"}>LocalTerra</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={currency}
            onChange={changeCurrency}
            label="Net"
            sx={{ color: "white" }}
          >
            <MenuItem value={"uusd"}>USD</MenuItem>
            <MenuItem value={"uaud"}>AUD</MenuItem>
            <MenuItem value={"ucad"}>CAD</MenuItem>
            <MenuItem value={"uchf"}>CHF</MenuItem>
            <MenuItem value={"ucny"}>CNY</MenuItem>
            <MenuItem value={"udkk"}>DKK</MenuItem>
            <MenuItem value={"ueur"}>EUR</MenuItem>
            <MenuItem value={"ugbp"}>GBP</MenuItem>
            <MenuItem value={"uhkd"}>HKD</MenuItem>
            <MenuItem value={"uidr"}>IDR</MenuItem>
            <MenuItem value={"ujpy"}>JPY</MenuItem>
            <MenuItem value={"ukwr"}>KRW</MenuItem>
            <MenuItem value={"umnt"}>MNT</MenuItem>
            <MenuItem value={"umry"}>MYR</MenuItem>
            <MenuItem value={"unok"}>NOK</MenuItem>
            <MenuItem value={"uphp"}>PHP</MenuItem>
            <MenuItem value={"usdr"}>SDR</MenuItem>
            <MenuItem value={"usek"}>SEK</MenuItem>
            <MenuItem value={"usgd"}>SGD</MenuItem>
            <MenuItem value={"uthb"}>THB</MenuItem>
            <MenuItem value={"utwd"}>TWD</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box m="auto" display="flex" flexDirection="column" alignItems="center" width="100%">
        <Box component="img" src={logo} mb="100px" />
        <Box display="flex" justifyContent="space-between" alignItems="center" width="40%" color="white" py="10px" borderBottom="1px solid white" mb="150px">
            <CustomInput value={value} onChange={changeValue}  onKeyPress={onKeyEnter} />
            <Box onClick={onSearch} style={{cursor: 'pointer'}}><SearchIcon /></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Landing;

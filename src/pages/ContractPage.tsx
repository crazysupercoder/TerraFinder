import { FC, useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import * as React from "react";
import logo from "assets/images/logo.svg";

import "assets/css/Landing.css";
import {
  Box,
} from "@mui/material";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import ItemContainer from "components/ItemContainer";
import axios from 'axios'
import _ from 'lodash'
import { shortAddr, insert } from "utils/calculation";
import useMobile from "hooks/useMobile";
import { CustomInput } from "./Landing";

interface Props {
    tokenAddr: string, net: string, currency: string
}

const ContractPage: FC<Props> = (props:Props) => {

  const [net, setNet] = React.useState("mainnet");
  const [currency, setCurrency] = React.useState("uusd");
  const [value, setValue] = React.useState("");
  const [coinInfo, setCoinInfo] =useState([])
  const [coinValue, setCoinValue] = useState<any[]>([])
  const [tx, setTx] = useState([]);
  const [searchable, setSearchable] = useState(false)
  const { isMobile } = useMobile();
  const [isContract, setIsContract] = useState(false);

  useEffect(() => {
      setNet(props.net);
      setCurrency(props.currency);
      setValue(props.tokenAddr);
      console.log(props.net);
    (async() => {
        // get coin info
        try{
            const coin = await axios.get(`https://${props.net === "mainnet" ? '': 'bombay-'}fcd.terra.dev/v1/bank/${props.tokenAddr}`)
            setCoinInfo(coin.data.balance);
            const tx = await axios.get(`https://${props.net === "mainnet" ? '': 'bombay'}fcd.terra.dev/v1/txs?offset=0&limit=100&account=${props.tokenAddr}`)
            setTx(tx.data.txs)
        } catch (e) {
            setCoinInfo([]);
            setTx([]);
        }

    })()
  }, [props.net, props.currency, props.tokenAddr]);

  useEffect(() => {
    if(!searchable) return;
    setSearchable(false);
  (async() => {
      // get coin info
      try{
        const coin = await axios.get(`https://${net === "mainnet" ? '': 'bombay-'}fcd.terra.dev/v1/bank/${value}`)
        setCoinInfo(coin.data.balance);
        const tx = await axios.get(`https://${net === "mainnet" ? '': 'bombay-'}fcd.terra.dev/v1/txs?offset=0&limit=100&account=${value}`)
        setTx(tx.data.txs)
    } catch (e) {
        setCoinInfo([]);
        setTx([]);
    }
    axios.get(`https://${net === "mainnet" ? '': 'bombay-'}fcd.terra.dev/wasm/contracts/${value}`).then(()=>{
      console.log("true")
      setIsContract(true)
    }).catch(e=>{
      console.log("fail")
      setIsContract(false)
    })
  })()
}, [searchable, currency, net]);


  useEffect(() => {
      if(!coinInfo.length) {
          setCoinValue([])
          return;
      }
    (async() => {
        // get coin info
        const coinList = await axios.get(`https://${net === "mainnet" ? '': 'bombay-'}fcd.terra.dev/v1/market/swaprate/${currency}`)
        const coinVal = _.map(coinInfo, (each: any)=>{
            const obj = _.find(coinList.data, {denom: each.denom})
            if(!obj) return;
            const rate = obj.swaprate;
            return {coin: each.denom, val: each.available / Math.pow(10, 6) / rate}
        })
        setCoinValue(coinVal)
    })()
  }, [coinInfo]);

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
      console.log('test')
      setSearchable(true)
    }
  }

  const onSearch = () => {
    if (!value) return;
    setSearchable(true)
  };

  const getCurrentType = (symbol: string) => {
    switch(symbol) {
        case 'uusd': return 'USD';
        case 'uaud': return 'AUD';
        case 'ucad': return 'CAD';
        case 'uchf': return 'CHF';
        case 'ucny': return 'CNY';
        case 'udkk': return 'DKK';
        case 'ueur': return 'EUR';
        case 'ugbp': return 'GBP';
        case 'uhkd': return 'HKD';
        case 'uidr': return 'IDR';
        case 'ujpy': return 'JPY';
        case 'ukwr': return 'KRW';
        case 'umnt': return 'MNT';
        case 'umry': return 'MYR';
        case 'unok': return 'NOK';
        case 'uphp': return 'PHP';
        case 'usdr': return 'SDR';
        case 'usek': return 'SEK';
        case 'usgd': return 'SGD';
        case 'uthb': return 'THB';
        case 'utwd': return 'TWD';
        case 'ukrw': return 'KRW';
        default : return symbol;
    }
  }

  return (
    <Box
      position="relative"
      minHeight="100vh"
      display="flex"
      flexDirection="column" 
    >
      <Box
        width="-webkit-full-available"
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        bgcolor="#0c3694"
        py={!isMobile?"10px":"3px"}
        px={!isMobile?"50px":"15px"}
        color="white"
      >
          <Box component="img" src={logo} onClick={()=>window.location.reload()} width={!isMobile?"160px":"115px"} />
        <Box width="100%"
            display="flex"
            justifyContent="flex-end"
            alignItems="center" 
        >
          {!isMobile && <Box
            mr="30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="40%"
            color="white"
            py="10px"
            borderBottom="1px solid white"
          >
            <CustomInput value={value} onChange={changeValue} onKeyPress={onKeyEnter} />
            <Box onClick={onSearch} style={{ cursor: "pointer" }}>
              <SearchIcon />
            </Box>
          </Box>}
          <FormControl sx={{ m: 1, minWidth: !isMobile?'150px':'50px', mr: !isMobile?"30px":"10px" }}>
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
          <FormControl sx={{ m: 1, minWidth: !isMobile?'50px':'20px' }}>
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
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        width="-webkit-full-available"
        py="50px"
        px={!isMobile?"50px":"15px"}
        color="#0c3694"
      >
          {isMobile && <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="-webkit-full-available"
            color="white"
            py="10px"
            borderBottom="1px solid #0c3694"
            mb="30px"
          >
            <CustomInput value={value} onChange={changeValue} style={{color: '#0c3694'}} placeholder="Search Block / Tx / Account"  onKeyPress={onKeyEnter} />
            <Box onClick={onSearch} style={{ cursor: "pointer" }} color="#0c3694">
              <SearchIcon />
            </Box>
          </Box>}
        <Box fontSize="24px" fontWeight={700} mb="30px">{isContract ? 'Smart Contract' : 'Account Detail' }</Box>
        <ItemContainer title="Address" style={{mb:"20px"}}>
        {props.tokenAddr}
        </ItemContainer>
        <ItemContainer title="Coins" style={{mb:"20px"}}>
            
            {
                _.map(coinInfo, (each: any)=>{
                    const url = each.denom.slice(1)
                    const available = insert(-6, each.available, '.');
                    const price = _.find(coinValue, {coin: each.denom})
                    return <Box key={each.denom} display="flex" p="20px" alignItems="center" mb="20px" width="-webkit-full-available" justifyContent="space-between" border="1px solid #d8ddf0">
                            <Box display="flex">
                                
                                <Box textTransform={"uppercase"}>{(url)}</Box>
                            </Box>
                            <Box display="flex" flexDirection="column" alignItems={'flex-end'}>
                                <Box fontSize="16px" lineHeight="24px">{available}</Box>
                                {price && <Box fontSize="11px" lineHeight="16px">={price.val}USD</Box>}
                            </Box>
                        </Box>
                })
            }
        </ItemContainer>
        <ItemContainer title="Tokens" style={{mb:"20px"}}>
            terra1fvjtg6nem8la4wqul56dzhq6jjdnn8m5h3y92v
        </ItemContainer>
        <ItemContainer title="Transactions" style={{mb:"20px"}}>
            <Box p="20px" borderBottom="1px solid #d8ddf0" display="flex">
                <Box flex={1} minWidth="240px">Tx hash</Box>
                <Box flex={1} minWidth="240px">Type</Box>
                <Box flex={1} minWidth="240px">Block</Box>
                <Box flex={1} minWidth="240px">Timestamp</Box>
                <Box flex={1} minWidth="240px">Fee</Box>
            </Box>
            <Box overflow={'auto'} width="100%">
            {
                    _.map(tx, (each: any) => {
                        return <Box key={each.txhash} p="20px" borderBottom="1px solid #d8ddf0" display="flex">
                            <Box flex={1} minWidth="240px">{shortAddr(each.txhash)}</Box>
                            <Box flex={1} minWidth="240px">{each.tx.value.msg[0]?.type}</Box>
                            <Box flex={1} minWidth="240px">{each.height}(bombay-12)</Box>
                            <Box flex={1} minWidth="240px">{each.timestamp}</Box>
                            <Box flex={1} minWidth="240px">{each.tx.value.fee.amount[0]?.amount/Math.pow(10,6)} {getCurrentType(each.tx.value.fee.amount[0]?.denom)}</Box>
                        </Box>
                    })
            }
            </Box>
        </ItemContainer>
      </Box>
    </Box>
  );
};

export default ContractPage;

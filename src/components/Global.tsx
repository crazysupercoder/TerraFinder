import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const Div = styled((props: any) => <Box {...props} />)`
  color: ${(props) => (props.color ? props.color : "white")};
  font-family: ${(props) => (props.family ? props.family : "Roboto")};
  font-style: normal;
  font-weight: ${(props) => (props.bold === true ? "bold" : (props.fw ? props.fw : "normal"))};
  font-size: ${(props) => {
    return `${
      props.mobile ? (props.fsize * 100) / 390 : (props.fsize * 100) / 1920
    }vw`;
  }};
  display: flex;
  width: ${(props) => {
    return `${
      props.mobile ? (props.wc * 100) / 390 : (props.wc * 100) / 1920
    }vw`;
  }};
  height: ${(props) => {
    return `${
      props.mobile ? (props.hc * 100) / 390 : (props.hc * 100) / 1920
    }vw`;
  }};
  left: ${(props) => {
    return `${
      props.mobile ? (props.lc * 100) / 390 : (props.lc * 100) / 1920
    }vw`;
  }};
  right: ${(props) => {
    return `${
      props.mobile ? (props.rc * 100) / 390 : (props.rc * 100) / 1920
    }vw`;
  }};
  top: ${(props) => {
    return `${
      props.mobile ? (props.tc * 100) / 390 : (props.tc * 100) / 1920
    }vw`;
  }};
  bottom: ${(props) => {
    return `${
      props.mobile ? (props.bc * 100) / 390 : (props.bc * 100) / 1920
    }vw`;
  }};
  padding: ${(props) => {
    return `${
      props.mobile ? (props.pa * 100) / 390 : (props.pa * 100) / 1920
    }vw`;
  }};
  padding-top: ${(props) => {
    return `${
      props.mobile ? (props.pat * 100) / 390 : (props.pat * 100) / 1920
    }vw`;
  }};
  padding-bottom: ${(props) => {
    return `${
      props.mobile ? (props.pab * 100) / 390 : (props.pab * 100) / 1920
    }vw`;
  }};
  padding-left: ${(props) => {
    return `${
      props.mobile ? (props.pal * 100) / 390 : (props.pal * 100) / 1920
    }vw`;
  }};
  padding-right: ${(props) => {
    return `${
      props.mobile ? (props.par * 100) / 390 : (props.par * 100) / 1920
    }vw`;
  }};
  margin: ${(props) => {
    return `${
      props.mobile ? (props.cm * 100) / 390 : (props.cm * 100) / 1920
    }vw`;
  }};
  margin-left: ${(props) => {
    return `${
      props.mobile ? (props.cml * 100) / 390 : (props.cml * 100) / 1920
    }vw`;
  }};
  margin-right: ${(props) => {
    return `${
      props.mobile ? (props.cmr * 100) / 390 : (props.cmr * 100) / 1920
    }vw`;
  }};
  margin-top: ${(props) => {
    return `${
      props.mobile ? (props.cmt * 100) / 390 : (props.cmt * 100) / 1920
    }vw`;
  }};
  margin-bottom: ${(props) => {
    return `${
      props.mobile ? (props.cmb * 100) / 390 : (props.cmb * 100) / 1920
    }vw`;
  }};
`;
import { extendTheme } from "@chakra-ui/react";

const styles = {
  global: {
    "html, body": {
      fontSize: "14px",
    },
  },
};

const fonts = {
  heading: "Alibaba, -apple-system",
  body: "Alibaba, -apple-system",
};

const theme = extendTheme({
  styles,
  fonts,
});

export default theme;

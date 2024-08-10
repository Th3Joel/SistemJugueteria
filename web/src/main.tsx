import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import "driver.js/dist/driver.css";

const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputBase-input": {
              textAlign: "center",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            "& .MuiTabs-indicator": {
              backgroundColor: "#EA4D1C",
            }
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "capitalize",
            border: "1px solid grey",
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem",
            backgroundColor: "white",
            "&.Mui-selected": {
              color: "#EA4D1C",
              borderColor: "#fff",
              border: "1px solid #EA4D1C",
              borderTopLeftRadius: "0.5rem",
              borderTopRightRadius: "0.5rem",
              textTransform: "capitalize",
              fontWeight: "bold",
            },

          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select:{
            textAlign:"center",
          }
        },
      },
      MuiFilledInput:{
        styleOverrides:{
          root: {
            "& .MuiInputBase-input": {
              textAlign: "center",
            },
          },
      }
    }
  }
  });

ReactDOM.createRoot(document.getElementById("root")!).render(
<ThemeProvider theme={theme}><App/></ThemeProvider>);

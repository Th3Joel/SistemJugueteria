import { Card } from "@/modules/core/components/Card";
import {  Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const {value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className="py-1">
          <Outlet />
        </div>
      )}
    </div>
  );
};

const a11yProps = (index: number, event: (id: number) => void) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
    onClick: () => event(index),
  };
};

const CashRegister = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const nv = (i: number) => {
    i == 0 && navigate("/cash-register/you-box");
    i == 1 && navigate("/cash-register/history");
  };


  useEffect(() => {
    switch (location.pathname) {
      case "/cash-register":
        setValue(0);
        break;
      case "/cash-register/you-box":
        setValue(0);
        break;
      case "/cash-register/history":
        setValue(1);
        break;
    }
  }, [location]);

  

  return (
    <div>
      <div className="px-5 mt-2">
        <Tabs value={value} aria-label="basic tabs example" variant="scrollable" scrollButtons="auto">
          <Tab label="Tu Caja" {...a11yProps(0, nv)} />
          <Tab label="Historial" {...a11yProps(1, nv)} />
        </Tabs>
      </div>
      <Card notAnimate>
        <CustomTabPanel value={value} index={value} />
      </Card>
    </div>
  );
};
export default CashRegister;
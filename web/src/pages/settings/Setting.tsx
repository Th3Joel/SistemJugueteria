import { Card } from "@/modules/core/components/Card";
import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Outlet />
        </Box>
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

export const Setting = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const nv = (i: number) => {
    i == 0 && navigate("/settings/users");
    i == 1 && navigate("/settings/profile");
    i == 2 && navigate("/settings/company");
    i == 3 && navigate("/settings/maintenance");
  };


  useEffect(() => {
    switch (location.pathname) {
      case "/settings":
        setValue(0);
        break;
      case "/settings/users":
        setValue(0);
        break;
      case "/settings/profile":
        setValue(1);
        break;
      case "/settings/company":
        setValue(2);
        break;
      case "/settings/maintenance":
        setValue(3);
        break;
    }
  }, [location]);

  

  return (
    <div>
      <div className="px-5 -mb-3 mt-2">
        <Tabs value={value} aria-label="basic tabs example" variant="scrollable" scrollButtons="auto">
          <Tab label="Usuarios" {...a11yProps(0, nv)} />
          <Tab label="Perfil" {...a11yProps(1, nv)} />
          <Tab label="Empresa" {...a11yProps(2, nv)} />
          <Tab label="Mantenimiento" {...a11yProps(3,nv)} />
        </Tabs>
      </div>
      <Card>
        <CustomTabPanel value={value} index={value} />
      </Card>
    </div>
  );
};

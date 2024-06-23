import { Card } from "@/modules/core/components/Card";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Users } from "./tabs/Users";
import { Profile } from "./tabs/Profile";
import { Company } from "./tabs/Company";

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
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

export const Setting = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Card>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Usuarios" {...a11yProps(0)} />
            <Tab label="Perfil" {...a11yProps(1)} />
            <Tab label="Empresa" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Users />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Profile />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Company />
        </CustomTabPanel>
      </Box>
    </Card>
  );
};

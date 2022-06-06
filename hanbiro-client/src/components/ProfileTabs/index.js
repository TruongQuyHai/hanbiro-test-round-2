import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import clsx from "clsx";

import classes from "./style.module.scss";

const ProfileTabs = () => {
  const [value, setValue] = useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs className={clsx(classes.tabs)} value={value} onChange={handleChange}>
          <Tab
            className={clsx(classes.tab, {[classes.active]: value === 0})}
            icon={<VisibilityIcon />}
            iconPosition="start"
            label="Timeline"
          />
          <Tab
            className={clsx(classes.tab, {[classes.active]: value === 1})}
            icon={<PersonIcon />}
            iconPosition="start"
            label="About"
          />
        </Tabs>
      </Box>
    </Box>
  );
};

export default ProfileTabs;

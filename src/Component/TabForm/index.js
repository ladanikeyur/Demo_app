import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PhoneIcon from "@mui/icons-material/Phone";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, changeStap } from "../../Redux/Slice/FormSlice";
import Description from "./Form/Description";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const form = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    dispatch(changeStap(newValue));
  };

  const handleChangeIndex = (index) => {
    dispatch(changeStap(index));
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
      <AppBar position="static">
        <Tabs
          value={form?.formStap}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab
            icon={<PhoneIcon />}
            iconPosition="start"
            label="Description"
            {...a11yProps(0)}
          />
          <Tab
            icon={<PhoneIcon />}
            iconPosition="start"
            label="Module"
            {...a11yProps(1)}
          />
          <Tab
            icon={<PhoneIcon />}
            iconPosition="start"
            label="Tecnologi"
            {...a11yProps(2)}
          />
          <Tab
            icon={<PhoneIcon />}
            iconPosition="start"
            label="Frountend"
            {...a11yProps(3)}
          />
          <Tab
            icon={<PhoneIcon />}
            iconPosition="start"
            label="Backend"
            {...a11yProps(4)}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={form?.formStap}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={form?.formStap} index={0} dir={theme.direction}>
          <Description />
        </TabPanel>
        <TabPanel value={form?.formStap} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={form?.formStap} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
        <TabPanel value={form?.formStap} index={3} dir={theme.direction}>
          Item Four
        </TabPanel>
        <TabPanel value={form?.formStap} index={4} dir={theme.direction}>
          Item Five
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}

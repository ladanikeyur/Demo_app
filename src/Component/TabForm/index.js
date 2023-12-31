import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { changeStap } from "../../Redux/Slice/FormSlice";
import Description from "./Form/Description";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

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
  const navigate = useNavigate();
  const form = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    dispatch(changeStap(newValue));
  };

  const handleChangeIndex = (index) => {
    dispatch(changeStap(index));
  };

  return (
    <>
      <IconButton
        variant="contained"
        sx={{ marginLeft: "auto", display: "block" }}
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        <LogoutIcon />
      </IconButton>
      <Box
        sx={{
          bgcolor: "background.paper",
          width: "80%",
          margin: "auto",
          display: "block",
        }}
      >
        <AppBar position="static" sx={{ backgroundColor: "#343a40" }}>
          <Tabs
            value={form?.formStap}
            onChange={handleChange}
            indicatorColor="light"
            textColor="inherit"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab
              // icon={<PhoneIcon />}
              // iconPosition="start"
              sx={{ textTransform: "initial" }}
              label="Original requirements"
              {...a11yProps(0)}
            />
            <Tab
              // icon={<PhoneIcon />}
              // iconPosition="start"
              sx={{ textTransform: "initial" }}
              label="User stories"
              {...a11yProps(1)}
            />
            <Tab
              // icon={<PhoneIcon />}
              // iconPosition="start"
              sx={{ textTransform: "initial" }}
              label="Competitive analysis"
              {...a11yProps(2)}
            />
            <Tab
              // icon={<PhoneIcon />}
              // iconPosition="start"
              sx={{ textTransform: "initial" }}
              label="Competitive quadrand chart"
              {...a11yProps(3)}
            />
            <Tab
              // icon={<PhoneIcon />}
              // iconPosition="start"
              sx={{ textTransform: "initial" }}
              label="Requirement analysis"
              {...a11yProps(4)}
            />
            <Tab
              // icon={<PhoneIcon />}
              // iconPosition="start"
              sx={{ textTransform: "initial" }}
              label="Requirement pool"
              {...a11yProps(5)}
            />
            <Tab
              // icon={<PhoneIcon />}
              // iconPosition="start"
              sx={{ textTransform: "initial" }}
              label="Ui design draft"
              {...a11yProps(6)}
            />
            <Tab
              // icon={<PhoneIcon />}
              // iconPosition="start"
              sx={{ textTransform: "initial" }}
              label="Data structures and interfaces"
              {...a11yProps(7)}
            />
            <Tab
              // icon={<PhoneIcon />}
              // iconPosition="start"
              sx={{ textTransform: "initial" }}
              label="Recommended technologies"
              {...a11yProps(8)}
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
          <TabPanel value={form?.formStap} index={5} dir={theme.direction}>
            Item Five
          </TabPanel>
          <TabPanel value={form?.formStap} index={6} dir={theme.direction}>
            Item Five
          </TabPanel>
          <TabPanel value={form?.formStap} index={7} dir={theme.direction}>
            Item Five
          </TabPanel>
          <TabPanel value={form?.formStap} index={8} dir={theme.direction}>
            Item Eight
          </TabPanel>
        </SwipeableViews>
      </Box>
    </>
  );
}

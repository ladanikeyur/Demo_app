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
import UserStories from "./Form/UserStories";
import CompetitiveAnalysis from "./Form/CompetitiveAnalysis";
import CompetitiveQuadrandChart from "./Form/CompetitiveQuadrandChart";
import RequirementAnalysis from "./Form/RequirementAnalysis";
import RequirementPool from "./Form/RequrimentPool";
import Design from "./Form/Design";

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
      {/* <IconButton
        variant="contained"
        sx={{ marginLeft: "auto", display: "block" }}
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        <LogoutIcon />
      </IconButton> */}
      <Box
        sx={{
          bgcolor: "background.paper",
          width: "80%",
          margin: "auto",
          display: "block",
          marginTop: "2%",
        }}
      >
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#1034A6",
            ":hover": { backgroundColor: "#1034A6" },
          }}
        >
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
              sx={{
                textTransform: "initial",
                backgroundColor: form?.formStap === 0 ? "#E33530" : "#343a40",
                color: form?.formStap === 0 ? "#ffffff" : "white",
              }}
              label="Original Requirements"
              {...a11yProps(0)}
            />
            <Tab
              // icon={<PhoneIcon />}
              // iconPosition="start"
              sx={{
                textTransform: "initial",
                backgroundColor: form?.formStap === 1 ? "#E33530" : "#343a40",
                color: form?.formStap === 1 ? "#ffffff" : "white",
              }}
              label="User Stories"
              {...a11yProps(1)}
            />
            <Tab
              // icon={<PhoneIcon />}
              // iconPosition="start"
              sx={{
                textTransform: "initial",
                backgroundColor: form?.formStap === 2 ? "#E33530" : "#343a40",
                color: form?.formStap === 2 ? "#ffffff" : "white",
              }}
              label="Competitive Analysis"
              {...a11yProps(2)}
            />
            <Tab
              // icon={<PhoneIcon />}
              // iconPosition="start"
              sx={{
                textTransform: "initial",
                backgroundColor: form?.formStap === 3 ? "#E33530" : "#343a40",
                color: form?.formStap === 3 ? "#ffffff" : "white",
              }}
              label="Competitive Quadrand Chart"
              {...a11yProps(3)}
            />
            <Tab
              // icon={<PhoneIcon />}
              // iconPosition="start"
              sx={{
                textTransform: "initial",
                backgroundColor: form?.formStap === 4 ? "#E33530" : "#343a40",
                color: form?.formStap === 4 ? "#ffffff" : "white",
              }}
              label="Requirement Analysis"
              {...a11yProps(4)}
            />
            <Tab
              // icon={<PhoneIcon />}
              // iconPosition="start"
              sx={{
                textTransform: "initial",
                backgroundColor: form?.formStap === 5 ? "#E33530" : "#343a40",
                color: form?.formStap === 5 ? "#ffffff" : "white",
              }}
              label="Requirement Pool"
              {...a11yProps(5)}
            />
            <Tab
              // icon={<PhoneIcon />}
              // iconPosition="start"
              sx={{
                textTransform: "initial",
                backgroundColor: form?.formStap === 6 ? "#E33530" : "#343a40",
                color: form?.formStap === 6 ? "#ffffff" : "white",
              }}
              label="UI Design Draft"
              {...a11yProps(6)}
            />
            {/* <Tab
              // icon={<PhoneIcon />}
              // iconPosition="start"
              sx={{
                textTransform: "initial",
                backgroundColor: form?.formStap === 7 ? "#E33530" : "#343a40",
                color: form?.formStap === 7 ? "#ffffff" : "white",
              }}
              label="Data Structures And Interfaces"
              {...a11yProps(7)}
            />
            <Tab
              // icon={<PhoneIcon />}
              // iconPosition="start"
              sx={{
                textTransform: "initial",
                backgroundColor: form?.formStap === 8 ? "#E33530" : "#343a40",
                color: form?.formStap === 8 ? "#ffffff" : "white",
              }}
              label="Recommended Technologies"
              {...a11yProps(8)}
            /> */}
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
            <UserStories />
          </TabPanel>
          <TabPanel value={form?.formStap} index={2} dir={theme.direction}>
            <CompetitiveAnalysis />
          </TabPanel>
          <TabPanel value={form?.formStap} index={3} dir={theme.direction}>
            <CompetitiveQuadrandChart />
          </TabPanel>
          <TabPanel value={form?.formStap} index={4} dir={theme.direction}>
            <RequirementAnalysis />
          </TabPanel>
          <TabPanel value={form?.formStap} index={5} dir={theme.direction}>
            <RequirementPool />
          </TabPanel>
          <TabPanel value={form?.formStap} index={6} dir={theme.direction}>
            <Design />
          </TabPanel>
          {/* <TabPanel value={form?.formStap} index={7} dir={theme.direction}>
            <Database />
          </TabPanel>
          <TabPanel value={form?.formStap} index={8} dir={theme.direction}>
            Item Eight
          </TabPanel> */}
        </SwipeableViews>
      </Box>
    </>
  );
}

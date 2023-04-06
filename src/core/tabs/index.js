import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { Grid, Tab, Tabs } from "@mui/material";

export const TabPanel = (props) => {
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

export const MainTabContainer = ({
  mainClass = "",
  tabContainerClass = "",
  tabsClass = "",
  value,
  setValue,
  labels,
}) => {
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={mainClass}>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider" }}
        className={tabContainerClass}
      >
        <Grid container spacing={0}>
          <Grid item md={12} xs={12} sm={7} className={tabsClass}>
            <Tabs
              value={value}
              onChange={handleChange}
              scrollButtons
              variant="scrollable"
              allowScrollButtonsMobile
              style={{ minHeight: "20px" }}
            >
              {labels.map((item) => {
                return <Tab label={item} />;
              })}
            </Tabs>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

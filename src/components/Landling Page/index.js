import { useState } from "react";
import "./index.scss";
import { MainTabContainer, TabPanel } from "../../core/tabs";
import Item from "./item";
import PurchaseOrder from "./purchase-order";
import Vendor from "./vendor";
import Category from "../category";
import Recipe from "../recipe";
import Unit from "../unit";
const LandingPage = () => {
  const [value, setValue] = useState(0);
  const labels = [
    "Vendor",
    "Item",
    "Purchase Order",
    "Category",
    "Recipe",
    "Unit",
  ];
  return (
    <div>
      <MainTabContainer
        tabsClass="custom-tabs"
        value={value}
        setValue={setValue}
        labels={labels}
      />
      <div className="tab-panel-container">
        <TabPanel value={value} index={0}>
          <Vendor />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Item />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <PurchaseOrder />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Category />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Recipe />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <Unit />
        </TabPanel>
      </div>
    </div>
  );
};

export default LandingPage;

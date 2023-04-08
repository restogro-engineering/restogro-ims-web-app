import { useState } from "react";
import "./index.scss";
import { MainTabContainer, TabPanel } from "../../core/tabs";
import Item from "../Item";
import PurchaseOrder from "../Purchase Order";
import Vendor from "../Vendor";
import Category from "../category";
import Recipe from "../recipe";
import Unit from "../unit";
import StockEntry from "../Stock Entry";
const LandingPage = () => {
  const [value, setValue] = useState(0);
  const labels = [
    "Vendor",
    "Item",
    "Purchase Order",
    "Category",
    "Recipe",
    "Unit",
    "Stock Entry"
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
        <TabPanel value={value} index={6}>
          <StockEntry />
        </TabPanel>
      </div>
    </div>
  );
};

export default LandingPage;

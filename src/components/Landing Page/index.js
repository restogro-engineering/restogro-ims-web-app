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
    "Unit",
    "Category",
    "Item",
    "Vendor",
    "Purchase Order",
    "Recipe",
    "Stock Entry",
  ];
  return (
    <div>
      <MainTabContainer
        tabsClass="custom-tabs"
        value={value}
        setValue={setValue}
        labels={labels}
      />
      <div>
        <TabPanel value={value} index={0}>
          <Unit />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Category />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Item />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Vendor />
        </TabPanel>

        <TabPanel value={value} index={4}>
          <PurchaseOrder />
        </TabPanel>

        <TabPanel value={value} index={5}>
          <Recipe />
        </TabPanel>

        <TabPanel value={value} index={6}>
          <StockEntry />
        </TabPanel>
      </div>
    </div>
  );
};

export default LandingPage;

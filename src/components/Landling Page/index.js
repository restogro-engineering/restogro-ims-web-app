import { useState } from "react";
import "./index.scss";
import { MainTabContainer, TabPanel } from "../../core/tabs";
import Item from "./item";
import PurchaseOrder from "./purchase-order";
import Vendor from "./vendor";
const LandingPage = () => {
  const [value, setValue] = useState(0);
  const labels = [
    "Vendor",
    "Item",
    "Purchase Order",
    "Category",
    "Receipe",
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
      </div>
    </div>
  );
};

export default LandingPage;

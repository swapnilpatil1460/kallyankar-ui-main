import * as React from "react";
import GSTTable from "../../components/UI/Table/GSTTable";
import AmphereTable from "../../components/UI/Table/AmphereTable";
import BatteryNameTable from "../../components/UI/Table/BatteryNameTable";
import { useInitialFetch } from "../../hooks";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  useInitialFetch();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className="w-full animate-fade-in"
      {...other}
    >
      {value === index && <div className="p-6">{children}</div>}
    </div>
  );
};

const Battery = () => {
  const [value, setValue] = React.useState(0);
  const tabs = ["Amphere", "Battery List", "GST"];

  return (
    <div className="w-full">
      <div className="flex flex-col justify-center items-center w-full">
        
        {/* Modern SaaS Tabs */}
        <div className="flex space-x-2 bg-slate-100 p-1.5 rounded-full mt-8 shadow-inner w-full max-w-md mx-auto mb-2 border border-slate-200">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setValue(index)}
              className={`flex-1 py-2.5 px-4 rounded-full text-sm font-bold transition-all duration-300 ease-in-out ${
                value === index
                  ? "bg-theme-c1 text-white shadow-md transform scale-100"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-200 transform scale-95"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="w-full">
          <TabPanel value={value} index={0}>
            <AmphereTable />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <BatteryNameTable />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <GSTTable />
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

export default Battery;

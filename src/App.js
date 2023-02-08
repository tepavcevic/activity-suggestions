import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./App.css";
import PriceForm from "./components/Price";
import AccessibilityForm from "./components/Accessibility";
import TypeForm from "./components/Type";
import ParticipantsForm from "./components/Participants";
import Main from "./components/Activity";

function App() {
  const [data, setData] = useState(null);
  const [accessibility, setAccessibility] = useState({
    minaccessibility: 0,
    maxaccessibility: 1,
  });
  const [price, setPrice] = useState({ minprice: 0, maxprice: 1 });
  const [type, setType] = useState(null);
  const [participants, setParticipants] = useState(1);

  const handlePriceChange = (event) => {
    setPrice({
      ...price,
      [event.target.name]: event.target.value,
    });
  };

  const handleAccessibilityChange = (event) => {
    setAccessibility({
      ...accessibility,
      [event.target.name]: event.target.value,
    });
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleParticipantsChange = (event) => {
    setParticipants(event.target.value);
  };

  return (
    <>
      <h1>Im' bored :(</h1>
      <Tabs className="tab">
        <TabList>
          <Tab>Price</Tab>
          <Tab>Accessibility</Tab>
          <Tab>Activity type</Tab>
          <Tab>Number of participants</Tab>
        </TabList>

        <TabPanel>
          <PriceForm
            handlePriceChange={handlePriceChange}
            price={price}
            setData={setData}
          />
        </TabPanel>
        <TabPanel>
          <AccessibilityForm
            handleAccessibilityChange={handleAccessibilityChange}
            accessibility={accessibility}
            setData={setData}
          />
        </TabPanel>
        <TabPanel>
          <TypeForm
            handleTypeChange={handleTypeChange}
            type={type}
            setData={setData}
          />
        </TabPanel>
        <TabPanel>
          <ParticipantsForm
            handleParticipantsChange={handleParticipantsChange}
            participants={participants}
            setData={setData}
          />
        </TabPanel>
      </Tabs>
      {data && <Main data={data} />}
    </>
  );
}

export default App;

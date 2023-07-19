import '../styles/data.css';
import React, { useState, useEffect } from 'react';


const te = require("tradingeconomics");
const MAX_ATTEMPTS = 5; 
const RETRY_DELAY_MS = 1000;

const getData = async (countryTarget, attempt = 1) => {
  try {
    await te.login("f183dcb596b14bb:24f5ol85tuwyfm4"); //Updated API KEY if not loading/working
    const data = await te.getIndicatorData(global.country = countryTarget, global.group = 'health');
    return data;

  } catch (e) {
    console.log(`Error: ${e}`);

    if (attempt < MAX_ATTEMPTS) {
      console.log(`Retrying in ${RETRY_DELAY_MS/1000}s (Attempt ${attempt + 1} of ${MAX_ATTEMPTS})`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      return getData(countryTarget, attempt + 1);
    }

    console.log(`Max re-attempts reached. Failed to fetch data for ${countryTarget}.`);
    throw e;
  }
};


function Data({ cnty }) {
    const [countryData, setCountryData] = useState({
      thailand: [],
      sweden: [],
    });
  
    useEffect(() => {
        getData(cnty)
        .then((fetchedData) => {
          const target = [];
          for (let i = 0; i < fetchedData.length; i++) {
            if (fetchedData[i].Category.includes("Coronavirus")) {
              target.push([
                fetchedData[i].Category,
                fetchedData[i].LatestValue,
                fetchedData[i].Unit,
              ]);
            }
          }
          setCountryData((prevData) => ({
            ...prevData,
            [cnty]: target,
          }));
        })
        .catch((error) => {
          console.log(`Error: ${error} ${cnty}`);
        });
    }, [cnty]);
  
    const data = countryData[cnty];
    
    return (
      <div key={cnty}>
        {data.length ?
          data.map((info, index) => (
            <div className="data-card" key={index}>
              <div className="data-title">
                <h3>{info && info[0]}</h3>
              </div>
  
              <div className="data-card-content">
                <h4>{info && info[1].toLocaleString("en-US")}</h4>
                <h5>&nbsp;({info && info[2].toLowerCase()})</h5>
              </div>
            </div>
          )) : 
          <div className="data-card" >
            <div className="data-error">Error Loading Data...</div>
            <div className="error-suggester">(reload page)</div>
          </div>
          } 
      </div>
    );
}

export default Data;
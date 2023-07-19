import '../styles/time-series.css';
import React, { useState, useEffect } from 'react';
import {Bar} from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";

const te = require("tradingeconomics");
const MAX_ATTEMPTS = 5; 
const RETRY_DELAY_MS = 1000;

const getChartData = async (countryTarget,  attempt = 1) => {
  try {
    await te.login("f183dcb596b14bb:24f5ol85tuwyfm4");//Updated API KEY if not loading/working
    let data = [];
    if (countryTarget === "thailand"){
        data = await te.getComtrade(global.symbol = 'USATHA00001');
    } else{
        data = await te.getComtrade(global.symbol = 'USASWE00001');
    }
    return data;

  } catch (e) {
    console.log(`Error: ${e}`);

    if (attempt < MAX_ATTEMPTS) {
        console.log(`Retrying in ${RETRY_DELAY_MS/1000}s (Attempt ${attempt + 1} of ${MAX_ATTEMPTS})`);
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
        return getChartData(countryTarget, attempt + 1);
      }
  
      console.log(`Max re-attempts reached. Failed to fetch data for ${countryTarget}.`);
      throw e;
  }
};

function TimeSeries({cnty}){
    const [countryData, setCountryData] = useState({
        thailand: [],
        sweden: [],
      });
    
      useEffect(() => {
        getChartData(cnty)
          .then((fetchedData) => {
            if (Array.isArray(fetchedData)) {
              const formattedData = fetchedData.map((data) => ({
                date: data.date,
                value: data.value,
              }));
    
              setCountryData((prevData) => ({
                ...prevData,
                [cnty]: formattedData,
              }));
            }
          })
          .catch((error) => {
            console.log(`Error: ${error} ${cnty}`);
          });
      }, [cnty]);
    
      const data = {
        labels: countryData[cnty].map((data) => data.date.split('-')[0]),
        datasets: [
          {
            label: 'US Imports from ' + cnty,
            data: countryData[cnty].map((data) => data.value),
            backgroundColor: '#FF8C42',
          },
        ],
      };

     
      return (
        <>
          {countryData[cnty].length > 0 ? <div className='bar-card'><Bar data={data} /></div>
           :
           <div className="data-card" >
            <div className="data-error">Error Loading Data Chart...</div>
            <div className="error-suggester">(reload page)</div>
          </div> 
           }
        </>
      );
}

export default TimeSeries;
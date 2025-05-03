import { useState } from "react";
import axios from "axios";
import "./App.css";

const states = [
  "Assam",
  "Mizoram",
  "Meghalaya",
  "Manipur",
  "Nagaland",
  "Tripura",
  "Sikkim"
];

function App() {
  const [selectedState, setSelectedState] = useState("");
  const [uniquePincodes, setUniquePincodes] = useState(0);
  const [uniqueDistricts, setUniqueDistricts] = useState(0);
  const [loading, setLoading] = useState(false);
  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleStateChange = async (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setLoading(true);
  
    try {
      const apiKey = "579b464db66ec23bdd000001ed0d18ec6522403e690612dad673abc2";
      const baseUrl = "https://api.data.gov.in/resource/5c2f62fe-5afa-4119-a499-fec9d604d5bd";
      const format = "json";
      const limit = 1000;
      let offset = 0;
      let allRecords = [];
      const maxPages = 50; // Safety cap (fetch up to 50k entries max)
  
      for (let page = 0; page < maxPages; page++) {
        const response = await axios.get(baseUrl, {
          params: {
            "api-key": apiKey,
            format,
            limit,
            offset,
            [`filters[statename]`]: state.toUpperCase(),
          },
        });
  
        const records = response.data.records;
        if (!records || records.length === 0) break;
  
        allRecords = allRecords.concat(records);
        offset += limit;
  
        if (records.length < limit) break; // No more pages
  
        await sleep(200); // Avoid hitting rate limit
      }
  
      const pincodes = new Set(allRecords.map((item) => item.pincode));
      const districts = new Set(allRecords.map((item) => item.district));
  
      setUniquePincodes(pincodes.size);
      setUniqueDistricts(districts.size);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="app">
      <h1>North East State Pincode Finder</h1>
      <select value={selectedState} onChange={handleStateChange}>
        <option value="">Select a State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {loading ? (
        <p>Loading...</p>
      ) : (
        selectedState && (
          <div className="result">
            <p className="text">
              {selectedState} has {uniquePincodes} Pincodes and {uniqueDistricts} Districts
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default App;
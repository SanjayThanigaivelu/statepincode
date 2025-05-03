# 🗺️ North East State Pincode Finder

A React-based application to explore the number of unique **pincodes** and **districts** in the **North East Indian states** using data from the [Data.gov.in](https://data.gov.in/) public API.

---

## 🚀 Features

- ✅ Search by State (Assam, Mizoram, Meghalaya, Manipur, Nagaland, Tripura, Sikkim)
- ✅ Displays unique pincodes and districts
- ✅ Fetches real-time data using official Government of India API
- ✅ Paginated API fetching for full data retrieval

---

## 📦 Technologies Used

- React (via Vite or Create React App)
- Axios for API requests
- HTML/CSS for styling

---

## 🌐 API Info

Data is fetched from [Data.gov.in](https://data.gov.in/):
- **Resource ID:** `5c2f62fe-5afa-4119-a499-fec9d604d5bd`
- **API Key:** Public (or your own registered key)
- **Output Format:** JSON
- **Pagination:** Implemented using `limit` and `offset`
- **Filtered By:** `filters[statename]`

---

## 🛠️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/northeast-pincode-finder.git
cd northeast-pincode-finder

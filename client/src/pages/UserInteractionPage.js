
import React from "react";
// import "../SearchBar.css";
import SearchBar from "../UserSearchBar";
import SeedData from "../Seeds.json";

function Content() {
  return (
    <div className="App">
      <SearchBar placeholder="Enter a Book Name..." data={SeedData} />
    </div>
  );
}

export default Content;
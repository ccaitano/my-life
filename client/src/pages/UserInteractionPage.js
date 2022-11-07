
import React from "react";
import "../cs";
import SearchBar from "./Components/SearchBar";
import SeedData from "../Seeds.json";

function Content() {
  return (
    <div className="App">
      <SearchBar placeholder="Enter a Book Name..." data={SeedData} />
    </div>
  );
}

export default Content;
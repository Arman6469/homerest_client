import React from "react";
import './searchbar.scss'

export default function SearchBar({ setSearch, setActive }) {
  const func = (e) => {
    setSearch(e.target.value.trim().toLowerCase());
    setActive(1);
  };
  return (
    <div className="ui icon input search_input" >
      <i className="search icon"></i>
      <input type="text"  className="search_text"  placeholder="Search..." onChange={(e) => func(e)} />
    </div>
  );
}

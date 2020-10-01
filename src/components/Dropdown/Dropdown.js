import React from "react";
import "./dropdown.scss";

export default function Dropdown({ products, setProducts, setActive }) {
  const sortToHigh = () => {
    const sortedProducts = products.sort((a, b) => {
      return a.price - b.price;
    });
    setActive(1);
    setProducts([...sortedProducts]);
  };
  const sortToLower = () => {
    const sortedProducts = products.sort((a, b) => {
      return b.price - a.price;
    });
    setActive(1);
    setProducts([...sortedProducts]);
  };
  const sortBySale = () => {
    const sortedProducts = products.sort((a, b) => {
      return b.sale - a.sale;
    });
    setActive(1);
    setProducts([...sortedProducts]);
  };
  return (
    <div className="drop">
      <div className="dropdown_main">
        <div className="dropdown_left">
          <i className="filter icon" style={{width: "1vw"}}></i>
        </div>
        <div className="dropdown_right">Filter</div>
      </div>
      <div className="choices">
        <p className="choice" onClick={sortToLower}>
          Թանկից Էժան
        </p>
        <p className="choice" onClick={sortToHigh}>
          Էժանից Թանկ
        </p>
        <p className="choice" onClick={sortBySale}>
          Զեղչվածներ
        </p>
      </div>
    </div>
  );
}

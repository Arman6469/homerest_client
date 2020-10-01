import React from "react";
import "./headershopitem.scss";
import { useHistory } from "react-router-dom";

export default function HeaderShopItem({
  item,
  scrolled,
  setCurrent,
  setCurrentAll,
}) {
  const history = useHistory();
  const category = item.category;
  const historyPush = () => {
    history.push(`/shop/?category=${category}`);
    setCurrent(item._id);
    setCurrentAll(item.all[0]._id);
  };
  return (
    <div className="header_shop">
      <div className="header_shop_item" onClick={historyPush}>
        <img
          src={!scrolled ? item.red_icon : item.white_icon}
          alt={item.title}
          width="100%"
        />
      </div>
      <p
        className={
          !scrolled
            ? "font-red upper shop_item_title"
            : "font-whitesmoke upper shop_item_title"
        }
      >
        {item.title}
      </p>
      <div className="item_main_image">
        <img src={item.image} alt="main" width="100%" height="100%" />
      </div>
    </div>
  );
}

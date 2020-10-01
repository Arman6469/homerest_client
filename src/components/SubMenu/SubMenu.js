import React from "react";
import { Menu } from "antd";
import "antd/dist/antd.css";
import "./submenu.scss";
import { useHistory } from "react-router-dom";

const { SubMenu } = Menu;

export default function SideBar({
  headerItems,
  current,
  currentAll,
  setCurrent,
  setCurrentAll,
  setActive,
}) {
  const history = useHistory();
  const changeHistory = (category, type, id) => {
    history.push(`/shop/?category=${category}&type=${type}`);
    setCurrentAll(id);
  };

  const showAll = () => {
    history.push("/shop");
    setCurrentAll("all");
    setActive(1);
  };

  const allClicked = (category, id) => {
    history.push(`/shop/?category=${category}`);
    setCurrentAll(id);
    setActive(1);
  };
  const subMenuClicked = (id) => {
    setCurrent(id);
  };

  return (
    <Menu
      className="sub_menu font_sub_title"
      mode={"inline"}
      theme={"light"}
      openKeys={[`sub${current}`]}
      selectedKeys={[currentAll]}
    >
      <Menu.Item className="font_sub_title bg-gray" key={"all"} onClick={showAll}>
        All
      </Menu.Item>
      {headerItems
        ? headerItems.map((category) => {
            return (
              <SubMenu
                key={`sub${category._id}`}
                title={category.title}
                className="font_sub_title"
                onTitleClick={() => subMenuClicked(category._id)}
              >
                <Menu.Item
                  className="bg-gray font_sub_text"
                  key={category.all[0]._id}
                  onClick={() =>
                    allClicked(category.category, category.all[0]._id)
                  }
                >
                  {category.all[0].alltype}
                </Menu.Item>
                {category.products.map((product) => {
                  return (
                    <Menu.Item
                      className="bg-gray font_sub_text"
                      key={product._id}
                      onClick={() =>
                        changeHistory(
                          category.category,
                          product.furtype,
                          product._id
                        )
                      }
                    >
                      {product.furtype}
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            );
          })
        : null}
    </Menu>
  );
}

import React, { useState, useMemo, useEffect } from "react";
import "./shoppage.scss";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import ProductCard from "../../components/ProductCard/ProductCard";
import SubMenu from "../../components/SubMenu/SubMenu";
import { connect } from "react-redux";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Pagination } from "../../components/Pagination/Pagination";
import Loading from "../../components/Loading/Loading";
import Dropdown from "../../components/Dropdown/Dropdown";

function ShopPage(props) {
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState(1);
  const query = useLocation();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const newquery = useMemo(() => qs.parse(query.search.replace(/\s+/g, "")), [
    query,
  ]);
  const [elNumInPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const productsInPage = useMemo(() => {
    return products?.length
      ? products.slice(
          (currentPage - 1) * elNumInPage,
          elNumInPage * currentPage
        )
      : [];
  }, [products, elNumInPage, currentPage]);

  
  useEffect(() => {
    if (props.data && props.data.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [props.data]);
  useEffect(() => {
    if (props.data) {
      if (!Object.entries(newquery).length) {
        if (search) {
          setProducts(
            props.data.filter((product) => product.title.includes(search))
          );
        } else {
          setProducts(props.data);
        }
      } else {
        const filteredProducts = props.data.filter(
          (product) =>
            (!newquery.category || product.category === newquery.category) &&
            (!newquery.type || product.type === newquery.type)
        );
        if (search) {
          setProducts(
            filteredProducts.filter((product) => product.title.includes(search))
          );
        } else {
          setProducts(filteredProducts);
        }
      }
    }
  }, [newquery, props.data, search]);

  const renderPage = () => {
    if (loading) return <Loading />;
    return (
      <div className="flex-column w-100">
        <div className="shop pt-7">
          <SubMenu
            headerItems={props.headerItems}
            current={props.current}
            currentAll={props.currentAll}
            setCurrentAll={props.setCurrentAll}
            setCurrent={props.setCurrent}
            setActive={setActive}
          />
          <div className="flex-column w-83">
            <div className="jscac">
              <Dropdown products={products} setProducts={setProducts} setActive={setActive}/>
              <SearchBar setSearch={setSearch} setActive={setActive} />
            </div>
            <div className="shop_products">
              {productsInPage.length
                ? productsInPage.map((product) => {
                    return <ProductCard key={product._id} product={product} />;
                  })
                : null}
            </div>
          </div>
        </div>

        <Pagination
          length={Math.ceil(products.length / elNumInPage)}
          handleChange={(page) => setCurrentPage(page)}
          active={active}
          setActive={setActive}
        />
      </div>
    );
  };

  return renderPage();
}

const mapStateToProps = (state) => {
  return {
    data: state.fetchData.products,
  };
};

export default connect(mapStateToProps)(ShopPage);

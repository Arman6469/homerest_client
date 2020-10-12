import React, { useEffect, useState } from "react";
import "./homepage.scss";
import MySlider from "../../components/Slider/MySlider";
import slider_2 from "../../assets/7.jpg";
import slider_3 from "../../assets/8.jpg";
import main from "../../assets/baby.jpg";
import bed from "../../assets/bed.png";
import bedroom from "../../assets/bedroom.png";
import clothes from "../../assets/clothes.png";
import desk from "../../assets/desk.png";
import shelf from "../../assets/shelf.png";
import pillow from "../../assets/pillow.png";
import chari1 from "../../assets/chair1.png";
import armchair from "../../assets/sofa1.png";
import desktop from "../../assets/desktop.png";
import dinner_table from "../../assets/dinner-table.png";
import dressing_table from "../../assets/dressing-table.png";
import furniture from "../../assets/furniture.png";
import MultiSlider from "../../components/MultiSlider/MultiSlider";
import ProductCard from "../../components/ProductCard/ProductCard";
import { NavLink } from "react-router-dom";
import ReactPlayer from "react-player/lazy";
import globalAPI from "../../api/globalAPI";

const sliderImages = [main, slider_2, slider_3];
const multiSliderImages = [
  { image: bed },
  { image: bedroom },
  { image: clothes },
  { image: desk },
  { image: desktop },
  { image: dinner_table },
  { image: dressing_table },
  { image: furniture },
  { image: shelf },
  { image: chari1 },
  { image: pillow },
  { image: armchair },
];

export default function HomePage() {
  const [videoURL, setVideoURL] = useState("");
  const [productsonsale, setProductOnSale] = useState([]);

  const fetcheSaledProducts = async () => {
    try {
      const data = await globalAPI.get("/products/sale");
      setProductOnSale(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVideo = async () => {
    try {
      const videoURL = await globalAPI.get("/video");
      setVideoURL(videoURL.data[0].url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetcheSaledProducts();
    fetchVideo();
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div className="homepage flex-column">
      <section className="homepage_carousel">
        <MySlider sliderImages={sliderImages} />
      </section>
      <MultiSlider multiSliderImages={multiSliderImages} />
      <h2 className="font-red font-h1 upper mt-5">Զեղչված Ապրանքներ</h2>
      <div className="discounted_products flex-wrap">
        {productsonsale
          ? productsonsale.map((product, index) =>
              index < 6 ? (
                <ProductCard product={product} key={product._id} />
              ) : null
            )
          : null}
      </div>

      <NavLink to="/shop">
        <div className="see_all_products mt-5 font-small capitalize">
          Տեսնել բոլոր մոդելները
        </div>
      </NavLink>

      <div className="mt-3 player_div">
        <ReactPlayer url={videoURL} width="100%" height="100%" />
      </div>

      <h2 className="font-red font-h1 upper mt-5">Մեր պատմությունը</h2>
      <div className="our_story">
        <NavLink to="/about" className="home_our_story_link">
          Մեր Պատմությունը
        </NavLink>
      </div>

      <h2 className="font-red font-h1 upper mt-5">Հավաքածուներ</h2>
      <div className="our_collections">
        <div className="our_collection"></div>
        <div className="our_collection" id="collection_2"></div>
        <div className="our_collection" id="collection_3"></div>
        <div className="our_collection" id="collection_4"></div>
      </div>
    </div>
  );
}

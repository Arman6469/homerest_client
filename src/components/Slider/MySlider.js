import React, { useState, useRef, useCallback , useMemo, useEffect} from "react";
import "./slider.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function MySlider({ sliderImages }) {
  const [activeElem, setActiveElem] = useState(0);

  const S = useRef();
  const swap = useCallback(
    (num) => {
      sliderImages?.length &&
        setActiveElem(
          (aImg) =>
            (aImg + num + sliderImages?.length) % sliderImages?.length
        );
      clearInterval(S.current);
      S.current = setInterval(() => swap(1), 4000);
    },
    [sliderImages]
  );
  if (activeElem === sliderImages.length - 6) {
    setActiveElem(0);
  }
  const position = useMemo(() => activeElem * -100, [activeElem]);

  const goRight = () => {
    swap(1);
  };
  const goLeft = () => {
    swap(-1);
  };
  useEffect(() => {
    S.current = setInterval(() => swap(1), 4000);
    return () => clearInterval(S.current);
  }, [swap]);

  return (
    <div style={{ position: "relative" }}>
      <div className="slider">
        {sliderImages.map((image, index) => {
          return (
            <div
              className="slide"
              key={index}
              style={{ transform: `translateX(${position}%)` }}
            >
              <img
                src={image}
                className="fit-img"
                alt="nkar"
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </div>
          );
        })}

        <div className="slide-button-left" onClick={goLeft}>
          <FontAwesomeIcon icon={faChevronLeft} />{" "}
        </div>
        <div className="slide-button-right" onClick={goRight}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    </div>
  );
}

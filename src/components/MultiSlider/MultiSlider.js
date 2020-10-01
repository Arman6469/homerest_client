import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
} from "react";
import "./multislider.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function MultiSlider({ multiSliderImages }) {
  const [activeElem, setActiveElem] = useState(0);

  const S = useRef();
  const swap = useCallback(
    (num) => {
      multiSliderImages?.length &&
        setActiveElem(
          (aImg) =>
            (aImg + num + multiSliderImages?.length) % multiSliderImages?.length
        );
      clearInterval(S.current);
      S.current = setInterval(() => swap(1), 4000);
    },
    [multiSliderImages]
  );
  if (activeElem === multiSliderImages.length - 6) {
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
    <div className="jscac mt-5">
      <div className="multi-slider">
        <div className="multi-slide-button-left" onClick={goLeft}>
          <FontAwesomeIcon icon={faChevronLeft} />{" "}
        </div>
        {multiSliderImages.map((image, index) => {
          return (
            <div
              className="multi-slide"
              key={index}
              style={{ transform: `translateX(${position}%)` }}
            >
              <img src={image.image} alt="nkar" style={{ width: "40%" }} />
            </div>
          );
        })}

        <div className="multi-slide-button-right" onClick={goRight}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    </div>
  );
}

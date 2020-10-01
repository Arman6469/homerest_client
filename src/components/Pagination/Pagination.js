import React from "react";
import "./pagination.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useCallback } from "react";

export const Pagination = ({ length, handleChange, active, setActive }) => {
  const ScrollUp = () => {
    window.scrollTo({ top: "0", behavior: "smooth" });
  };
  const location = useLocation();

  const change = useCallback(
    (num) => {
      if (num > length || num < 1) return;
      setActive(num);
      handleChange(num);
      ScrollUp();
    },
    [handleChange, length, setActive]
  );

  useEffect(() => {
    change(active);
  }, [location, active, change]);

  return length <= 1 ? (
    " "
  ) : (
    <div className=" pagination ">
      <div
        className="pagination-item jscac font-bb bg-yellow font-white jscac "
        onClick={() => change(active - 1)}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      {new Array(length).fill(" ").map((a, idx) => {
        return (
          <div
            key={idx}
            className={
              active === idx + 1
                ? "border-circle pagination-item font-red"
                : "border-circle  pagination-item font-white"
            }
            onClick={() => change(idx + 1)}
          >
            <span className="h3">{idx + 1}</span>
          </div>
        );
      })}
      <div
        className="pagination-item jscac font-bb bg-yellow font-white "
        onClick={() => change(active + 1)}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </div>
  );
};

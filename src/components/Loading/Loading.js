import React from "react";
import Loader from "react-loader-spinner";
import './loading.scss'

export default function Loading() {
  return (
    <div className="loader">
      <Loader type="Oval" width="100" height="100" color="#5d0c1d" timeout={1000} />
    </div>
  );
}

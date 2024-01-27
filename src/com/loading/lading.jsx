import React from "react";
import PropTypes from "prop-types";
import "./loading.scss";
export const Loading = ({ setTrue }) => {
  return (
    <>
      <div
        className={
          setTrue
            ? "fixed z-100 left-0 top-0 w-full h-full overflow-auto flex items-center justify-center bg-black bg-opacity-20 opacity-70"
            : "hidden"
        }
      >
        <div className="containers">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </>
  );
};

Loading.propTypes = {
  setTrue: PropTypes.bool.isRequired,
};

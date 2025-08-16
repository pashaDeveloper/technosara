import React from "react";

const Brand = ({ className, ...props }) => {
  return (
    <svg
      {...props}
      className={"w-5 h-5" + (className ? " " + className : "")}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M2 12a2 2 0 0 0 2-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2M2 12a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2" />
        <path d="M9 16V8h3.5a2 2 0 1 1 0 4H9h4a2 2 0 1 1 0 4z" />
      </g>
    </svg>
  );
};

export default Brand;

import * as React from "react";

function SvgHome(props) {
  return (
    <svg height={40} width={40} {...props}>
      <path d="M256 0L0 192.266V512h190.667V302h130.666v210H512V192.266z" />
    </svg>
  );
}

export default SvgHome;

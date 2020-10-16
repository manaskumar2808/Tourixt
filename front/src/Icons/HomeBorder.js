import * as React from "react";

function SvgHomeBorder(props) {
  return (
    <svg height={512} width={512} {...props}>
      <path d="M256 0L0 192.266V512h190.667V302h130.666v210H512V192.266zm226 482H351.333V272H160.667v210H30V207.253L256 37.519l226 169.734z" />
    </svg>
  );
}

export default SvgHomeBorder;

import React from "react";

const Divider = React.memo(() => {
  return <div className="my-3 rounded-full bg-neutral-700 p-[0.5px]"></div>;
});
Divider.displayName = "Divider";
export default Divider;

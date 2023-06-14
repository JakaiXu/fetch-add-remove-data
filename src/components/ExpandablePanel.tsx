import React, { useState } from "react";
import { BiDownArrow, BiLeftArrow } from "react-icons/bi";
type Props = {
  header: JSX.Element;
  children: React.ReactNode;
};
const ExpandablePanel = ({ header, children }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpand = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="mb-4 mx-4 ">
      <div className="border-2 border-gray-500 rounded-lg ">
        <div className="flex  justify-between border-b-2">
          <div className="flex justify-between">{header}</div>
          <div onClick={handleExpand} className="self-center cursor-pointer">
            {expanded ? (
              <BiDownArrow className="text-2xl self-center mr-4" />
            ) : (
              <BiLeftArrow className="text-2xl self-center mr-4" />
            )}
          </div>
        </div>
        {expanded && <div className="my-4 mx-6">{children}</div>}
      </div>
    </div>
  );
};

export default ExpandablePanel;

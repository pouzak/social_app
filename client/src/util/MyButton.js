import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

export default ({ children, tip, onClick, btnClass }) => {
  return (
    <Tooltip title={tip}>
      <IconButton onClick={onClick} className={btnClass}>
        {children}
      </IconButton>
    </Tooltip>
  );
};

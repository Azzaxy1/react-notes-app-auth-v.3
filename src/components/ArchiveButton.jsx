// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

import { Archive } from "lucide-react";

const ArchiveButton = ({ id, onArchive }) => {
  return (
    <>
      <Archive
        className="cursor-pointer size-7 hover:text-slate-400"
        onClick={() => onArchive(id)}
      />
    </>
  );
};

ArchiveButton.propTypes = {
  id: PropTypes.string.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default ArchiveButton;

import numberTrim from "@/app/hooks/number";
import React, { useState } from "react";
import ChiqimItemModal from "./ChiqimItemModal";
const ChiqimItem = (props) => {
  const [show, setShow] = useState(false);
  const { costType, costValue, infoValue, tolovType } = props;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <tr onClick={handleShow}>
        <td>{costType}</td>
        <td>{numberTrim(costValue)} so`m</td>
        <td>{infoValue}</td>
        <td>{tolovType}</td>
      </tr>
      {/* <ChiqimItemModal show={show} handleClose={handleClose} {...props} /> */}
    </>
  );
};

export default ChiqimItem;

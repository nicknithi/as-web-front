import React, { useEffect, useState } from "react";
import WarrantyShowDetailCost from "../carouselShow/warrantyShowDetailCost";
import ElementCarousel from "../Content/ElementCarousel";
export default function CostWarrantyDetail({ data }) {
  const [DataCarousel, setDataCarousel] = useState([]);
  const [DataListSet, setDataLiatSet] = useState(0);
  const columcOption = {
    0: "col-md-12",
    1: "col-md-12",
    2: "col-md-6",
    3: "col-md-4",
    4: "col-md-3",
    5: "col-md-2_5",
  };
  useEffect(() => {
    const dataList = data.file;
    console.log("dataList", dataList);
    if (dataList !== undefined && dataList.length) {
      const group = [];
      let tempOrder = dataList[0].file_order;
      group.push(dataList.filter((d) => d.file_order === tempOrder));
      dataList.forEach((item, index) => {
        if (item.file_order !== tempOrder) {
          group.push(dataList.filter((d) => d.file_order === tempOrder));
          tempOrder = item.file_order;
        }
      });
      setDataCarousel(group);
      setDataLiatSet(data.content_col);
    }
  }, [data]);
  return (
    <div className="cost-warranty-detail py-4 position-relative px-3">
      <h3 className="title mb-4">อัตราค่าบริการและการรับประกัน</h3>
      <div className="row">
        {DataCarousel.map((item, index) => (
          <div className={`${columcOption[DataListSet]} position-static`}>
            <ElementCarousel key={index} data={item} />
          </div>
        ))}
      </div>

      {/* <WarrantyShowDetailCost /> */}
    </div>
  );
}

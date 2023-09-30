import React, { useEffect, useState } from "react";
import ChoiceLight from "./ChoiceLight.tsx";
import { IChoiceLightProps, IProps } from "./interface";
import { Row, Col } from "antd";
import { db } from "../firebase.tsx";
import { ref, onValue } from "firebase/database";

const ChoiceMeatList = () => {
  const [data, setData] = useState<IProps[]>([]);

  useEffect(() => {
    const dbRef = ref(db, "choiceMeat");
    onValue(dbRef, (snapshot) => {
      const dataList = snapshot.val();
      const dataArray = [];
      for (let id in dataList) {
        const mergedString = Object.values(dataList[id]).join("");
        dataArray.push({ id, light: mergedString });
      }
      setData(dataArray);
    });
  }, []);

  const IChoiceLight: IChoiceLightProps[] = [
    {
      imgSrc:
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_12030/20190422101457_ySiD2/jpg",
      name: "義式香草",
    },
    {
      imgSrc:
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_12030/20190422101709_BNrOB/jpg",
      name: "經典湖鹽",
    },
    {
      imgSrc:
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_12030/20190422101740_3rHL1/jpg",
      name: "大蒜辣椒",
    },
    {
      imgSrc:
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_12030/20190422101909_wdghg/jpg",
      name: "美式炭烤",
    },
    {
      imgSrc:
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_12030/20190422102001_XFNsm/jpg",
      name: "番茄羅勒",
    },
    {
      imgSrc:
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_12030/20210922045940_m5plr/jpg",
      name: "台式油蔥",
    },
    {
      imgSrc:
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_12030/20210922045305_gMCLr/jpg",
      name: "墨西哥塔可",
    },
    {
      imgSrc:
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_12030/20211020090001_afTA6/jpg",
      name: "熱那亞羅勒",
    },
    {
      imgSrc:
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_12030/20211020090001_afTA6/jpg",
      name: "和風柚香",
    },
    {
      imgSrc:
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_12030/20211020090001_afTA6/jpg",
      name: "巴蜀麻辣",
    },
    {
      imgSrc:
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_12030/20211020090001_afTA6/jpg",
      name: "鹽水香蔥",
    },
  ];

  return (
    <>
      <div
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          textAlign: "center",
          margin: "20px 0",
        }}
      >
        8/25號晚上七點 在台灣台北市信義區菸廠路88號2樓Hubox
      </div>
      <div className="mb-3">
        <a href="https://www.kkday.com/zh-tw/product/12030">
          詳情請點選此KK day連結
        </a>
      </div>
      <Row gutter={[16, 16]}>
        {IChoiceLight.map((item, index) => (
          <Col span={6} key={index}>
            <ChoiceLight
              imgSrc={item.imgSrc}
              price={item.price}
              name={item.name}
            />
          </Col>
        ))}
      </Row>
      <div>目前的登入玩家：</div>
      <div>
        {data.map((item, index) => (
          <div key={index}>
            {item.id} - {item.light}
          </div>
        ))}
      </div>
    </>
  );
};

export default ChoiceMeatList;

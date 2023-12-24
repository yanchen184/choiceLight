import { useEffect, useState } from "react";
import ChoiceLight from "./ChoiceLight";
import { IChoiceLightProps, IProps } from "./interface";
import { Row, Col } from "antd";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";

const ChoiceLightList = () => {
  const [data, setData] = useState<IProps[]>([]);

  useEffect(() => {
    const dbRef = ref(db, "choiceLight");
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
      price: 1290,
      name: "工業風造型桌燈",
    },
    {
      imgSrc:
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_12030/20190422101709_BNrOB/jpg",
      price: 1290,
      name: "原木造型小樹燈",
    },
    {
      imgSrc:
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_12030/20190422101740_3rHL1/jpg",
      price: 990,
      name: "Q 比克造型桌燈",
    },
    {
      imgSrc:
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_12030/20190422101909_wdghg/jpg",
      price: 1690,
      name: "探險家造型桌燈",
    },
    {
      imgSrc:
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_12030/20190422102001_XFNsm/jpg",
      price: 2090,
      name: "吹吹風機器人造型桌燈",
    },
    {
      imgSrc:
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_12030/20210922045940_m5plr/jpg",
      price: 2090,
      name: "皮克斯造型桌燈",
    },
    {
      imgSrc:
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_12030/20210922045305_gMCLr/jpg",
      price: 1990,
      name: "迷你水龍頭造型桌燈",
    },
    {
      imgSrc:
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_12030/20211020090001_afTA6/jpg",
      price: 2590,
      name: "仿舊水龍頭造型桌燈",
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
              price={item.price || 0}
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

export default ChoiceLightList;

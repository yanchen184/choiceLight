import { useEffect, useState } from "react";
import ChoiceLight from "./ChoiceLight";
import { IChoiceLightProps, IProps } from "./interface";
import { Row, Col } from "antd";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import "./ChoiceLight.css";

const ChoiceLightList = () => {
  const [data, setData] = useState<IProps[]>([]);

  useEffect(() => {
    const dbRef = ref(db, "choiceLight");
    onValue(dbRef, (snapshot) => {
      const dataList = snapshot.val();
      const dataArray = [];
      for (let id in dataList) {
        const light = dataList[id].light || "";
        dataArray.push({ id, light });
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
    <div className="choice-light-container">
      <div className="choice-light-header">
        8/25號晚上七點 在台灣台北市信義區菸廠路88號2樓Hubox
      </div>
      
      <a 
        href="https://www.kkday.com/zh-tw/product/12030"
        className="choice-light-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        詳情請點選此KK day連結
      </a>
      
      <Row gutter={[16, 16]}>
        {IChoiceLight.map((item, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <div className="choice-light-card">
              <ChoiceLight
                imgSrc={item.imgSrc}
                price={item.price || 0}
                name={item.name}
              />
            </div>
          </Col>
        ))}
      </Row>
      
      {data.length > 0 && (
        <div className="choice-light-players">
          <div className="choice-light-players-title">目前的登入玩家：</div>
          {data.map((item, index) => (
            <div className="choice-light-player-item" key={index}>
              <span><strong>{item.id}</strong></span>
              <span>選擇了: {item.light}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChoiceLightList;

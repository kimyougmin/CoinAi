import React, {useEffect, useState} from 'react';
import Coins from "../../typs/Coins";
import CoinIndexApi from "../../apis/CoinIndexApi";
import "../style/CoinIndex.css"
import IndexRow from "./IndexRow";

interface CoinIndexProps {
  setCoinUuid: (uuid: string) => void;
}
function CoinIndex({ setCoinUuid }: CoinIndexProps) {
  const [coinData, setCoinData] = useState<Coins[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await CoinIndexApi();
        setCoinData(data);
      } catch (e) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='coinIndex'>
      {coinData.map((coin: Coins, index) => (
        <IndexRow key={index} {...coin} setCoinUuid={setCoinUuid} />
      ))}
    </div>
  );
}

export default CoinIndex;

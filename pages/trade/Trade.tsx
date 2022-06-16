import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Detail from '../../src/components/Detail';

const Trade = () => {
  const payment_currency = 'KRW';
  const [coinList, setCoinListData] = useState<string[]>([]);
  const [selectedCoin, setSelectedCoin] = useState('BTC');

  const onClickCoinList = (name: string) => {
    setSelectedCoin(name);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://api.bithumb.com/public/ticker/ALL_${payment_currency}`);
      setCoinListData(Object.keys(response.data.data));
    };
    fetchData();
  }, []);

  return (
    <>
      <div style={{ marginBottom: '30px', display: 'flex', gap: '30px' }}>
        <div>tradepage</div>
        <Link href="/">
          <button>main</button>
        </Link>
      </div>
      <div style={{ marginBottom: '20px' }}>coin개수:{coinList.length}</div>
      <div style={{ display: 'flex', border: '1px solid green' }}>
        <div style={{ border: '1px solid green', minWidth: '20rem', height: '80vh', overflowY: 'auto' }}>
          {coinList.map((coin: string) => (
            <div
              onClick={() => onClickCoinList(coin)}
              style={{ border: '1px solid black', padding: '10px', marginBottom: '4px' }}
              key={coin}
            >
              {coin}
            </div>
          ))}
        </div>
        <Detail coin={selectedCoin} />
      </div>
    </>
  );
};
export default Trade;

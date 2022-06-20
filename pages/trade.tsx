import React, { useState } from 'react';
import { NextPage } from 'next';
import axios from 'axios';
import Link from 'next/link';
import Detail from '../src/components/Detail';

interface props {
  coinList: string[];
}

const Trade: NextPage<props> = ({ coinList }) => {
  // const Trade: NextPage<props> = () => {
  //   const payment_currency = 'KRW';
  //   const [coinList, setCoinListData] = useState<string[]>([]);
  const [selectedCoin, setSelectedCoin] = useState('BTC');

  const onClickCoinList = (name: string) => {
    setSelectedCoin(name);
  };

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get(`https://api.bithumb.com/public/ticker/ALL_${payment_currency}`);
  //     setCoinListData(Object.keys(response.data.data));
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      <div style={{ marginBottom: '30px', display: 'flex', gap: '30px' }}>
        <div>tradepage</div>
        <Link href="/">
          <button>main</button>
        </Link>
      </div>
      <div style={{ marginBottom: '20px' }}>coin개수:{coinList?.length}</div>
      <div style={{ display: 'flex', border: '1px solid green' }}>
        <div style={{ border: '1px solid green', minWidth: '20rem', height: '80vh', overflowY: 'auto' }}>
          {coinList?.map((coin: string) => (
            <div
              onClick={() => onClickCoinList(coin)}
              style={{
                border: '1px solid black',
                padding: '10px',
                marginBottom: '4px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
              key={coin}
            >
              {coin}
              <Link href={`/coin/${coin}`}>
                <a style={{ border: '1px solid red' }}>상세page로이동</a>
              </Link>
            </div>
          ))}
        </div>
        <Detail coin={selectedCoin} />
      </div>
    </>
  );
};

// Trade.getInitialProps = async (ctx) => {
//   // console.log(ctx);
//   const payment_currency = 'KRW';
//   const response = await axios.get(`https://api.bithumb.com/public/ticker/ALL_${payment_currency}`);
//   const coinList: string[] = Object.keys(response.data.data);
//   return { coinList };
// };

export default Trade;

// export const getServerSideProps = async (ctx: any) => {
//   console.log(ctx);
//   const payment_currency = 'KRW';
//   const response = await axios.get(`https://api.bithumb.com/public/ticker/ALL_${payment_currency}`);
//   const coinList: string[] = Object.keys(response.data.data);
//   console.log(coinList);
//   return { props: { coinList } };
// };

export const getStaticProps = async () => {
  const payment_currency = 'KRW';
  const response = await axios.get(`https://api.bithumb.com/public/ticker/ALL_${payment_currency}`);
  const coinList: string[] = Object.keys(response.data.data);
  return { props: { coinList }, revalidate: 10 };
};

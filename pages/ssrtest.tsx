import React from 'react';
import axios from 'axios';
import { NextPage } from 'next';

interface props {
  data?: any;
  coinList?: any;
}

const SSRPage: NextPage<props> = ({ data }) => {
  // const [data, setData] = React.useState({});
  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await axios.get('https://worldtimeapi.org/api/ip');
  //     setData(res.data);
  //   };
  //   fetchData();
  // }, []);
  // React.useEffect(() => {
  //   console.log(data, 'test');
  // }, [data]);
  console.log(data);
  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <h1>SSR Time</h1>
      <main style={{ fontSize: '3rem' }}>{data.datetime}</main>
    </div>
  );
};

export default SSRPage;

export const getStaticProps = async () => {
  // export const getServerSideProps = async () => {
  const res = await axios.get('https://worldtimeapi.org/api/ip');
  console.log(res.data);
  return {
    props: { data: res.data },
  };

  // const payment_currency = 'KRW';
  // const response = await axios.get(`https://api.bithumb.com/public/ticker/ALL_${payment_currency}`);
  // const coinList: string[] = Object.keys(response.data.data);
  // return { props: { coinList } };
};

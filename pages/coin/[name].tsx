import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

interface Props {
  data: any;
}

const DynamicRoutePage: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const { name } = router.query;
  // const [data, setData] = useState<any>([]);

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await axios.get(`https://api.bithumb.com/public/ticker/${name}_KRW`);
  //     setData(res.data.data);
  //   };

  //   fetchData();
  // }, [name]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link href="/trade">
        <button>트레이드로</button>
      </Link>
      <div style={{ border: '1px solid red', display: 'flex', flexDirection: 'column', gap: '30px', margin: '50px' }}>
        {name}
        <span>openPrice: {data.opening_price}</span>
        <div>closePrice: {data.closing_price}</div>
      </div>
    </div>
  );
};

export default DynamicRoutePage;

export const getStaticPaths = async () => ({
  paths: [{ params: { name: 'BTC' } }, { params: { name: 'ETH' } }, { params: { name: 'LTC' } }],
  fallback: true,
});

export const getStaticProps = async (ctx: any) => {
  const name = ctx.params.name;
  const res = await axios.get(`https://api.bithumb.com/public/ticker/${name}_KRW`);

  return {
    props: { data: res.data.data },
  };
};

// export const getServerSideProps = async (ctx: any) => {
//   const name = ctx.params.name;
//   const res = await axios.get(`https://api.bithumb.com/public/ticker/${name}_KRW`);

//   return {
//     props: { data: res.data.data },
//   };
// };

import React from 'react';
import axios from 'axios';
import { NextPage } from 'next';

interface props {
  dateTime: any;
}

const SSRPage: NextPage<props> = ({ dateTime }) => {
  const a = 1;
  console.log(dateTime);
  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <h1>SSR Time</h1>
      <main>{dateTime}</main>
    </div>
  );
};

export default SSRPage;

export const getServerSideProps = async () => {
  const res = await axios.get('https://worldtimeapi.org/api/ip');
  console.log(res);

  return {
    props: { dateTime: res.data.datetime },
  };
};

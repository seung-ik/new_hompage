import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>Create Next App</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div style={{ marginBottom: '2rem' }}>메인페이지</div>
    <Link href="/trade">
      <button>trade</button>
    </Link>
    <Link href="/ssrtest">
      <button>ssrtest</button>
    </Link>
  </div>
);

export default Home;

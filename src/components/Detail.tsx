import React, { useState } from 'react';

interface Props {
  coin: string;
}

const Detail: React.FC<Props> = ({ coin }) => {
  const [transactionList, setTransactionList] = useState<any[]>([]);

  React.useEffect(() => {
    const socket = new WebSocket('wss://pubwss.bithumb.com/pub/ws');

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: 'transaction',
          symbols: [`${coin}_KRW`],
        }),
      );
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'transaction') {
          setTransactionList((prev: any) => {
            prev.push(...data.content.list); // TODO: 날자순 이 이상함
            const newData = prev.slice();
            return newData;
          });
        }
      };
    };
    socket.onclose = () => {
      console.log('socket종료');
    };
    socket.onerror = () => {
      socket.close();
    };
  }, [coin]);

  React.useEffect(() => {
    setTransactionList([]);
  }, [coin]);

  return (
    <div style={{ border: '1px solid red', flex: '1', marginLeft: '2rem' }}>
      {coin}
      <div>
        {transactionList
          .reverse()
          .slice(0, 9)
          .map((el: any, i: any) => (
            <div
              style={{ display: 'flex', gap: '2rem', border: '1px solid green', width: '35rem' }}
              key={el.countQty + i}
            >
              <div style={{ flex: 1.3 }}>{el.contDtm.slice(0, 19)}</div>
              <div style={{ flex: 1.3 }}>{el.contQty}</div>
              <div style={{ flex: 1 }}>{el.contPrice}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Detail;

"use client";

import { useEffect, useState } from "react";

interface Ticker {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  lastPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}

interface CurrencyDataProps {
  data: Ticker;
  children: JSX.Element[];
}
function CurrencyData({ data, children }: CurrencyDataProps) {
  return (
    <>
      <div>Currency {data.symbol}</div>
      <div className="border-4 border-solid flex">{children}</div>
    </>
  );
}

interface TickerTableProps {
  data: Ticker;
}

function TickerTable({ data }: TickerTableProps) {
  return (
    <table className="border-2 border-solid">
      <thead>
        <tr>
          <th>Ticker</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>priceChange</td>
          <td>{data.priceChange}</td>
        </tr>
        <tr>
          <td>priceChangePercent</td>
          <td>{data.priceChangePercent}</td>
        </tr>
        <tr>
          <td>weightedAvgPrice</td>
          <td>{data.weightedAvgPrice}</td>
        </tr>
        <tr>
          <td>openPrice</td>
          <td>{data.openPrice}</td>
        </tr>
        <tr>
          <td>highPrice</td>
          <td>{data.highPrice}</td>
        </tr>
        <tr>
          <td>lowPrice</td>
          <td>{data.lowPrice}</td>
        </tr>
        <tr>
          <td>lastPrice</td>
          <td>{data.lastPrice}</td>
        </tr>
        <tr>
          <td>volume</td>
          <td>{data.volume}</td>
        </tr>
        <tr>
          <td>quoteVolume</td>
          <td>{data.quoteVolume}</td>
        </tr>
        <tr>
          <td>openTime</td>
          <td>{data.openTime}</td>
        </tr>
        <tr>
          <td>closeTime</td>
          <td>{data.closeTime}</td>
        </tr>
        <tr>
          <td>firstId</td>
          <td>{data.firstId}</td>
        </tr>
        <tr>
          <td>lastId</td>
          <td>{data.lastId}</td>
        </tr>
        <tr>
          <td>count</td>
          <td>{data.count}</td>
        </tr>
      </tbody>
    </table>
  );
}

interface TwentyFourHourTicker {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}

interface TwentyFourHourTickerTableProps {
  data: TwentyFourHourTicker;
}

function TwentyFourHourTickerTable({ data }: TwentyFourHourTickerTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>24h Ticker</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>priceChange</td>
          <td>{data.priceChange}</td>
        </tr>
        <tr>
          <td>priceChangePercent</td>
          <td>{data.priceChangePercent}</td>
        </tr>
        <tr>
          <td>weightedAvgPrice</td>
          <td>{data.weightedAvgPrice}</td>
        </tr>
        <tr>
          <td>prevClosePrice</td>
          <td>{data.prevClosePrice}</td>
        </tr>
        <tr>
          <td>lastPrice</td>
          <td>{data.lastPrice}</td>
        </tr>
        <tr>
          <td>lastQty</td>
          <td>{data.lastQty}</td>
        </tr>
        <tr>
          <td>bidPrice</td>
          <td>{data.bidPrice}</td>
        </tr>
        <tr>
          <td>bidQty</td>
          <td>{data.bidQty}</td>
        </tr>
        <tr>
          <td>askPrice</td>
          <td>{data.askPrice}</td>
        </tr>
        <tr>
          <td>askQty</td>
          <td>{data.askQty}</td>
        </tr>
        <tr>
          <td>openPrice</td>
          <td>{data.openPrice}</td>
        </tr>
        <tr>
          <td>highPrice</td>
          <td>{data.highPrice}</td>
        </tr>
        <tr>
          <td>lowPrice</td>
          <td>{data.lowPrice}</td>
        </tr>
        <tr>
          <td>volume</td>
          <td>{data.volume}</td>
        </tr>
        <tr>
          <td>quoteVolume</td>
          <td>{data.quoteVolume}</td>
        </tr>
        <tr>
          <td>openTime</td>
          <td>{data.openTime}</td>
        </tr>
        <tr>
          <td>closeTime</td>
          <td>{data.closeTime}</td>
        </tr>
        <tr>
          <td>firstId</td>
          <td>{data.firstId}</td>
        </tr>
        <tr>
          <td>lastId</td>
          <td>{data.lastId}</td>
        </tr>
        <tr>
          <td>count</td>
          <td>{data.count}</td>
        </tr>
      </tbody>
    </table>
  );
}

interface Trades {
  id: number;
  price: string;
  qty: string;
  quoteQty: string;
  time: number;
  isBuyerMaker: boolean;
  isBestMatch: boolean;
}

interface TradesTableProps {
  data: Trades;
}

function TradesTable({ data }: TradesTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Recent Trades</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>id</td>
          <td>{data.id}</td>
        </tr>
        <tr>
          <td>price</td>
          <td>{data.price}</td>
        </tr>
        <tr>
          <td>quantity</td>
          <td>{data.qty}</td>
        </tr>
        <tr>
          <td>quote quantity</td>
          <td>{data.quoteQty}</td>
        </tr>
        <tr>
          <td>time</td>
          <td>{data.time}</td>
        </tr>
        <tr>
          <td>is buyer maker</td>
          <td>{data.isBuyerMaker}</td>
        </tr>
        <tr>
          <td>is best match</td>
          <td>{data.isBestMatch}</td>
        </tr>
      </tbody>
    </table>
  );
}
export default function PairCurrencyVisualizer() {
  const [tickerData, setMarketData] = useState<Ticker[] | null>(null);
  const [twentyFourHourTickerData, setTwentyFourHourTickerData] = useState<
    TwentyFourHourTicker[] | null
  >(null);
  const [firstCurrencyTradesData, setFirstCurrencyTradesData] = useState<
    Trades[] | null
  >(null);
  const [secondCurrencyTradesData, setSecondCurrencyTradesData] = useState<
    Trades[] | null
  >(null);

  function handleSubmit(formData: FormData) {
    // TODO: prevent default
    const currency1 = formData.get("currency1");
    const currency2 = formData.get("currency2");
    if (currency1 === currency2) {
      console.error("Error: Same currency");
      return;
    }
    // TODO: Handle error
    fetch(
      `https://api.binance.com/api/v3/ticker?symbols=%5B%22${currency1}%22,%22${currency2}%22%5D`
    )
      .then((response) => response.json())
      .then((data) => setMarketData(data));

    fetch(
      `https://api.binance.com/api/v3/ticker/24hr?symbols=%5B%22${currency1}%22,%22${currency2}%22%5D`
    )
      .then((response) => response.json())
      .then((data) => setTwentyFourHourTickerData(data));

    fetch(`https://api.binance.com/api/v3/trades?symbol=${currency1}`)
      .then((response) => response.json())
      .then((data) => setFirstCurrencyTradesData(data));

    fetch(`https://api.binance.com/api/v3/trades?symbol=${currency2}`)
      .then((response) => response.json())
      .then((data) => setSecondCurrencyTradesData(data));
    console.log("hello");
  }

  return (
    <>
      <form action={handleSubmit}>
        <select name="currency1" defaultValue="BTCUSDT">
          <option value="BTCUSDT">BTCUSDT</option>
          <option value="BNBUSDT">BNBUSDT</option>
        </select>
        <select name="currency2" defaultValue="BNBUSDT">
          <option value="BTCUSDT">BTCUSDT</option>
          <option value="BNBUSDT">BNBUSDT</option>
        </select>
        <button type="submit">Get Market Data</button>
      </form>
      {tickerData &&
        twentyFourHourTickerData &&
        firstCurrencyTradesData &&
        secondCurrencyTradesData && (
          <>
            <CurrencyData data={tickerData[0]}>
              <TickerTable data={tickerData[0]} />
              <TwentyFourHourTickerTable data={twentyFourHourTickerData[0]} />
              <TradesTable data={firstCurrencyTradesData[0]} />
            </CurrencyData>
            <CurrencyData data={tickerData[1]}>
              <TickerTable data={tickerData[1]} />
              <TwentyFourHourTickerTable data={twentyFourHourTickerData[1]} />
              <TradesTable data={secondCurrencyTradesData[0]} />
            </CurrencyData>
          </>
        )}
    </>
  );
}

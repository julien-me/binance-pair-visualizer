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
      <div className="border-4 border-solid flex flex-col bg-red-200 space-y-3">
        {children}
      </div>
    </>
  );
}

const tickerTableHeaderNames = [
  "symbol",
  "price change",
  "price change percent",
  "weighted average price",
  "open price",
  "high price",
  "low price",
  "last price",
  "volume",
  "quote volume",
  "open time",
  "close time",
  "first id",
  "last id",
  "count",
];

interface TickerPairTableProps {
  data: Ticker[];
}
function TickerPairTable({ data }: TickerPairTableProps) {
  return (
    <>
      <div> Ticker</div>
      <table className="border-2 border-solid bg-blue-200">
        <thead>
          <tr>
            {tickerTableHeaderNames.map((name) => (
              <th className="text-gray-600">{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((tickerData) => (
            <tr>
              {Object.values(tickerData).map((e) => (
                <td>{e}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
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

const twentyFourHourTickerHeaderNames = [
  "symbol",
  "price change",
  "price change",
  "price change percent",
  "weighted average price",
  "previous close price",
  "last price",
  "last quantity",
  "bid price",
  "bid quantity",
  "ask price",
  "ask quantity",
  "open price",
  "high price",
  "low price",
  "volume",
  "quote volume",
  "open time",
  "close time",
  "first id",
  "last id",
  "count",
];

interface TwentyFourHourTickerPairTableProps {
  data: TwentyFourHourTicker[];
}

function TwentyFourHourTickerPairTable({
  data,
}: TwentyFourHourTickerPairTableProps) {
  return (
    <>
      <div>24h Ticker</div>
      <table className="border border-solid bg-green-200">
        <thead>
          <tr>
            {twentyFourHourTickerHeaderNames.map((name) => (
              <th className="text-gray-600">{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((twentyFourHourTickerData) => (
            <tr>
              {Object.values(twentyFourHourTickerData).map((e) => (
                <td>{e}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
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
    <table className="border border-solid bg-yellow-200">
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
            <TickerPairTable data={tickerData} />
            <TwentyFourHourTickerPairTable data={twentyFourHourTickerData} />
            {/* <CurrencyData data={tickerData[0]}>
              <TickerTableRow data={tickerData[0]} />
              <TwentyFourHourTickerTable data={twentyFourHourTickerData[0]} />
              <TradesTable data={firstCurrencyTradesData[0]} />
            </CurrencyData>
            <CurrencyData data={tickerData[1]}>
              <TickerTableRow data={tickerData[1]} />
              <TwentyFourHourTickerTable data={twentyFourHourTickerData[1]} />
              <TradesTable data={secondCurrencyTradesData[0]} />
            </CurrencyData> */}
          </>
        )}
    </>
  );
}

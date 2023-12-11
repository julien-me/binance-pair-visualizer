"use client";

import { FormEvent, useEffect, useState } from "react";

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
      <div className="text-center"> Ticker</div>
      <div className="w-screen overflow-scroll">
        <table className="border-2 border-solid bg-blue-200">
          <thead>
            <tr>
              {tickerTableHeaderNames.map((name) => (
                <th key={name} className="text-gray-600">
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((tickerData) => (
              <tr key={tickerData.symbol}>
                {Object.values(tickerData).map((e, i) => (
                  <td key={i}>{e}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
      <div className="text-center">24h Ticker</div>
      <div className="w-screen overflow-scroll">
        <table className="border border-solid bg-green-200">
          <thead>
            <tr>
              {twentyFourHourTickerHeaderNames.map((name) => (
                <th key={name} className="text-gray-600">
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((twentyFourHourTickerData) => (
              <tr key={twentyFourHourTickerData.symbol}>
                {Object.values(twentyFourHourTickerData).map((e, i) => (
                  <td key={i}>{e}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

const recentTradesHeaderNames = [
  "id",
  "price",
  "quantity",
  "quote quantity",
  "time",
  "is buyer maker",
  "is best match",
];

interface TradesTableProps {
  data: Trades[];
  symbol: string;
}

function TradesTable({ data, symbol }: TradesTableProps) {
  return (
    <div className="flex flex-col">
      <div className="text-center">{symbol}</div>
      <div className="h-screen overflow-scroll">
        <table className="border border-solid bg-yellow-200">
          <thead className="sticky top-0 bg-yellow-200">
            <tr>
              {recentTradesHeaderNames.map((name) => (
                <th key={name} className="text-gray-600">
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((recentTradesData) => (
              <tr key={recentTradesData.id}>
                {Object.values(recentTradesData).map((e, i) => (
                  <td key={i}>{e}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface Symbol {
  symbol: string;
}
interface PairTradesProps {
  children: JSX.Element[];
}

function PairTrades({ children }: PairTradesProps) {
  return (
    <div>
      <div className="text-center">Recent Trades</div>
      <div className="flex gap-4">{children}</div>
    </div>
  );
}

export default function PairCurrencyVisualizer() {
  const [isLoading, setLoading] = useState(true);
  const [symbols, setSymbols] = useState<string[]>([]);
  const [tickerData, setMarketData] = useState<Ticker[] | null>(null);
  const [firstSymbol, setFirstSymbol] = useState<string>("");
  const [secondSymbol, setSecondSymbol] = useState<string>("");
  const [twentyFourHourTickerData, setTwentyFourHourTickerData] = useState<
    TwentyFourHourTicker[] | null
  >(null);
  const [firstCurrencyTradesData, setFirstCurrencyTradesData] = useState<
    Trades[] | null
  >(null);
  const [secondCurrencyTradesData, setSecondCurrencyTradesData] = useState<
    Trades[] | null
  >(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const currency1Tmp = formData.get("currency1") ?? "BTCUSDT";
    const currency2Tmp = formData.get("currency2") ?? "BNBUSDT";
    setFirstSymbol(currency1Tmp.toString());
    setSecondSymbol(currency2Tmp.toString());

    if (currency1Tmp === currency2Tmp) {
      console.error("Error: Same currency");
      return;
    }
    // TODO: Handle error
    fetch(
      `https://api.binance.com/api/v3/ticker?symbols=%5B%22${currency1Tmp}%22,%22${currency2Tmp}%22%5D`
    )
      .then((response) => response.json())
      .then((data) => setMarketData(data))
      .catch((error) => console.error(`Failed to fetch ticker data: ${error}`));

    fetch(
      `https://api.binance.com/api/v3/ticker/24hr?symbols=%5B%22${currency1Tmp}%22,%22${currency2Tmp}%22%5D`
    )
      .then((response) => response.json())
      .then((data) => setTwentyFourHourTickerData(data))
      .catch((error) =>
        console.error(`Failed to fetch 24h ticker data: ${error}`)
      );

    fetch(`https://api.binance.com/api/v3/trades?symbol=${currency1Tmp}`)
      .then((response) => response.json())
      .then((data) => setFirstCurrencyTradesData(data))
      .catch((error) =>
        console.error(
          `Failed to fetch recent trades for ${currency1Tmp}: ${error}`
        )
      );

    fetch(`https://api.binance.com/api/v3/trades?symbol=${currency2Tmp}`)
      .then((response) => response.json())
      .then((data) => setSecondCurrencyTradesData(data))
      .catch((error) =>
        console.error(
          `Failed to fetch recent trades for ${currency2Tmp}: ${error}`
        )
      );
  }

  useEffect(() => {
    fetch(`https://api.binance.com/api/v3/exchangeInfo`)
      .then((response) => response.json())
      .then((data) => {
        setSymbols(data.symbols.map((e: Symbol) => e.symbol));
        setLoading(false);
      })
      .catch((error) => console.error(`Failed to fetch symbols: ${error}`));
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <select
          name="currency1"
          defaultValue={symbols.length ? symbols[0] : ""}
        >
          {symbols.map((symbol) => (
            <option key={symbol} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
        <select
          name="currency2"
          defaultValue={symbols.length ? symbols[0] : ""}
        >
          {symbols.map((symbol) => (
            <option key={symbol} value={symbol}>
              {symbol}
            </option>
          ))}
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
            <PairTrades>
              <TradesTable
                data={firstCurrencyTradesData}
                symbol={firstSymbol}
              />
              <TradesTable
                data={secondCurrencyTradesData}
                symbol={secondSymbol}
              />
            </PairTrades>
          </>
        )}
    </>
  );
}

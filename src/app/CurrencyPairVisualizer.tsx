"use client";

import { FormEvent, useEffect, useState } from "react";

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

const recentTradesHeaderNames = [
  "id",
  "price",
  "quantity",
  "quote quantity",
  "time",
  "is buyer maker",
  "is best match",
];

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

interface PairTableProps<T> {
  data: T[];
  name: string;
  headerNames: string[];
}

function PairTable<T extends { symbol: string }>({
  data,
  name,
  headerNames,
}: PairTableProps<T>) {
  return (
    <div className="h-full">
      <div className="text-center">{name}</div>
      <div className="overflow-scroll">
        <table className="border-b-2">
          <thead className="bg-gray-200">
            <tr>
              {headerNames.map((name) => (
                <th key={name} scope="col" className="text-gray-600 p-1">
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.symbol}>
                {Object.values(item).map((e, i) => (
                  <td key={i} className="p-3">
                    {e}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
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
  data: Trades[];
  symbol: string;
}

function TradesTable({ data, symbol }: TradesTableProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="text-center">{symbol}</div>
      <div className="h-52 overflow-scroll">
        <table className="border-b-2 bg-white">
          <thead className="sticky top-0 bg-gray-200">
            <tr>
              {recentTradesHeaderNames.map((name) => (
                <th key={name} className="text-gray-600 p-1">
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((recentTradesData) => (
              <tr key={recentTradesData.id}>
                {Object.values(recentTradesData).map((e, i) => (
                  <td key={`${recentTradesData.id}-${i}`} className="p-3">
                    {e}
                  </td>
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
  children: React.ReactNode;
}

function PairTrades({ children }: PairTradesProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="text-center">Recent Trades</div>
      <div className="flex gap-4">{children}</div>
    </div>
  );
}

interface DashboardProps {
  children: React.ReactNode;
}
function Dashboard({ children }: DashboardProps) {
  return <div className="flex flex-grow flex-col w-screen p-4">{children}</div>;
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
    let ignore = false;

    fetch(`https://api.binance.com/api/v3/exchangeInfo`)
      .then((response) => response.json())
      .then((data) => {
        if (!ignore) {
          setSymbols(data.symbols.map((e: Symbol) => e.symbol));
          setLoading(false);
        }
      })
      .catch((error) => console.error(`Failed to fetch symbols: ${error}`));

    return () => {
      ignore = true;
    };
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col h-screen">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex justify-center m-8 gap-4 h-6"
      >
        <label htmlFor="currency1">currency 1</label>
        <select
          name="currency1"
          defaultValue={symbols.length > 1 ? symbols[0] : ""}
        >
          {symbols.map((symbol) => (
            <option key={symbol} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
        <label htmlFor="currency2">currency 2</label>
        <select
          name="currency2"
          defaultValue={symbols.length > 1 ? symbols[1] : ""}
        >
          {symbols.map((symbol) => (
            <option key={symbol} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
        <button type="submit">Get Market Data</button>
      </form>
      <Dashboard>
        {tickerData && (
          <PairTable
            data={tickerData}
            name="Ticker"
            headerNames={tickerTableHeaderNames}
          />
        )}
        {twentyFourHourTickerData && (
          <PairTable
            data={twentyFourHourTickerData}
            name="24 Ticker"
            headerNames={twentyFourHourTickerHeaderNames}
          />
        )}
        {firstCurrencyTradesData && secondCurrencyTradesData && (
          <PairTrades>
            <TradesTable data={firstCurrencyTradesData} symbol={firstSymbol} />
            <TradesTable
              data={secondCurrencyTradesData}
              symbol={secondSymbol}
            />
          </PairTrades>
        )}
      </Dashboard>
    </div>
  );
}

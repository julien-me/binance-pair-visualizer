"use client";

import { FormEvent, useEffect, useState } from "react";
import Dashboard, {
  PairTable,
  PairTrades,
  Ticker,
  Trades,
  TradesTable,
  TwentyFourHourTicker,
  tickerTableHeaderNames,
  twentyFourHourTickerHeaderNames,
} from "./Dashboard";

interface Symbol {
  symbol: string;
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
        className="flex justify-center mt-3 gap-4 h-6"
      >
        <label htmlFor="currency1">currency 1</label>
        <select
          name="currency1"
          defaultValue={symbols.length > 1 ? symbols[0] : ""}
          className="bg-gray-300"
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
          className="bg-gray-300"
        >
          {symbols.map((symbol) => (
            <option key={symbol} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-400 hover:bg-blue-500 text-white rounded px-2"
        >
          Get Market Data
        </button>
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

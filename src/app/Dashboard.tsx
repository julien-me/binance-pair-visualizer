"use client";

import { useState } from "react";

export const tickerTableHeaderNames = [
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

export const twentyFourHourTickerHeaderNames = [
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

export interface Ticker {
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

export interface TwentyFourHourTicker {
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

export function PairTable<T extends { symbol: string }>({
  data,
  name,
  headerNames,
}: PairTableProps<T>) {
  return (
    <div className="h-full mt-3">
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

export interface Trades {
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

export function TradesTable({ data, symbol }: TradesTableProps) {
  const [sortField, setSortField] = useState<string>("time");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const sortData = (field: string) => {
    const newSortOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);

    data.sort((a, b) => {
      if (field === "time") {
        return newSortOrder === "asc" ? a.time - b.time : b.time - a.time;
      } else if (field === "price") {
        return newSortOrder === "asc"
          ? parseFloat(a.price) - parseFloat(b.price)
          : parseFloat(b.price) - parseFloat(a.price);
      } else if (field === "quantity") {
        return newSortOrder === "asc"
          ? parseFloat(a.qty) - parseFloat(b.qty)
          : parseFloat(b.qty) - parseFloat(a.qty);
      } else {
        return a.id - b.id;
      }
    });
  };

  const renderSortIndicator = (fieldName: string) => {
    if (sortField === fieldName) {
      return sortOrder === "asc" ? " ↑" : " ↓";
    }
    return "";
  };
  return (
    <div className="flex flex-col h-full">
      <div className="text-center">{symbol}</div>
      <div className="h-52 overflow-scroll">
        <table className="border-b-2 bg-white">
          <thead className="sticky top-0 bg-gray-200">
            <tr>
              {recentTradesHeaderNames.map((name) => (
                <th
                  key={name}
                  scope="col"
                  className="text-gray-600 p-1"
                  onClick={() => sortData(name)}
                >
                  {name}
                  {renderSortIndicator(name)}
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

interface PairTradesProps {
  children: React.ReactNode;
}

export function PairTrades({ children }: PairTradesProps) {
  return (
    <div className="flex flex-col h-full mt-3">
      <div className="text-center">Recent Trades</div>
      <div className="flex gap-4">{children}</div>
    </div>
  );
}

interface DashboardProps {
  children: React.ReactNode;
}

export default function Dashboard({ children }: DashboardProps) {
  return <div className="flex flex-grow flex-col w-screen p-4">{children}</div>;
}

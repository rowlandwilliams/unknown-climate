"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await fetch("/api/co2-data");
      const data = await res.json();
      setData(data);
      setLoading(false);
    };

    getData();
  }, []);

  console.log(data, loading);
  return (
    <>
      <main className="bg-red-500">
        <svg>suh</svg>
      </main>
    </>
  );
}

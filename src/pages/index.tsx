"use client";
import { useResponsiveGraphWidth } from "@/hooks/useResponsiveGraphWidth";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { ref, graphWidth } = useResponsiveGraphWidth();

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
      <main className="h-screen bg-black p-32">
        <div ref={ref} className="h-full w-full">
          <svg height="100%" width={graphWidth}>
            <rect width="100%" height="100%" className="fill-red-50" />
          </svg>
        </div>
      </main>
    </>
  );
}

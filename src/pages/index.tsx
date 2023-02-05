"use client";
import { ClimateGraph } from "@/components/ClimateGraph/ClimateGraph";
import { Co2Data } from "@/types/app";
import { useEffect, useState } from "react";
const padding = 0;
const ppmExtent = [312, 423];

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Co2Data[]>([]);

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

  if (loading) return <div />;
  return (
    <>
      <main className="h-screen bg-zinc-900 px-8 md:px-32 py-24 text-gray-200">
        <article className="space-y-1 flex flex-col h-full w-full max-w-[600px] mx-auto relative">
          <ClimateGraph data={data} />
          <h1 className="text-[4rem] whitespace-nowrap text-center leading-10">
            UNKNOWN CLIMATE
          </h1>
        </article>
      </main>
    </>
  );
}

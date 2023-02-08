"use client";
import { ClimateGraph } from "@/components/ClimateGraph/ClimateGraph";
import { LoadingGraph } from "@/components/ClimateGraph/LoadingGraph/LoadingGraph";
import { useResponsiveGraphDims } from "@/hooks/useResponsiveGraphDims";
import { Co2Data } from "@/types/app";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Co2Data[]>([]);
  const { ref, graphWidth, graphHeight } = useResponsiveGraphDims();

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

  return (
    <>
      <main className="h-screen bg-zinc-900 px-8 md:px-32 py-24 text-gray-200">
        <article className="space-y-1 flex flex-col h-full w-full max-w-[600px] mx-auto relative">
          <section ref={ref} className="flex-grow relative">
            {loading ? (
              <LoadingGraph graphWidth={graphWidth} graphHeight={graphHeight} />
            ) : (
              <ClimateGraph
                data={data}
                graphWidth={graphWidth}
                graphHeight={graphHeight}
              />
            )}
          </section>
          <h1 className="text-[4rem] whitespace-nowrap text-center leading-10">
            UNKNOWN CLIMATE
          </h1>
        </article>
      </main>
    </>
  );
}

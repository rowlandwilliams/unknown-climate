"use client";
import { useResponsiveGraphDims } from "@/hooks/useResponsiveGraphDims";
import { Co2Data, Day } from "@/types/app";
import { scaleLinear, scaleTime } from "d3-scale";
import { curveBasis, line } from "d3-shape";
import { useEffect, useMemo, useState } from "react";
const padding = 0;
const ppmExtent = [312, 423];

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Co2Data[]>([]);
  const { ref, graphWidth, graphHeight } = useResponsiveGraphDims();

  const xScale = useMemo(
    () =>
      scaleTime()
        .domain([new Date(2020, 0, 1), new Date(2020, 11, 31)])
        .range([padding, graphWidth - padding]),
    [graphWidth]
  );
  const yScale = useMemo(
    () => scaleLinear().domain(ppmExtent).range([graphHeight, 0]),
    [graphHeight]
  );
  const lineGraphLine = useMemo(
    () =>
      line<Day>()
        .x((d) => xScale(new Date(d.date)))
        .y((d) => yScale(d.value))
        .curve(curveBasis),
    [xScale, yScale]
  );

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
          <section ref={ref} className="flex-grow">
            <svg height={graphHeight} width={graphWidth}>
              {data.map(({ year, values }) => (
                <path
                  d={lineGraphLine(values) || undefined}
                  key={year}
                  className="fill-none stroke stroke-gray-100"
                />
              ))}
            </svg>
          </section>
          <h1 className="text-[4rem] whitespace-nowrap text-center leading-10">
            UNKNOWN CLIMATE
          </h1>
        </article>
      </main>
    </>
  );
}

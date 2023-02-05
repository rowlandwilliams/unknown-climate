"use client";
import { useResponsiveGraphDims } from "@/hooks/useResponsiveGraphDims";
import { Co2Data, Day } from "@/types/app";
import { scaleLinear, scaleTime } from "d3-scale";
import { curveBasis, line } from "d3-shape";
import { useEffect, useMemo, useState } from "react";
const padding = 0;
const ppmExtent = [310, 425];

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

  const xScale = useMemo(
    () =>
      scaleTime()
        .domain([new Date(2020, 0, 1), new Date(2020, 11, 31)])
        .range([padding, graphWidth - padding]),
    [graphWidth]
  );

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain(ppmExtent)
        .range([graphHeight - padding, padding]),
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

  if (loading) return <div />;
  return (
    <>
      <main className="h-screen bg-white px-8 md:px-32 py-8">
        <div ref={ref} className="h-full w-full max-w-[600px] mx-auto">
          <svg height={graphHeight} width={graphWidth}>
            {data.map(({ year, values }) => (
              <path
                d={lineGraphLine(values)}
                key={year}
                className="fill-none stroke stroke-gray-600"
              />
            ))}
          </svg>
        </div>
      </main>
    </>
  );
}

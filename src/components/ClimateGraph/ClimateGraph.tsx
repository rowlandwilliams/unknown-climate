import { useResponsiveGraphDims } from "@/hooks/useResponsiveGraphDims";
import { Co2Data, Day } from "@/types/app";
import { scaleLinear, scaleTime } from "d3-scale";
import { curveBasis, line } from "d3-shape";
import { useMemo } from "react";
const padding = 0;
const ppmExtent = [312, 423];

interface Props {
  data: Co2Data[];
}

export const ClimateGraph = ({ data }: Props) => {
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
  return (
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
  );
};

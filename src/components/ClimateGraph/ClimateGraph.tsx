import { useResponsiveGraphDims } from "@/hooks/useResponsiveGraphDims";
import { Co2Data, Day } from "@/types/app";
import classNames from "classnames";
import { scaleLinear, scaleTime } from "d3-scale";
import { curveBasis, line } from "d3-shape";
import { useMemo, useState } from "react";
const padding = 0;
const ppmExtent = [312, 423];

interface Props {
  data: Co2Data[];
}

export const ClimateGraph = ({ data }: Props) => {
  const [hovered, setHovered] = useState(false);
  const [tooltipData, setTooltipData] = useState(
    {} as { x: number; y: number }
  );
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

  const mouseEnter = () => setHovered(true);
  const mouseLeave = () => setHovered(false);
  const mouseOver = (e: MouseEvent) =>
    setTooltipData({ x: e.offsetX, y: e.offsetY });
  return (
    <section ref={ref} className="flex-grow relative">
      <svg
        height={graphHeight}
        width={graphWidth}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
      >
        <g onMouseMove={(e) => mouseOver(e)}>
          {data.map(({ year, values }) => (
            <path
              d={lineGraphLine(values) || undefined}
              key={year}
              className="fill-none stroke stroke-gray-100"
            />
          ))}
        </g>
      </svg>
      <div
        className={classNames("absolute bg-white text-black p-2 rounded-md", {
          "opacity-100": hovered,
          "opacity-0 hidden": !hovered,
        })}
        style={{ top: tooltipData.y, left: tooltipData.x }}
      >
        suh
      </div>
    </section>
  );
};

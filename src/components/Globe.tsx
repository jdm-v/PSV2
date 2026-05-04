import { onMount } from "solid-js";
import * as d3 from "d3";
import worldData from "../lib/world.json";

const GlobeComponent = () => {
  let mapContainer: HTMLDivElement | undefined;

  const visitedCountries = [
    "France",
    "Japan",
    "Italy",
    "Spain",
    "USA",
    "Austria",
    "Greece",
    "Czech Republic",
    "Hungary",
    "UK",
    "Canada",
    "Colombia",
    "Costa Rica",
    "South Korea",
    "Vatican City",
    "Netherlands",
    "Germany",
    "Poland",
    "Switzerland",
    "Denmark",
    "Sweden",
  ];

  const nextCountries = ["Dominican Republic", "Brazil", "Vietnam", "Thailand", "Egypt"];

  onMount(() => {
    if (!mapContainer) return;

    const SIZE = 500;
    const cx = SIZE / 2;
    const cy = SIZE / 2;
    const scale = 230;
    const sensitivity = 75;

    let projection = d3
      .geoOrthographic()
      .scale(scale)
      .center([0, 0])
      .rotate([0, -30])
      .translate([cx, cy]);

    const initialScale = projection.scale();
    let pathGenerator = d3.geoPath().projection(projection);

    let svg = d3
      .select(mapContainer)
      .append("svg")
      .attr("viewBox", `0 0 ${SIZE} ${SIZE}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("width", "100%")
      .style("height", "auto");

    svg
      .append("circle")
      .attr("fill", "#EEE")
      .attr("stroke", "#000")
      .attr("stroke-width", "0.2")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", initialScale);

    let map = svg.append("g");

    map
      .append("g")
      .attr("class", "countries")
      .selectAll("path")
      .data(worldData.features)
      .enter()
      .append("path")
      .attr("d", (d: any) => pathGenerator(d as any))
      .attr("fill", (d: { properties: { name: string } }) =>
        visitedCountries.includes(d.properties.name)
          ? "#2932ddff"
          : nextCountries.includes(d.properties.name)
          ? "#f1df19ff"
          : "white"
      )
      .style("stroke", "black")
      .style("stroke-width", 0.3)
      .style("opacity", 0.8);

    d3.timer(() => {
      const rotate = projection.rotate();
      const k = sensitivity / projection.scale();
      projection.rotate([rotate[0] - 1 * k, rotate[1]]);
      svg.selectAll("path").attr("d", (d: any) => pathGenerator(d as any));
    }, 200);
  });

  return (
    <div class="flex flex-col text-black justify-center items-center w-full h-full">
      <div class="w-full" ref={mapContainer}></div>
    </div>
  );
};

export default GlobeComponent;

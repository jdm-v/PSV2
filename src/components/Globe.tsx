import { onMount, createSignal, Show } from "solid-js";
import * as d3 from "d3";
import worldData from "../lib/world.json";

const GlobeComponent = () => {
  let mapContainer: HTMLDivElement | undefined;
  const [paused, setPaused] = createSignal(false);
  const [tooltip, setTooltip] = createSignal<{ name: string; x: number; y: number } | null>(null);
  let tooltipTimer: ReturnType<typeof setTimeout> | undefined;

  const showTooltip = (value: { name: string; x: number; y: number }) => {
    clearTimeout(tooltipTimer);
    setTooltip(value);
    tooltipTimer = setTimeout(() => setTooltip(null), 3000);
  };

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
      .style("opacity", 0.8)
      .style("cursor", (d: { properties: { name: string } }) =>
        visitedCountries.includes(d.properties.name) ? "pointer" : "default"
      )
      .on("click", function (event: MouseEvent, d: any) {
        if (!visitedCountries.includes(d.properties.name)) return;
        const containerRect = mapContainer!.getBoundingClientRect();
        const svgEl = mapContainer!.querySelector("svg")!;
        const svgRect = svgEl.getBoundingClientRect();
        const scaleX = SIZE / svgRect.width;
        const scaleY = SIZE / svgRect.height;
        const centroid = pathGenerator.centroid(d as any);
        if (!centroid || isNaN(centroid[0])) return;
        const x = centroid[0] / scaleX + (svgRect.left - containerRect.left);
        const y = centroid[1] / scaleY + (svgRect.top - containerRect.top);
        showTooltip({ name: d.properties.name, x, y });
      });

    svg.select("circle")
      .style("cursor", "pointer");

    const svgNode = svg.node() as SVGSVGElement;

    const isOverGlobe = (event: MouseEvent | Touch) => {
      const pt = svgNode.createSVGPoint();
      pt.x = event.clientX;
      pt.y = event.clientY;
      const svgP = pt.matrixTransform(svgNode.getScreenCTM()!.inverse());
      const dx = svgP.x - cx;
      const dy = svgP.y - cy;
      return Math.sqrt(dx * dx + dy * dy) <= initialScale;
    };

    svg
      .on("mousemove", (event: MouseEvent) => setPaused(isOverGlobe(event)))
      .on("mouseleave", () => setPaused(false))
      .on("touchstart", (event: TouchEvent) => { if (isOverGlobe(event.touches[0])) setPaused(true); })
      .on("touchend", () => setPaused(false));

    d3.timer(() => {
      if (paused()) return;
      const rotate = projection.rotate();
      const k = sensitivity / projection.scale();
      projection.rotate([rotate[0] - 1 * k, rotate[1]]);
      svg.selectAll("path").attr("d", (d: any) => pathGenerator(d as any));
    }, 200);
  });

  return (
    <div
      class="flex flex-col text-black justify-center items-center w-full h-full"
      style="position: relative;"
      onClick={(e) => { if ((e.target as SVGElement).tagName !== "path") setTooltip(null); }}
    >
      <div class="w-full" ref={mapContainer} />
      <Show when={tooltip()}>
        {(t) => (
          <div
            style={`position: absolute; left: ${t().x}px; top: ${t().y}px; transform: translate(-50%, -110%); background: rgba(0,0,0,0.75); color: #fff; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; white-space: nowrap; pointer-events: none; z-index: 10;`}
          >
            {t().name}
          </div>
        )}
      </Show>
    </div>
  );
};

export default GlobeComponent;

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import dummyData from "../data/dummyData.json";

const TreeChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const root = d3.hierarchy(dummyData);
    const treeLayout = d3.tree().size([500, 500]);

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", 600)
      .attr("height", 600);

    const nodes = treeLayout(root).descendants();
    const links = treeLayout(root).links();

    const node = svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    node
      .append("circle")
      .attr("r", 5)
      .style("fill", (d) => (d.children ? "lightsteelblue" : "#fff"));

    node
      .append("text")
      .attr("dy", "0.31em")
      .attr("x", (d) => (d.children ? -6 : 6))
      .attr("text-anchor", (d) => (d.children ? "end" : "start"))
      .text((d) => d.data.name);

    const link = svg
      .selectAll(".link")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr(
        "d",
        (d) =>
          `M${d.source.y},${d.source.x}C${d.source.y + 50},${d.source.x} ${
            d.target.y - 50
          },${d.target.x} ${d.target.y},${d.target.x}`
      )
      .style("stroke", "#ccc")
      .style("fill", "none");
  }, []);

  return <div ref={chartRef}></div>;
};

export default TreeChart;

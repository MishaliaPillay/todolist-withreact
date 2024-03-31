import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { getLocalStorageData } from "./LocalStorage"; // Import function to get stored data from local storage

const Heatmap = () => {
  const svgRef = useRef();

  useEffect(() => {
    // Get stored data from local storage
    const storedData = getLocalStorageData();

    // Retrieve cleared items from stored data
    const clearedItems = storedData.clearedItems || {};

    // D3 code for heatmap
    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const data = Object.entries(clearedItems).map(([date, items]) => {
      const count = items.tasks.length || 0; // Count the number of tasks
      return {
        date: new Date(date),
        count: count,
      };
    });

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count)])
      .nice()
      .range([height, 0]);

    const colorScale = d3
      .scaleSequential(d3.interpolateReds)
      .domain([0, d3.max(data, (d) => d.count)]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    svg.append("g").attr("transform", `translate(0,${height})`).call(xAxis);

    svg.append("g").call(yAxis);

    svg
      .selectAll(".rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.date))
      .attr("y", (d) => y(d.count))
      .attr("width", width / data.length)
      .attr("height", (d) => height - y(d.count))
      .attr("fill", (d) => colorScale(d.count))
      .on("mouseover", (event, d) => {
        // Show tooltip on mouseover
        tooltip.style("display", "block").html(
          `<div>Date: ${d.date.toDateString()}</div>
            <div>Tasks: ${d.count}</div>`
        );
      })
      .on("mousemove", (event) => {
        // Position tooltip next to cursor
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px");
      })
      .on("mouseout", () => {
        // Hide tooltip on mouseout
        tooltip.style("display", "none");
      });

    // Create a tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("display", "none");

    return () => {
      // Cleanup function
      tooltip.remove();
    };
  }, []); // Empty dependency array since we only want to run this once when the component mounts

  return <svg ref={svgRef}></svg>;
};

export default Heatmap;

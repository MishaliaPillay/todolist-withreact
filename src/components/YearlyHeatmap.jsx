import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { getLocalStorageData } from "./LocalStorage";
import "./Heatmap.css";

const Heatmap = () => {
  const svgRef = useRef();

  useEffect(() => {
    const storedData = getLocalStorageData();
    const clearedItems = storedData?.clearedItems || {};

    // Get the current year
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    // Calculate the number of days in the year
    const daysInYear = d3.timeDay.count(
      new Date(currentYear, 0, 1),
      new Date(currentYear + 1, 0, 1)
    );

    // Generate data for all days of the year
    const data = Array.from({ length: daysInYear }, (_, i) => {
      const date = new Date(currentYear, 0, i + 1);
      const dateString = date.toISOString().split("T")[0];
      const count = clearedItems[dateString]?.tasks?.length || 0;
      return {
        date: date,
        count: count,
      };
    });

    const margin = { top: 20, right: 10, bottom: 40, left: 40 };
    const cellSize = 10; // Adjust cell size for all days of the year
    const calendarWidth = 400; // Set a fixed width for simplicity
    const calendarHeight = Math.ceil(daysInYear / 7) * cellSize; // Calculate height based on number of weeks

    const svg = d3
      .select(svgRef.current)
      .attr("class", "mapyear")
      .attr("width", "700px")
      .attr("height", "150px")
      .style("background-color", "#2bbccc")
      .style("border", "2px solid #2bbccc")
      .style("border-radius", "5px")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top}) `);

    const colorScale = d3
      .scaleSequential(d3.interpolateReds)
      .domain([0, d3.max(data, (d) => d.count)]);

    // Create heatmap squares
    svg
      .selectAll(".rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => Math.floor(i / 7) * cellSize) // Calculate x position based on week index
      .attr("y", (d, i) => (i % 7) * cellSize) // Calculate y position based on day index
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("rx", 2) // Set rounded corner radius
      .attr("ry", 2)
      .style("fill", (d) => (d.count > 0 ? colorScale(d.count) : "#ebfbfc"))
      .style("stroke", "#03686e")
      .style("stroke-width", 1);

    // Add month labels
    const monthLabels = d3.timeMonths(
      new Date(currentYear, 0, 1),
      new Date(currentYear, 11, 31)
    );

    const monthScale = d3
      .scaleBand()
      .domain(monthLabels)
      .range([0, calendarHeight]) // Adjusted range for horizontal layout
      .padding(0.1);

    // Create a group for the month labels
    svg
      .append("g")
      .selectAll(".monthLabel")
      .data(monthLabels)
      .enter()
      .append("text")
      .attr("class", "monthLabel")
      .attr("x", (d) => monthScale(d) + monthScale.bandwidth() / 2) // Adjust x position for the left margin
      .attr("y", margin.top * 5)
      .attr("text-anchor", "middle")
      .text((d) => d3.timeFormat("%b")(d)); // Format the month label as abbreviated month name
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default Heatmap;

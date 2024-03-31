import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { getLocalStorageData } from "./LocalStorage";

const Heatmap = () => {
  const svgRef = useRef();
  useEffect(() => {
    const storedData = getLocalStorageData();
    const clearedItems = storedData.clearedItems || {};

    console.log("Cleared Items:", clearedItems); // Log clearedItems to check its structure

    // Get the current year and month
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Calculate the number of days in the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const data = Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(currentYear, currentMonth, i + 1);
      const dateString = date.toISOString().split("T")[0];
      const count = clearedItems[dateString]?.tasks.length || 0;
      console.log(`Count for ${dateString}:`, count); // Log the count for each date
      return {
        date: date,
        count: count,
      };
    });

    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const cellSize = 20;
    const calendarWidth = cellSize * daysInMonth;
    const calendarHeight = cellSize * 7; // 7 days in a week

    const svg = d3
      .select(svgRef.current)
      .attr("width", calendarWidth + margin.left + margin.right)
      .attr("height", calendarHeight + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const colorScale = d3
      .scaleSequential(d3.interpolateReds)
      .domain([0, d3.max(data, (d) => d.count)]);

    svg
      .selectAll(".rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => (i % 7) * cellSize) // Position based on the day of the week
      .attr("y", (d, i) => Math.floor(i / 7) * cellSize) // Position based on the week number
      .attr("width", cellSize)
      .attr("height", cellSize)
      .style("fill", (d) => (d.count > 0 ? colorScale(d.count) : "#ebedf0")) // GitHub's background color for no data
      .on("mouseover", (event, d) => {
        const tooltip = d3.select(".tooltip");
        tooltip.style("display", "block").html(
          `<div>Date: ${d.date.toDateString()}</div>
          <div>Tasks: ${d.count}</div>`
        );
      })
      .on("mousemove", (event) => {
        d3.select(".tooltip")
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px");
      })
      .on("mouseout", () => {
        d3.select(".tooltip").style("display", "none");
      });

    // Create a tooltip
    d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("display", "none");

    return () => {
      d3.select(".tooltip").remove();
    };
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default Heatmap;

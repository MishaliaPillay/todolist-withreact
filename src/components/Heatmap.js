import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { getLocalStorageData } from "./LocalStorage";
import "./Heatmap.css";
const Heatmap = () => {
  const svgRef = useRef();

  useEffect(() => {
    const storedData = getLocalStorageData();
    const clearedItems = storedData?.clearedItems || {};

    // Get the current year and month
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Calculate the number of days in the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const data = Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(currentYear, currentMonth, i + 1);
      const dateString = date.toISOString().split("T")[0];
      const count = clearedItems[dateString]?.tasks?.length || 0;
      return {
        date: date,
        count: count,
      };
    });

    const margin = { top: 20, right: 10, bottom: 20, left: 0 };
    const cellSize = 29;
    const calendarWidth = cellSize * 7; // Adjusted to show only 7 columns
    const calendarHeight = cellSize * 6; // Adjusted to show only 6 rows

    const svg = d3
      .select(svgRef.current)
      .attr("class", " map")
      .attr("width", calendarWidth + margin.left + margin.right)
      .attr("height", calendarHeight + margin.top + margin.bottom)
      .style("background-color", "#2bbccc") // Set background color
      .style("border", "2px solid #2bbccc") // Set outline
      .style("border-radius", "5px")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top * 2})`); // Adjust translation values

    svg
      .append("text")
      .attr("x", calendarWidth / 2)
      .attr("y", -margin.top / 2)
      .attr("text-anchor", "middle")
      .text(`Activity for ${d3.timeFormat("%B")(currentDate)}`)
      .style("font-size", "18px")
      .style("font-style", "poppins")

      .style("fill", "#f0fbfc");
    const colorScale = d3
      .scaleSequential(d3.interpolateReds)
      .domain([0, d3.max(data, (d) => d.count)]);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    // Adjust the padding value as needed
    const padding = 5;
    const cellSizeWithPadding = cellSize - padding;

    // Inside the useEffect hook where you create the heatmap squares
    const squares = svg
      .selectAll(".rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => (i % 7) * cellSize + padding / 2) // Adjust x position with padding
      .attr("y", (d, i) => Math.floor(i / 7) * cellSize + padding / 2) // Adjust y position with padding
      .attr("width", cellSizeWithPadding) // Adjust width with padding
      .attr("height", cellSizeWithPadding) // Adjust height with padding
      .attr("rx", cellSizeWithPadding / 5) // Adjust rx attribute for rounded horizontal corners
      .attr("ry", cellSizeWithPadding / 5) // Adjust ry attribute for rounded vertical corners
      .style("fill", (d) => (d.count > 0 ? colorScale(d.count) : "#ebfbfc"))
      .style("stroke", "#03686e")
      .style("stroke-width", 2);

    // Define event handler functions
    squares
      .on("mouseover", function (event, d) {
        d3.select(this).style("stroke-width", 3).style("stroke", "#e1effc"); // Increase stroke width on hover
        const tooltip = d3
          .select("body")
          .append("div")
          .attr("class", "tooltip")
          .style("position", "absolute")
          .style("background-color", "white")
          .style("padding", "5px")
          .style("border", "1px solid black")
          .style("font-size", "12px")
          .attr("width", "100px")
          .style("border-radius", "5px")
          .html(
            ` ${d.count} Tasks Completed on ${d.date.getDate()} ${
              monthNames[d.date.getMonth()]
            } ${d.date.getFullYear()}  `
          );
        tooltip
          .style("left", d3.pointer(event)[0] + 50 + "px")
          .style("top", d3.pointer(event)[1] + 310 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).style("stroke-width", 2).style("stroke", "#03686e"); // Reset stroke width on mouseout
        d3.select(".tooltip").remove();
      });
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default Heatmap;

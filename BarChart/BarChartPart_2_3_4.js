data = [4, 8, 15, 16, 23, 42, 10, 25, 18, 30, 12, 5, 14, 22, 17, 29, 35, 40, 11, 7]

{
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 640 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([0, width]);

    const y = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([0, height])
        .padding(0.1);
        
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", y.range()[1])
        .attr("font-family", "sans-serif")
        .attr("font-size", "14")
        .attr("text-anchor", "end");
  
    const bar = svg.selectAll("g")
      .data(data)
      .join("g")
        .attr("transform", (d, i) => `translate(0,${y(i)})`);
  
    bar.append("rect")
        .attr("fill", "green")
        .attr("width", x)
        .attr("height", y.bandwidth() - 1);
  
    bar.append("text")
        .attr("fill", "black")
        .attr("x", d => x(d) - 3)
        .attr("y", (y.bandwidth() - 1) / 2)
        .attr("dy", "0.35em")
        .text(d => d);
  
    document.getElementById("chart-container").appendChild(svg.node());
  }
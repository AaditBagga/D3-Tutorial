document.getElementById('csvFile').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const csvData = d3.csvParse(e.target.result, d3.autoType);
            updateChart(csvData);
        };

        reader.readAsText(file);
    }
}

function updateChart(data) {
    const margin = { top: 20, right: 0, bottom: 30, left: 40 };
    const width = 800;
    const height = 500;

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.frequency)])
        .range([height - margin.bottom, margin.top]);

    const x = d3.scaleBand()
        .domain(data.map(d => d.letter))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height]);

    svg.append("g")
        .attr("fill", "steelblue")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", d => x(d.letter))
        .attr("y", d => y(d.frequency))
        .attr("height", d => y(0) - y(d.frequency))
        .attr("width", x.bandwidth());

    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, "%"))
        .call(g => g.select(".domain").remove());

    svg.append("text")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("y", 10)
        .text("↑ Frequency");

    document.getElementById("chart-container").innerHTML = '';
    document.getElementById("chart-container").appendChild(svg.node());
}
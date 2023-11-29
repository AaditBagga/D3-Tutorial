//data = [4, 8, 15, 16, 23, 42, 10, 25, 18, 30, 12, 5, 14, 22, 17, 29, 35, 40, 11, 7]

document.getElementById('csvFile').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const csvData = d3.csvParse(e.target.result, d3.autoType);
            const chart = updateChart(csvData);
            document.getElementById("chart-container").innerHTML = '';
            document.getElementById("chart-container").appendChild(chart);
        };

        reader.readAsText(file);
    }
}

function updateChart(data) {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 640 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([0, width]);

    const y = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, height])
        .padding(0.1);

    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", y.range()[1])
        .attr("font-family", "sans-serif")
        .attr("font-size", "10")
        .attr("text-anchor", "end");

    const bar = svg.selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", d => `translate(0,${y(d.name)})`);

    bar.append("rect")
        .attr("fill", "steelblue")
        .attr("width", d => x(d.value))
        .attr("height", y.bandwidth() - 1);

    bar.append("text")
        .attr("fill", "white")
        .attr("x", d => x(d.value) - 3)
        .attr("y", (y.bandwidth() - 1) / 2)
        .attr("dy", "0.35em")
        .text(d => d.value);

    return svg.node();
}
let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
let req = new XMLHttpRequest(); 
let values = []; 

let xScale
let yScale

let width = 800; 
let height = 600; 
let padding = 40; 

let svg = d3.select("svg"); 

let drawCanvas = () => {
    svg.attr("width", width)
    svg.attr("height", height)
}

let generateScales = () => {
    xScale = d3.scaleLinear()
        .range([padding, width - padding])

    yScale = d3.scaleTime()
        .range([padding, height - padding])
}

let drawPoints = () => {

}

let generateAxis = () => {
    // generate x axis 
    let xAxis = d3.axisBottom(xScale)

    // generate y axis 
    let yAxis = d3.axisLeft(yScale)

    svg.append("g")
    .call(xAxis)
    // -User Story #2: I can see an x-axis that has a corresponding id="x-axis".
    .attr("id", "x-axis")
    // bring x axis to bottom of graph 
    .attr("transform", "translate(0, " + (height - padding) + ")")

    svg.append("g")
    .call(yAxis)
    // - User Story #3: I can see a y-axis that has a corresponding id="y-axis".
    .attr("id", "y-axis")
    // bring y axis to line up with x axis padding from left
    .attr("transform", "translate(" + padding + ", 0)")

}

req.open("GET", url, true)
req.onload = () => {
    values = JSON.parse(req.responseText)
    drawCanvas()
    generateScales()
    drawPoints()
    generateAxis()
}
req.send()
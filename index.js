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
        //- User Story #11: I can see that the range of the x-axis labels are within the range of the actual x-axis data.
        .domain([d3.min(values, (item) => {
            return item["Year"]
        }) -1, d3.max(values, (item) => {
            return item["Year"]
        }) + 1])
        .range([padding, width - padding])

    yScale = d3.scaleTime()
        // - User Story #12: I can see that the range of the y-axis labels are within the range of the actual y-axis data.
        .domain([d3.min(values, (item) => {
            return new Date(item["Seconds"] * 1000)
        }), d3.max(values, (item) => {
            return new Date(item["Seconds"] * 1000)
        })])
        .range([padding, height - padding])
}

let drawPoints = () => {
    svg.selectAll("circle")
        .data(values)
        .enter()
        .append("circle")
        // -User Story #4: I can see dots, that each have a class of dot, which represent the data being plotted.
        .attr("class", "dot")
        .attr("r", "5")
        // -User Story #5: Each dot should have the properties data-xvalue and data-yvalue containing their corresponding x and y values.
            // -User Story #6: The data-xvalue and data-yvalue of each dot should be within the range of the actual data and in the correct data format. For data-xvalue, integers (full years) or Date objects are acceptable for test evaluation. For data-yvalue (minutes), use Date objects.
                // - User Story #7: The data-xvalue and its corresponding dot should align with the corresponding point/value on the x-axis.
        .attr("data-xvalue", (item) => {
            return item["Year"]
        })
                // -User Story #8: The data-yvalue and its corresponding dot should align with the corresponding point/value on the y-axis.
        .attr("data-yvalue", (item) => {
            return new Date(item["Seconds"] * 1000)
        })

        .attr("cx",  (item) => {
            return xScale(item["Year"])
        })

        .attr("cy", (item) => {
            return yScale(new Date(item["Seconds"] * 1000))
        })

        .attr("fill", (item) => {
            if(item["Doping"] != "") {
                return "red"
            } else {
                return "white"
            }
        })
}

let generateAxis = () => {
    // generate x axis 
    let xAxis = d3.axisBottom(xScale)
                // - User Story #10: I can see multiple tick labels on the x-axis that show the year.
                // to put year in interger form 
                .tickFormat(d3.format("d"))

    // generate y axis 
    let yAxis = d3.axisLeft(yScale)
                // - User Story #9: I can see multiple tick labels on the y-axis with %M:%S time format.
                // to put in proper time format in minutes and seconds 
                .tickFormat(d3.timeFormat("%M:%S"))

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
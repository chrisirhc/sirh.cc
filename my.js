/* global d3 */
var width = 800, height = 800;
var svg = d3.select("#svg-container").append("svg:svg")
          .attr("width", width)
          .attr("height", height);

// svg.selectAll("circle");

var bgRect = svg.append("svg:rect")
             .attr("x", 0).attr("y", 0)
             .attr("width", width).attr("height", height);
var circle = svg.append("svg:circle").attr("r", 5);

var arrOfPoints = [];
var arrOfTimes = [];
var dist = 0;
var MAX_DIST = 100;

svg.on("mousemove", function () {
    var point = d3.mouse(svg[0][0]);
    // console.log(point);
    circle
    .attr("cx", point[0])
    .attr("cy", point[1]);
    addPoint( point );

    bgRect.style("fill", d3.hsl( point[0] / width * 360, 0.25 + 0.75 * point[1] / height, 0.5 ));

    var update = svg.selectAll(".p").data( arrOfPoints );
    update
    .attr("cx", function (d) { return d[0];})
    .attr("cy", function (d) { return d[1];});
    var enter = update.enter()
                .append("svg:circle")
                .attr("r", 2).classed("p", true)
                .attr("cx", function (d) { return d[0];})
                .attr("cy", function (d) { return d[1];});
    var exit = update.exit().remove();
});

function addPoint ( point ) {
    if ( arrOfPoints.length ) {
        var lastIndex = arrOfPoints.length - 1;
        var lastPoint = arrOfPoints[lastIndex];
        var currentDistSum =
            Math.sqrt(
                (point[0] - lastPoint[0])*(point[0] - lastPoint[0]) +
                    (point[1] - lastPoint[1])*(point[1] - lastPoint[1])
            ) + dist;
        if ( currentDistSum < MAX_DIST ) {
            arrOfPoints.push(point);
            arrOfTimes.push(new Date().getTime());
            dist = currentDistSum;
        } else {
            arrOfPoints = [ point ];
            arrOfTimes = [ new Date().getTime() ];
            dist = currentDistSum - dist;
        }
    } else {
        arrOfPoints.push(point);
        arrOfTimes.push(new Date().getTime());
        dist = 0;
    }
}

function store ( aArrOfPoints, aArrOfTimes ) {
    var arrOfPointsCopy = aArrOfPoints.slice();
    var arrOfTimesCopy = aArrOfTimes.slice();
    var i;
    for ( i = 1; i < arrOfTimesCopy.length; i++ ) {
        arrOfTimesCopy[i] -= arrOfTimesCopy[0];
    }
    arrOfTimesCopy[0] = 0;
    svg.append("")
}

function clearPoints () {

}

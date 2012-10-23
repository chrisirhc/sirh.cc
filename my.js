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

var timelineObjs = [];
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
    var nPoint = point.slice();
    if ( arrOfPoints.length ) {
        var lastIndex = arrOfPoints.length - 1;
        var lastPoint = arrOfPoints[lastIndex];
        var currentDistSum =
            // TODO: Use ease and interpolate functionality of d3
            Math.sqrt(
                (nPoint[0] - lastPoint[0])*(nPoint[0] - lastPoint[0]) +
                    (nPoint[1] - lastPoint[1])*(nPoint[1] - lastPoint[1])
            ) + dist;
        if ( currentDistSum < MAX_DIST ) {
            arrOfPoints.push(nPoint);
            arrOfTimes.push(new Date().getTime());
            dist = currentDistSum;
        } else {
            store( arrOfPoints, arrOfTimes );
            arrOfPoints = [ nPoint ];
            arrOfTimes = [ new Date().getTime() ];
            dist = currentDistSum - dist;
        }
    } else {
        arrOfPoints.push(nPoint);
        arrOfTimes.push(new Date().getTime());
        dist = 0;
    }
}

function store ( aArrOfPoints, aArrOfTimes ) {
    var arrOfPointsCopy = aArrOfPoints.slice();
    var arrOfTimesCopy = aArrOfTimes.slice();
    var i;
    for ( i = arrOfPointsCopy.length; (i--); ) {
        arrOfPointsCopy[i] = [arrOfPointsCopy[i][0] / width, arrOfPointsCopy[i][1] / height];
    }
    for ( i = arrOfTimesCopy.length; (i--) - 1; ) {
        arrOfTimesCopy[i] -= arrOfTimesCopy[i-1];
    }
    arrOfTimesCopy[0] = 0;
    timelineObjs.push(new TimelineObj(arrOfPointsCopy, arrOfTimesCopy));
}

function clearPoints () {

}

var countW = 20, countH = 20;
var littleW = width / countW, littleH = height / countH;
var timelineObjCount = 0;
var globalPause = false;
function TimelineObj ( aArrOfPoints, aArrOfTimes ) {
    this.arrOfPoints = aArrOfPoints;
    this.arrOfTimes = aArrOfTimes;
    //TODO: Fix calculations
    this.obj = svg.append("svg:rect")
               .attr("x", ( parseInt(timelineObjCount / ( countH )) % countW ) * littleW )
               .attr("y", timelineObjCount % countW * littleH )
               .attr("width", littleW)
               .attr("height", littleH);
    this.nextTick = function nextTick ( i ) {
        var that = this;
        var nextI = (i+1) % that.arrOfTimes.length;
        // console.log(this, nextI);
        this.obj.style("fill",
                       d3.hsl( this.arrOfPoints[i][0] * 360, 0.25 +
                               0.75 * this.arrOfPoints[i][1], 0.5 ));
        if ( !globalPause ) {
            d3.timer(function (){
                return that.nextTick(nextI);
            }, this.arrOfTimes[i]);
        }
        return true;
    }
    this.nextTick(0);
    timelineObjCount++;
}

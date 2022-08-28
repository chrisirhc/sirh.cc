import * as d3 from 'd3';

export default function setupFunkyBackground() {
  var width = 100, height = 100;
  var svg = d3.select("#svg-container").append("svg:svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("preserveAspectRatio", "xMidYMax")
            .attr("viewBox", "0 0 " + width + " " + height)
            .style('z-index', '-2000')
            .style('position', 'fixed')
            .style('left', '0')
            .style('top', '0');

  var timelineObjs = [];
  var arrOfPoints = [];
  var arrOfTimes = [];
  var dist = 0;
  var MAX_DIST = 100;
  var MAX_OBJS = 50;

  d3.select(document.body).on("mousemove", function () {
      var point = d3.mouse(document.body);
      point[0] = ( point[0] - window.scrollX ) / window.innerWidth * width;
      point[1] = ( point[1] - window.scrollY ) / window.innerHeight * height;
      // console.log(point);
      addPoint( point );

      d3.select(document.body).style("background-color", d3.hsl( point[0] / width * 360, 0.0 + 0.75 * point[1] / height, 0.5 ));

      /*
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
      */
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
              store( arrOfPoints, arrOfTimes, timelineObjCount++ );
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

  function store ( aArrOfPoints, aArrOfTimes, aCount ) {
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
      timelineObjs.push(new TimelineObj(arrOfPointsCopy, arrOfTimesCopy, aCount));
      if (timelineObjs.length > MAX_OBJS) {
          timelineObjs.shift().obj.remove();
      }
  }

  var countW = 10, countH = 10;
  var littleW = width / countW, littleH = height / countH;
  var timelineObjCount = parseInt( Math.random() * countW * countH );
  var globalPause = false;
  function TimelineObj ( aArrOfPoints, aArrOfTimes, aCount ) {
      this.arrOfPoints = aArrOfPoints;
      this.arrOfTimes = aArrOfTimes;
      //TODO: Fix calculations
      this.obj = svg.append("svg:rect")
                .attr("x", ( parseInt(aCount / ( countW )) % countW ) * littleW )
                .attr("y", aCount % countW * littleH )
                .attr("width", littleW)
                .attr("height", littleH);
      this.nextTick = function nextTick ( i ) {
          var that = this;
          var nextI = (i+1) % (2*that.arrOfTimes.length);
          // Reverse it
          var currentI = i < that.arrOfTimes.length ? i
                      : 2*that.arrOfTimes.length - i - 1;
          // console.log(this, nextI);
          this.obj.style("fill",
                        d3.hsl( this.arrOfPoints[currentI][0] * 360, 0.0 +
                                0.75 * this.arrOfPoints[currentI][1], 0.5 ));
          if ( !globalPause ) {
              d3.timeout(function (){
                  return that.nextTick(nextI);
              }, this.arrOfTimes[currentI]);
          }
          return true;
      }
      this.nextTick(0);
  }
}

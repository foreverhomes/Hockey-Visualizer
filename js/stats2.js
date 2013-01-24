		
$(document).ready(function() {
	var h = 700;
	    var w = 1200;
		var padding = 20;
		var svg = d3.select("body")
        	.append("svg")
        	.attr("height", h)
        	.attr("width", w);

        var xScale = d3.scale.linear()
    		.domain([40,70])
    		.range([0, w - (padding *2)]);
    
        var yScale = d3.scale.linear()
        	.domain([-1.5, 1])
        	.range([h  - (padding *2),0]);
        	
        var cScale = d3.scale.linear()
        	.domain([-15, 20])
        	.range(["yellow", "red"]);
		
		var rScale = d3.scale.linear()
			.domain([-15, 20])
			.range([10, 70]); 	

	d3.csv("PlayerUsageCharts.csv", function(dataset) {
        var h = 700;
	    var w = 1200;
		var padding = 20;
		var svg = d3.select("svg");
		
		d3.select("#filter")
        .on("click", function() {
        	//svg.remove("circle");
        	
            
			
			
			
			var selection = $('#Teams').val(); 
			alert(selection)
			
			svg.selectAll("circle")
				.data(dataset.filter(function(d){
					return d.Team == selection;
				}))
				.enter()
				.append("circle")
				.transition()
				.duration(500)
				.attr("id", function(d, i) {
					return i;
				})
				.attr("cx", function(d) {
					return xScale(d.OZ);
				})
				.attr("cy", function(d) {
					return yScale(d.RQoC);
				})
				.attr("r", function(d) {
					return (rScale(parseFloat(d.RelC)));
				})
				.attr("fill", function(d) {
					return cScale(parseFloat(d.RelC));
				})
				.style("fill-opacity", ".325")
				
	
				
			svg.selectAll("text")
			   .data(dataset.filter(function(d){
					return d.Team == selection;
				}))
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return d.FirstName + ' ' + d.LastName;
			   })
			   .transition()
			   .duration(500)
			   .attr("x", function(d) {
			   		return xScale(d.OZ);
			   })
			   .attr("y", function(d) {
			   		return yScale(d.RQoC);
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "#666");
			   
			svg.append("g")
			    .attr("class", "axis")
			    .attr("transform", "translate(" + padding + "," + (h - padding)/2 + ")")
	        	.call(d3.svg.axis()
	            .scale(xScale)
	            .orient("bottom")
	            .ticks(7));
	        
	        svg.append("g")
	        	.attr("class", "axis")
			    .attr("transform", "translate(" + padding + "," + padding + ")")
	        	.call(d3.svg.axis()
	        	.scale(yScale)
	        	.orient("right")
	        	.ticks(4));

        })
    })

});

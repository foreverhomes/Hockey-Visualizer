
$(document).ready(function() {
	var h = 700;
    var w = $(window).width() - 40;
	var padding = 20;
	var svg = d3.select("#main")
    	.append("svg")
    	.attr("height", h)
    	.attr("width", w);

    var xScale = d3.scale.linear()
		.domain([30,75])
		.range([0, w - (padding *2)]);

    var yScale = d3.scale.linear()
    	.domain([-3, 3])
    	.range([h  - (padding *2),0]);
    	
    var cScale = d3.scale.linear()
    	.domain([-15, 15])
    	.range(["yellow", "red"]);
	
	var rScale = d3.scale.linear()
		.domain([-15, 15])
		.range([10, 70]); 
		
	svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(" + padding + "," + (h - padding)/2 + ")")
    	.call(d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(7));
    
    svg.append("g")
    	.attr("class", "y axis")
	    .attr("transform", "translate(" + padding + "," + padding + ")")
    	.call(d3.svg.axis()
    	.scale(yScale)
    	.orient("right")
    	.ticks(4));

    svg.select("#main").append("div").attr("class", "axis-label").text("Offensive zone starts (%)").attr("x", 20).attr("y", (h - padding)/2 - 30);
	         
	d3.json("json/5v5.json", function(dataset) {
		
		d3.select("#filter").on("click", function() {

        	// var text = svg.selectAll("text.name");
        	// //.transition().duration(500).attr("opacity",0).remove();
        	// console.log(text);

        	// text.remove();
			
			var selection = $('#Teams').val();
			
			var position = $('#Pos').val();

			console.log(selection, position)

			var circle = svg.selectAll("circle.player")
				.data(dataset.filter(function(d){
					if(position == 'ALL') {
						return d.team == selection && d.crel > -15;
					}
					else {
						return (d.team == selection && d.pos == position && d.crel > -15);
					}
					
				}));

			circle.enter()
				.append("circle")
				.attr("class", function(d, i) {
					return "player " + "player-"+i;
				})
				.attr("id", function(d, i) {
					return i;
				})
				.attr("cx", function(d) {
					return xScale(d.sozone);
				})
				.attr("cy", function(d) {
					return yScale(d.rcqoc);
				})
				.attr("fill", function(d) {
					return cScale(parseFloat(d.crel));
				})
				.style("fill-opacity", ".325")
				.transition()
				

			circle.exit().transition().duration(500).attr("r", 0).remove();

			circle.transition().duration(500)
				.attr("r", function(d) {
					return (rScale(parseFloat(d.crel)));
				})
				.attr("cx", function(d) {
					return xScale(d.sozone);
				})
				.attr("cy", function(d) {
					return yScale(d.rcqoc);
				})

			var group = svg.selectAll("g.player")
				.data(dataset.filter(function(d){
					if(position == 'ALL') {
						return d.team == selection && d.crel > -15;
					}
					else {
						return (d.team == selection && d.pos == position && d.crel > -15);
					}
					
				}));
				
			//group.selectAll("g.player text").transition().duration(500).attr("opacity",0).remove();

			group.enter().append("g").attr("class", function(d, i) {
					return "player " + "player-"+i;
				})
				.append("text")
				.text(function(d) {
			   		return d.player + ' (' + d.crel + ')';
				})
				.attr("x", function(d) {
					return xScale(d.sozone);
				})
				.attr("y", function(d) {
					return yScale(d.rcqoc);
				})
				.attr("class", "name")
				.attr("font-family", "sans-serif")
				.attr("font-size", "11px")
				.attr("fill", "#666")
				.style("fill-opacity", ".25");

			// var text = group.select("text")

			group.select("text").transition().duration(500)
				.attr("x", function(d) {
					return xScale(d.sozone);
				})
				.attr("y", function(d) {
					return yScale(d.rcqoc);
				})
				.text(function(d) {
			   		return d.player + ' (' + d.crel + ')';
				})


			group.exit().transition().duration(500).attr("opacity",0).remove();
			
			svg.selectAll("circle")
				.on("mouseover", function(){
					var classes = this.getAttribute("class");
					classes = classes.split(" ");
					var playerID = classes[classes.length-1];
					d3.select(this)
						.transition()
						.duration(100)
						.style("fill-opacity", "1");
					d3.select(this.parentNode).select("g." + playerID + " text")
						.transition()
						.duration(100)
						.attr("fill", "#000")
						.style("fill-opacity", "1");
				})
				.on("mouseout", function() {
					var classes = this.getAttribute("class");
					classes = classes.split(" ");
					var playerID = classes[classes.length-1];
					d3.select(this)
						.transition()
						.duration(100)
						.style("fill-opacity", ".325");
					d3.select(this.parentNode).select("g." + playerID + " text")
						.transition()
						.duration(100)
						.attr("fill", "#666")
						.style("fill-opacity", ".1");
				});

	       
        })
    })

});

import React, { Component, useRef } from "react";
import * as d3 from "d3"; // TODO: optimize d3
import * as GeoTypes from "../types/geo";


const getMapCenter = (markers: any) => {
    /**
     * Calculates average of coordinates and returns
     * as list [longitude, latitude]
     */
    let latSum = 0, lonSum = 0;

    for (var i = 0; i < markers.length; i++) {
        latSum = latSum + markers[i].latitude;
        lonSum = lonSum + markers[i].longitude;
    }
    
    let center = [lonSum / markers.length, latSum / markers.length];

    return center;
}

const drawMap = (svgRef: React.RefObject<SVGElement>, markers: any) => {

    const svg = d3.select(svgRef),
        margin = {top: 20, right: 20, bottom: 40, left: 200},
        width = parseInt(svg.attr("width")),
        height = parseInt(svg.attr("height")),
        zoom = 500,
        translation = "translate(" + margin.left + "," + margin.top + ")";

    let isDefault = false;

    if (markers[0].latitude == null || markers[0].latitude == null) {
        isDefault = true;
        markers = [{"latitude": 41.4191, "longitude": -87.7748}];
    }

    svg.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    // Map and projection
    var projection = d3.geoMercator()
        .center(getMapCenter(markers))
        .scale(zoom)
        .translate([ width/2, height/2 ])

    // Load external data and boot
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(data) {

        // Filter data
        data.features = data.features.filter( function(d){return d.properties.name=="USA"} );

        // Draw the map
        svg.append("g").attr("transform", translation)
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("fill", "#b8b8b8")
        .attr("d", d3.geoPath()
                .projection(projection)
            )
        .style("stroke", "black")
        .style("opacity", .3)

        /*var tooltip = d3.select("body")
                .append("div")
                .style("position", "absolute")
                .style("z-index", "10")
                .style("visibility", "hidden")
                .text([markers[0].latitude, markers[0].longitude]);*/

        if (!isDefault) {
            // Add circles:
            svg.selectAll("myCircles")
                .data(markers)
                .enter()
                .append("svg:circle")
                .attr("cx", function(d){ return projection([d.longitude, d.latitude])[0] })
                .attr("cy", function(d){ return projection([d.longitude, d.latitude])[1] })
                .attr("r", 8)
                .style("fill", "69b3a2")
                .attr("stroke", "#69b3a2")
                .attr("stroke-width", 3)
                .attr("fill-opacity", .4)
                .attr("transform", translation)
                //.on("mouseover", function(){return tooltip.style("visibility", "visible");})
                //.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
                //.on("mouseout", function(){return tooltip.style("visibility", "hidden");});
        }
    }).catch(function(error) { console.log("error", error); });
}

class OriginMap extends Component {

    componentDidMount() {
        let defaultMarkers = [{"latitude": null, "longitude": null}];
        drawMap(this.refs.map, defaultMarkers);
    }

    render() { return <svg ref="map" height="300px" width="500px" display="block"></svg> }
}
  
export default OriginMap;

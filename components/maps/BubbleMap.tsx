/**
 * NOTE: this map is limited to contiguous USA for initial versions.
 */
import React, { useRef, useState, useEffect } from "react";
import * as d3 from "d3"; // TODO: optimize d3
import * as utils from "./utils";
import * as GeoTypes from "../types/geo";


const getSvg = (ref: any) => {
    /**
     * Return d3 control over ref virtualization.
     */
    return d3.select(ref.current);
}

const getTranslation = (margin: any) => { 
    /**
     * Return translation string corresponding to margins.
     */
    return "translate(" + margin.left + "," + margin.top + ")";
}

const updateSvgSize = (svg: any, margin: any) => {
    /**
     * Update d3 selected svg with viewBoc using margin-adjusted height and width.
     */
    const width = parseInt(svg.style("width")),
          height = parseInt(svg.style("height"));
        
    svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMin")
        .classed("svg-content", true);
}

const getProjection = (svg: any) => {
    /**
     * Return projection corresponding to d3 selected svg element.
     */
    const width = parseInt(svg.style("width")),
          height = parseInt(svg.style("height")),
          centerMarker = [-92., 37.], // projection needs [lon, lat];
          zoom = 550,
          projection = d3.geoMercator()
            .center(centerMarker)
            .scale(zoom)
            .translate([ width / 2, height / 2 ]);
  
      return projection;
}

const addMapToProjection = (svg: any, translation: string) => {
    /**
     * Using d3 selected svg element and computed translation, TODO: project country visual to svg.
     */
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(data) {

        const projection = getProjection(svg);

        // Filter data
        data.features = data.features.filter( function(d){return d.properties.name=="USA"} );

        // Draw the map
        svg.append("g")
            .attr("transform", translation)
            .selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .attr("fill", "#b8b8b8")
            .attr("d", d3.geoPath().projection(projection))
            .style("stroke", "black")
            .style("opacity", .3);
    
    }).catch(function(error) { 
        console.log("error", error);
    });
}

const drawCirclesOnMap = (svg: any, markers: Array<Object>, translation: string, name: string, size: number) => {
    /**
     * Using d3 selected svg element draw markers on map corresponding to svg-based projection. Assign class and size.
     */
    const projection = getProjection(svg);

    svg.selectAll("myCircles")
        .data(markers)
        .enter()
        .append("svg:circle")
        .attr("class", name)
        .attr("cx", function(d){ return projection([d.longitude, d.latitude])[0] })
        .attr("cy", function(d){ return projection([d.longitude, d.latitude])[1] })
        .attr("r", size)
        .style("fill", "69b3a2")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", (size/4))
        .attr("fill-opacity", .4)
        .attr("transform", translation);
}

const addOriginToMap = (svg: any, lat: Number, lon: Number, translation: any) => {
    /**
     * Using d3 selected svg element add origin to map.
     */
    const name = "originCircle",
          size = 8;

    svg.selectAll("." + name).remove();

    const markers = [{"latitude": lat, "longitude": lon}];
    drawCirclesOnMap(svg, markers, translation, name, size);
}

const addDemandToMap = (svg: any, markers: Array<Object>, translation: any) => {
    /**
     * Using d3 selected svg element add demand to map.
     */
    const name = "demandCircles",
          size = 3;

    svg.selectAll("." + name).remove();
    
    drawCirclesOnMap(svg, markers, translation, name, size);
}

const animateSvg = (svg: any) => {

}

const VrpBubbleMap = (props) => {
    /**
     * Map component function exported to parent.
     */
    const svgRef = useRef(null),
          margin = {top: 10, right: 50, bottom: 0, left: 50},
          translation = getTranslation(margin);


    useEffect(() => {
        const isAnimating = props.isAnimating;

        if (isAnimating == true) { 
            const svg = getSvg(svgRef);
            
            animateSvg(svg);
        }
    })
    
    useEffect(() => {
        /**
         * Tie to  demand file state.
         */
        const svg = getSvg(svgRef),
              markers = props.demandMarkers;

        if (!markers) {
            return;
        }

        if (utils.markersAreContiguousUsa(markers)) {
            addDemandToMap(svg, markers, translation);
        }
    });

    useEffect(() => { 
        /**
         * Tie to origin lat lon state
         */
        const svg = getSvg(svgRef),
              lat = props.originLat,
              lon = props.originLon;

        if (utils.markerIsContiguousUsa(lat, lon)) {
            addOriginToMap(svg, lat, lon, translation);
        }
    });
   
    useEffect(() => {
        /**
         * init
         */
        const svg = getSvg(svgRef)

        updateSvgSize(svg, margin);
        addMapToProjection(svg, translation);
    }, []);

    return (<div id="container" className="svg-container"><svg ref={svgRef} height={props.height} width={props.width} /></div>);
}
  
export default VrpBubbleMap;

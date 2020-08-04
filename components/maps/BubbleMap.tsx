/**
 * NOTE: this map is limited to contiguous USA for initial versions.
 */
import React, { useRef, useState, useEffect } from "react";
import * as d3 from "d3"; // TODO: optimize d3
import * as utils from "./Utils";
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
        .classed("svg-content", true);
}

const getProjection = (svg: any) => {
    /**
     * Return projection corresponding to d3 selected svg element.
     */
    const width = parseInt(svg.style("width")),
          height = parseInt(svg.style("height")),
          centerMarker = [-98, 39], // projection needs [lon, lat];
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
        svg.join("g")
            //.attr("transform", translation)
            .selectAll("path")
            .data(data.features)
            .join("path")
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
        .join("svg:circle")
        .attr("class", name)
        .attr("cx", function(d){ return projection([d.longitude, d.latitude])[0] })
        .attr("cy", function(d){ return projection([d.longitude, d.latitude])[1] })
        .attr("r", size)
        .style("fill", "69b3a2")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", (size/4))
        .attr("fill-opacity", .4)
        //.attr("transform", translation);
}

const addOriginToMap = (svg: any, lat: any, lon: any, translation: any) => {
    /**
     * Using d3 selected svg element add origin to map.
     */
    const name = "originCircle",
          size = 8;

    svg.selectAll("." + name).remove();

    const markers = [{"latitude": lat, "longitude": lon}];
    drawCirclesOnMap(svg, markers, translation, name, size);
}

const addDemandToMap = (svg: any, markers: any, translation: any) => {
    /**
     * Using d3 selected svg element add demand to map.
     */
    const name = "demandCircles",
          size = 3;

    svg.selectAll("." + name).remove();
    
    drawCirclesOnMap(svg, markers, translation, name, size);
}

const VrpBubbleMap = (props) => {
    /**
     * Map component function exported to parent.
     */
    const svgRef = useRef(null),
          [originLat, setOriginLat] = useState(),
          [originLon, setOriginLon] = useState(),
          [demandMarkers, setDemandMarkers] = useState(),
          margin = {top: 10, right: 50, bottom: 0, left: 50},
          translation = getTranslation(margin);

    const drawDemand = (svg: any) => {
        const markers = props.demandMarkers;

        if (!markers) {
            return;
        }

        if (utils.markersAreContiguousUsa(markers)) {
            setDemandMarkers(markers);
            addDemandToMap(svg, markers, translation);
        }
    }

    const drawOrigin = (svg: any) => {
        const lat = props.originLat,
              lon = props.originLon;

        if (utils.markerIsContiguousUsa(lat, lon)) {
            setOriginLat(lat);
            setOriginLon(lon);
            addOriginToMap(svg, lat, lon, translation);
        }
    }

    const drawMap = () => {
        const svg = getSvg(svgRef);

        updateSvgSize(svg, margin);
        addMapToProjection(svg, translation);

        if (originLat && originLon) {
            addOriginToMap(svg, originLat, originLon, translation);
        }
        
        if (demandMarkers) {
            addDemandToMap(svg, demandMarkers, translation);
        }
    }

    useEffect(() => {
        const svg = getSvg(svgRef);

        drawMap();
        drawOrigin(svg);
        drawDemand(svg); 
        window.addEventListener('resize', drawMap);
    });

    return (<div id="container" className="svg-container"><svg ref={svgRef} height={props.height} width={props.width} /></div>);
}
  
export default VrpBubbleMap;

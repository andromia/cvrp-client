import React, { useRef, useState, useEffect } from "react";
import * as d3 from "d3"; // TODO: optimize d3
import * as GeoTypes from "../types/geo";


const getSvg = (ref: any) => {
    return d3.select(ref.current);
}

const createGeoProjection = (centerMarkerArray: Array<Number>, height: Number, width: Number, zoom: Number) => {
    const projection = d3.geoMercator()
        .center(centerMarkerArray)
        .scale(zoom)
        .translate([ Number(width) / 2, Number(height) / 2 ]);

    return projection;
}

const addMapToProjection = (svg: any, projection: any, translation: any) => {
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(data) {

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
            .attr("d", d3.geoPath()
                    .projection(projection)
                )
            .style("stroke", "black")
            .style("opacity", .3);
    
    }).catch(function(error) { 
        console.log("error", error);
    });
}

// TODO refactor exported functions
export const markerIsContiguousUsa = (lat: Number, lon: Number) => {
    if (lat >= 19.50139 && lat <= 64.85694 && lon >= -161.75583 && lon <= -68.01197) {
        return true;
    } else {
        return false;
    }
}

export const markersAreContiguousUsa = (markers: any) => {
    let areContiguous = true;
    for (let i = 0; i < markers.length; i++) {
        if (!markerIsContiguousUsa(markers[i].latitude, markers[i].longitude)) {
            areContiguous = false;
        }
    }

    return areContiguous;
}


const drawCirclesOnMap = (svg: any, markers: Array<Object>, projection: any, translation: any, name: string, size: number) => {
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

const addOriginToMap = (svg: any, lat: Number, lon: Number, projection: any, translation: any) => {
    const name = "originCircle";
    const size = 8;
    svg.selectAll("." + name).remove();

    const markers = [{"latitude": lat, "longitude": lon}];
    drawCirclesOnMap(svg, markers, projection, translation, name, size);
}

const addDemandToMap = (svg: any, markers: Array<Object>, projection: any, translation: any) => {
    const name = "demandCircles";
    const size = 3;
    svg.selectAll("." + name).remove();
    
    drawCirclesOnMap(svg, markers, projection, translation, name, size);
}

const VrpBubbleMap = (props) => {
    const svgRef = useRef(null),
          margin = {top: 50, right: 20, bottom: 20, left: 20},
          zoom = 625,
          translation = "translate(" + margin.left + "," + margin.top + ")",
          centerMarker = [-92., 37.]; // projection needs [lon, lat];

    useEffect(() => {
        const svg = getSvg(svgRef),
              width = parseInt(svg.style("width")),
              height = parseInt(svg.style("height")),
              projection = createGeoProjection(centerMarker, height, width, zoom),
              markers = props.demandMarkers;

        if (!markers) {
            return;
        }

        if (markersAreContiguousUsa(markers)) {
            addDemandToMap(svg, markers, projection, translation);
        }
    });

    useEffect(() => {
        const svg = getSvg(svgRef),
              width = parseInt(svg.style("width")),
              height = parseInt(svg.style("height")),
              projection = createGeoProjection(centerMarker, height, width, zoom),
              lat = props.originLat,
              lon = props.originLon;

        if (markerIsContiguousUsa(lat, lon)) {
            addOriginToMap(svg, lat, lon, projection, translation);
        }
    });
   
    useEffect(() => {
        const svg = getSvg(svgRef),
              width = parseInt(svg.style("width")),
              height = parseInt(svg.style("height")),
              adjustedWidth = width + margin.left + margin.right,
              adjustedHeight = height + margin.top + margin.bottom;
        
        svg.attr("viewBox", "0 0 " + adjustedWidth + " " + adjustedHeight)
            .attr("preserveAspectRatio", "xMinYMin");

        const projection = createGeoProjection(centerMarker, height, width, zoom);

        addMapToProjection(svg, projection, translation);
    }, []);

    return (<svg ref={svgRef} height={props.height} width={props.width}></svg>);
}
  
export default VrpBubbleMap;

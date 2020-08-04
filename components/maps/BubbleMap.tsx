/**
 * NOTE: this map is limited to contiguous USA for initial versions.
 */
import React, { useRef, useState, useEffect } from "react";
import * as d3 from "d3"; // TODO: optimize d3
import * as utils from "./Utils";
import { useUsaJson } from "./MapJson";
import * as GeoTypes from "../types/geo";


const updateSvgSize = (svg: any) => {
    /**
     * Update d3 selected svg with viewBoc using margin-adjusted height and width.
     */
    const width = parseInt(svg.style("width")),
          height = parseInt(svg.style("height"));
        
    svg.attr("viewBox", "0 0 " + width + " " + height)
        .classed("svg-content", true);
}

const getProjectionFromSvg = (svg: any) => {
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

const addUsaMapToSvg = (svg: any, geoJson: any) => {
    /**
     * Using d3 selected svg element and computed translation, TODO: project country visual to svg.
     */
    const projection = getProjectionFromSvg(svg);
    geoJson.features = geoJson.features.filter( function(d){return d.properties.name=="USA"} );

    // Draw the map
    svg.join("g")
        .selectAll("path")
        .data(geoJson.features)
        .join("path")
        .attr("fill", "#b8b8b8")
        .attr("d", d3.geoPath().projection(projection))
        .style("stroke", "black")
        .style("opacity", .3);
}

const addMarkersToMap = (svg: any, markers: Array<Object>, name: string, size: number) => {
    /**
     * Using d3 selected svg element draw markers on map corresponding to svg-based projection. Assign class and size.
     */
    const projection = getProjectionFromSvg(svg);

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
        .attr("fill-opacity", .4);
}

const drawDemand = (svg: any, markers: Array<object>) => {
    /**
    * Using d3 selected svg element add demand to map.
    */
    if (!markers) {
        return;
    }

    if (utils.markersAreContiguousUsa(markers)) {
        const name = "demandCircles",
        size = 3;

        svg.selectAll("." + name).remove();

        addMarkersToMap(svg, markers, name, size);
    }
}

const drawOrigin = (svg: any, lat: number, lon: number) => {
    /**
     * Using d3 selected svg element add origin to map.
     */
    if (utils.markerIsContiguousUsa(lat, lon)) {
        const name = "originCircle",
        size = 8;

        svg.selectAll("." + name).remove();

        const markers = [{"latitude": lat, "longitude": lon}];
        
        addMarkersToMap(svg, markers, name, size);
    }
}

const drawVrpMap = (svg: any, oLat: any, oLon: any, demand: any, geoJson: any) => {
    updateSvgSize(svg);
    addUsaMapToSvg(svg, geoJson);

    if (oLat && oLon) {
        drawOrigin(svg, oLat, oLon);
    }
    
    if (demand) {
        drawDemand(svg, demand);
    }
}

const VrpBubbleMap = (props) => {
    /**
     * Map component function exported to parent.
     */
    const svgRef = useRef(null),
          usaJson = useUsaJson(),
          [originLatState, setOriginLat] = useState(999.),
          [originLonState, setOriginLon] = useState(999.),
          [demandState, setDemand] = useState(Object);

    useEffect(() => {
        const svg = d3.select(svgRef.current),
              oLat = props.originLat,
              oLon = props.originLon,
              demand = props.demandMarkers;

        if (!usaJson) {
            return;
        } 

        drawVrpMap(svg, demand, oLat, oLon, usaJson);
        drawOrigin(svg, oLat, oLon);
        drawDemand(svg, demand);

        setOriginLat(oLat);
        setOriginLon(oLon);
        setDemand(demand);

        window.addEventListener('resize', function() {
            drawVrpMap(svg, originLatState, originLonState, demandState, usaJson);
        });
    });

    return (<div id="container" className="svg-container"><svg ref={svgRef} height={props.height} width={props.width} /></div>);
}
  
export default VrpBubbleMap;

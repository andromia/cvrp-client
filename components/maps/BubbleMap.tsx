/**
 * NOTE: this map is limited to contiguous USA for initial versions.
 * 
 * TODO:
 *   - refactor for agnostic components
 *   - improve general performance
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
        .attr("fill-opacity", .4)
        .on("mouseover", function(d) {
            d3.select(this)
                .style("stroke", "black")
                .style("stroke-width", (size/2))
                .style("opacity", 1)
            })
        .on("mousemove", function(d) {
            d3.select(this).append("svg:title")
                .text(function(d) { return "lat: " + d.longitude + ", lon: " + d.latitude });
            })
        .on("mouseleave", function(d) {
            d3.select(this)
                .style("stroke", "#69b3a2")
                .style("stroke-width", (size/4))
                .style("fill-opacity", .4)
        });
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

const createRouteLineStrings = (oLat: number, oLon: number, demand: any, vehicles: any, stops: any) => {
    /**
     * Create LineStrings for each route using vehicles (vehicle_id). 
     * 
     * NOTE: requires [lon, lat] order
     * 
     * TODO: 
     *   - incorporate stops for ordering
     *   - improve method (brute forced for MVP)
     * 
     * Returns a list of objects for {type: "LineString", coordinates: [[], ...]}
     */
    let routes = {};

    for (var i = 0; i < demand.length; i++) {
        if (routes.hasOwnProperty(vehicles[i])) {
            routes[vehicles[i]].coordinates.push([demand[i].longitude, demand[i].latitude])
        } else {
            routes[vehicles[i]] = {
                type: "LineString",
                coordinates: [[oLon, oLat], [demand[i].longitude, demand[i].latitude]]
            }
        }
    }

    // convert routes to list of objects
    let lineStrings: object[] = [];
    const keys = Object.keys(routes);

    for (var i = 0; i < keys.length; i++) {
        let route = routes[keys[i]];
        route.coordinates.push([oLon, oLat]);
        lineStrings.push(route);
    }

    return lineStrings;    
}

const drawRoutes = (svg: any, oLat: number, oLon: number, demand: Array<object>, vehicles: Array<number>, stops: Array<number>) => {
    /**
     * Draw each node with a segment between it and its next stop along 
     * the route it belongs to. For example, vehicle 1 may have stop 
     * numbers 1, 2, 3. A line should be drawn from 1, to 2, to 3.
     */
    const projection = getProjectionFromSvg(svg);
    const path = d3.geoPath().projection(projection);
    const g = svg.append("g");
    const arcGroup = g.append("g");

    if (vehicles?.length > 0) {
        const lineStrings = createRouteLineStrings(oLat, oLon, demand, vehicles, stops);

        arcGroup.selectAll(".arc")
            .data(lineStrings)
            .join("path")
            .style("fill", "none")
            .style("stroke", '#0000ff')
            .style("stroke-width", "2px")
            .style("opacity", .3)
            .attr("d", path);
    }
}

const drawVrpMap = (svg: any, oLat: any, oLon: any, demand: any, vehicles: any, stops: any, geoJson: any) => {
    /**
     * Handler for drawing the map from property change
     * or states on resize.
     */
    updateSvgSize(svg);
    addUsaMapToSvg(svg, geoJson);

    if (oLat && oLon) {
        drawOrigin(svg, oLat, oLon);
    }
    
    if (demand) {
        drawDemand(svg, demand);
    }

    if (vehicles) {
        drawRoutes(svg, oLat, oLon, demand, vehicles, stops);
    }
}

const VrpBubbleMap = (props) => {
    /**
     * Map component function exported to parent.
     */
    const svgRef = useRef(null),
          usaJson = useUsaJson(),
          [originLat, setOriginLat] = useState(999.),
          [originLon, setOriginLon] = useState(999.),
          [demand, setDemand] = useState(Object),
          [vehicles, setVehicles] = useState([]),
          [stops, setStops] = useState([]);

    useEffect(() => {
        const svg = d3.select(svgRef.current);

        setOriginLat(props.originLat);
        setOriginLon(props.originLon);
        setDemand(props.demand);
        setVehicles(props.vehicles);
        setStops(props.stops);

        if (!usaJson) {
            return;
        } 

        drawVrpMap(svg, props.originLat, props.originLon, props.demand, props.vehicles, props.stops, usaJson);

        window.addEventListener('resize', function() {
            drawVrpMap(svg, originLat, originLon, demand, vehicles, stops, usaJson);
        });
    });

    return (<div 
            id="container" 
            className="svg-container">
                <svg 
                ref={svgRef} 
                height={props.height} 
                width={props.width} />
            </div>);
}
  
export default VrpBubbleMap;

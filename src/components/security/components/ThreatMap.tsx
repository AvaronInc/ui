
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ThreatMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Clear previous SVG if it exists
    const container = d3.select(mapRef.current);
    container.selectAll("*").remove();
    
    // Create SVG
    const width = mapRef.current.clientWidth;
    const height = mapRef.current.clientHeight;
    
    const svg = container
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");
    
    // Define map projection
    const projection = d3.geoMercator()
      .scale((width / 6.3) / Math.PI)
      .translate([width / 2, height / 1.6]);
    
    // Create a path generator
    const path = d3.geoPath().projection(projection);
    
    // Load world map data and threat data
    Promise.all([
      d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'),
    ]).then(([world]) => {
      if (!world) return;
      
      // Draw world map
      const countries = svg.append("g")
        .selectAll("path")
        .data(d3.geoPath()(topojson.feature(world, world.objects.countries) as any))
        .join("path")
        .attr("d", (d: any) => d)
        .attr("fill", "#e2e8f0")
        .attr("stroke", "#cbd5e1")
        .attr("stroke-width", 0.5);
      
      // Sample threat data (locations)
      const threatData = [
        { lon: -74, lat: 40.7, severity: 'high' },     // New York
        { lon: -0.1, lat: 51.5, severity: 'medium' },  // London
        { lon: 116.4, lat: 39.9, severity: 'critical' }, // Beijing
        { lon: 2.3, lat: 48.9, severity: 'low' },      // Paris
        { lon: 151.2, lat: -33.9, severity: 'medium' }, // Sydney
        { lon: 37.6, lat: 55.8, severity: 'high' },     // Moscow
        { lon: 139.7, lat: 35.7, severity: 'low' },     // Tokyo
        { lon: -118.2, lat: 34.1, severity: 'high' },   // Los Angeles
        { lon: 77.2, lat: 28.6, severity: 'medium' },   // Delhi
        { lon: -46.6, lat: -23.5, severity: 'critical' }, // São Paulo
      ];
      
      // Add threats to the map
      svg.selectAll("circle")
        .data(threatData)
        .join("circle")
        .attr("cx", d => projection([d.lon, d.lat])![0])
        .attr("cy", d => projection([d.lon, d.lat])![1])
        .attr("r", d => getSeverityRadius(d.severity))
        .attr("fill", d => getSeverityColor(d.severity))
        .attr("fill-opacity", 0.7)
        .attr("stroke", d => getSeverityColor(d.severity))
        .attr("stroke-width", 1)
        .append("title")
        .text(d => `Threat: ${d.severity.toUpperCase()}`);
      
      // Add pulsating animation to threats
      svg.selectAll("circle")
        .append("animate")
        .attr("attributeName", "r")
        .attr("values", d => `${getSeverityRadius(d.severity)};${getSeverityRadius(d.severity) * 1.3};${getSeverityRadius(d.severity)}`)
        .attr("dur", "2s")
        .attr("repeatCount", "indefinite");
    });
    
    // Add legend for threat severity
    const legend = svg.append("g")
      .attr("transform", `translate(20, ${height - 100})`);
    
    const severities = ['critical', 'high', 'medium', 'low'];
    
    severities.forEach((severity, i) => {
      legend.append("circle")
        .attr("cx", 10)
        .attr("cy", i * 20)
        .attr("r", getSeverityRadius(severity))
        .attr("fill", getSeverityColor(severity));
      
      legend.append("text")
        .attr("x", 25)
        .attr("y", i * 20 + 5)
        .text(severity.charAt(0).toUpperCase() + severity.slice(1))
        .style("font-size", "12px")
        .attr("fill", "#64748b");
    });
    
  }, [mapRef]);
  
  // Helper functions for threat visualization
  const getSeverityRadius = (severity: string): number => {
    switch (severity) {
      case 'critical': return 8;
      case 'high': return 6;
      case 'medium': return 5;
      case 'low': return 4;
      default: return 4;
    }
  };
  
  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'critical': return '#ef4444';
      case 'high': return '#f97316';
      case 'medium': return '#3b82f6';
      case 'low': return '#22c55e';
      default: return '#94a3b8';
    }
  };
  
  return (
    <div className="text-center">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default ThreatMap;

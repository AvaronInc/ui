
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { useIsMobile } from '@/hooks/use-mobile';

// Define proper types for our data
interface ThreatData {
  lon: number;
  lat: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
}

// Define proper types for TopoJSON and GeoJSON
interface GeometryObject {
  type: string;
  coordinates: any[];
  properties?: any;
}

interface TopoFeature {
  type: string;
  id?: string | number;
  properties?: any;
  geometry: GeometryObject;
}

interface TopoJSON {
  type: "Topology";
  objects: {
    [key: string]: {
      type: string;
      geometries?: any[];
    };
  };
  arcs: any[][];
}

// Type for GeoJSON Feature Collection
interface GeoJSONFeatureCollection {
  type: string;
  features: any[];
}

const ThreatMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
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
    
    // Define map projection with improved centering and scaling
    // Adjust scale for mobile
    const scaleFactor = isMobile ? 5.5 : 6.2;
    const centerYOffset = isMobile ? 2.1 : 2.2;
    
    const projection = d3.geoNaturalEarth1()
      .scale(width / scaleFactor)
      .translate([width / 2, height / centerYOffset])
      .center([0, 15]); // Adjust center to better position the map
    
    // Create a path generator
    const path = d3.geoPath().projection(projection);
    
    // Load world map data
    d3.json<any>('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then((world) => {
        if (!world) return;
        
        // Convert topojson to geojson with proper typing
        // First cast to unknown, then to the expected type
        const geojson = topojson.feature(world, world.objects.countries) as unknown as GeoJSONFeatureCollection;
        
        const countries = svg.append("g")
          .selectAll("path")
          .data(geojson.features)
          .join("path")
          .attr("d", path as any)
          .attr("fill", "#e2e8f0")
          .attr("stroke", "#cbd5e1")
          .attr("stroke-width", 0.5);
        
        // Sample threat data (locations)
        const threatData: ThreatData[] = [
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
        
        // Add threats to the map with proper typing
        svg.selectAll("circle")
          .data(threatData)
          .join("circle")
          .attr("cx", d => projection([d.lon, d.lat])![0])
          .attr("cy", d => projection([d.lon, d.lat])![1])
          .attr("r", d => getSeverityRadius(d.severity, isMobile))
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
          .attr("values", (d: ThreatData) => {
            const radius = getSeverityRadius(d.severity, isMobile);
            return `${radius};${radius * 1.3};${radius}`;
          })
          .attr("dur", "2s")
          .attr("repeatCount", "indefinite");
      });
    
    // Add improved legend for threat severity - position in top right corner
    // Adjust legend position for mobile
    const legendX = isMobile ? width - 120 : width - 140;
    const legend = svg.append("g")
      .attr("transform", `translate(${legendX}, 10)`);
    
    const severities: Array<'critical' | 'high' | 'medium' | 'low'> = ['critical', 'high', 'medium', 'low'];
    
    severities.forEach((severity, i) => {
      const color = getSeverityColor(severity);
      const radius = getSeverityRadius(severity, isMobile);
      const yOffset = i * (isMobile ? 18 : 22); // Adjusted spacing for mobile
      
      // Add color circle
      legend.append("circle")
        .attr("cx", 8)
        .attr("cy", yOffset)
        .attr("r", radius)
        .attr("fill", color);
      
      // Add severity label
      legend.append("text")
        .attr("x", 20)
        .attr("y", yOffset + 4) // Better vertical alignment
        .text(severity.charAt(0).toUpperCase() + severity.slice(1))
        .style("font-size", isMobile ? "10px" : "12px")
        .attr("fill", "#64748b");
    });
    
  }, [isMobile]);
  
  // Helper functions for threat visualization
  const getSeverityRadius = (severity: 'critical' | 'high' | 'medium' | 'low', isMobile = false): number => {
    const mobileFactor = isMobile ? 0.8 : 1; // Reduce size on mobile
    
    switch (severity) {
      case 'critical': return 8 * mobileFactor;
      case 'high': return 6 * mobileFactor;
      case 'medium': return 5 * mobileFactor;
      case 'low': return 4 * mobileFactor;
      default: return 4 * mobileFactor;
    }
  };
  
  const getSeverityColor = (severity: 'critical' | 'high' | 'medium' | 'low'): string => {
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
      <div ref={mapRef} className={`w-full ${isMobile ? 'h-[300px]' : 'h-[400px]'} border-0`} />
    </div>
  );
};

export default ThreatMap;

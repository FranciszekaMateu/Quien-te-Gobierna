'use client'
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { politicos, enlaces } from '@/data/mockPoliticos';
import SlidePanel from './SlidePanel';

export default function NetworkGraph() {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedPolitico, setSelectedPolitico] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Función para actualizar dimensiones
  const updateDimensions = () => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.clientWidth,
        height: window.innerHeight * 0.8 // 80vh
      });
    }
  };

  // Efecto para manejar el resize
  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)
      .attr('class', 'bg-white dark:bg-gray-900');

    const simulation = d3.forceSimulation(politicos)
      .force('link', d3.forceLink(enlaces).id(d => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-1000))
      .force('collision', d3.forceCollide().radius(60))
      .force('center', d3.forceCenter(dimensions.width / 2, dimensions.height / 2));

    const link = svg.append('g')
      .selectAll('line')
      .data(enlaces)
      .join('line')
      .attr('class', 'stroke-gray-200 dark:stroke-gray-700')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 1);

    const node = svg.append('g')
      .selectAll('g')
      .data(politicos)
      .join('g')
      .attr('class', 'cursor-pointer')
      .on('mouseenter', function() {
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('r', 27);
        
        d3.select(this).select('clipPath circle')
          .transition()
          .duration(200)
          .attr('r', 30);
        
        d3.select(this).select('image')
          .transition()
          .duration(200)
          .attr('width', 60)
          .attr('height', 60)
          .attr('x', -30)
          .attr('y', -30);
      })
      .on('mouseleave', function() {
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('r', 25);
        
        d3.select(this).select('clipPath circle')
          .transition()
          .duration(200)
          .attr('r', 28);
        
        d3.select(this).select('image')
          .transition()
          .duration(200)
          .attr('width', 56)
          .attr('height', 56)
          .attr('x', -28)
          .attr('y', -28);
      });

    function drag(simulation) {
      let isDragging = false;
      
      function dragstarted(event) {
        isDragging = false;
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        isDragging = true;
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        
        if (!isDragging) {
          setSelectedPolitico(d);
        }
        
        setTimeout(() => {
          event.subject.fx = null;
          event.subject.fy = null;
        }, 100);
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }

    node.call(drag(simulation));

    node.append('circle')
      .attr('r', 25)
      .attr('fill', d => {
        switch(d.partido) {
          case 'Frente Amplio': return '#0066CC';
          case 'Partido Nacional': return '#FFFFFF';
          case 'Partido Colorado': return '#FF0000';
          case 'Cabildo Abierto': return '#000066';
          case 'Partido Independiente': return '#800080';
          default: return '#FFFFFF';
        }
      })
      .attr('class', d => {
        if (d.partido === 'Partido Nacional') {
          return 'stroke-2 stroke-gray-900 dark:stroke-white';
        } else {
          return 'stroke-1 stroke-gray-300 dark:stroke-gray-600';
        }
      });

    node.append('clipPath')
      .attr('id', d => `clip-${d.id}`)
      .append('circle')
      .attr('r', 28);

    node.append('image')
      .attr('xlink:href', d => d.imagen)
      .attr('x', -28)
      .attr('y', -28)
      .attr('width', 56)
      .attr('height', 56)
      .attr('clip-path', d => `url(#clip-${d.id})`);

    node.append('title')
      .text(d => `${d.nombre}\n${d.cargo}`);

    node.append('text')
      .text(d => d.nombre)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .attr('class', 'text-xs font-serif fill-gray-900 dark:fill-gray-100')
      .style('text-shadow', '2px 2px 4px rgba(255,255,255,0.9), -2px -2px 4px rgba(255,255,255,0.9)')
      .style('paint-order', 'stroke');

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [dimensions]);

  return (
    <div ref={containerRef} className="w-full h-[80vh] relative">
      <svg ref={svgRef} className="w-full h-full" />
      <SlidePanel 
        isOpen={selectedPolitico !== null}
        onClose={() => setSelectedPolitico(null)}
        politico={selectedPolitico}
      />
    </div>
  );
} 
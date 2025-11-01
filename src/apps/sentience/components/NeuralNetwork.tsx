import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { Contract } from '../SentienceNetwork'

interface NeuralNetworkProps {
  contracts: Contract[]
  onNodeClick?: (contract: Contract) => void
}

export function NeuralNetwork({ contracts, onNodeClick }: NeuralNetworkProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || contracts.length === 0) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight

    // Create force simulation
    const simulation = d3
      .forceSimulation(contracts as any)
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(50))

    // Create links between contracts
    const links = []
    for (let i = 0; i < contracts.length; i++) {
      if (Math.random() > 0.7 && i < contracts.length - 1) {
        links.push({ source: i, target: i + 1 })
      }
    }

    // Draw links
    const link = svg
      .append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', 'rgba(255, 0, 255, 0.3)')
      .attr('stroke-width', 2)

    // Draw nodes
    const node = svg
      .append('g')
      .selectAll('circle')
      .data(contracts)
      .enter()
      .append('circle')
      .attr('r', (d) => Math.sqrt(d.sentienceScore) / 10 + 10)
      .attr('fill', (d) => {
        const intensity = Math.min(d.sentienceScore / 10000, 1)
        return d3.interpolatePurples(intensity)
      })
      .attr('stroke', '#ff00ff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        if (onNodeClick) {
          onNodeClick(d)
        }
      })

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y)
    })
  }, [contracts, onNodeClick])

  return (
    <svg
      ref={svgRef}
      className="w-full h-full"
      style={{ position: 'absolute', top: 0, left: 0 }}
    />
  )
}


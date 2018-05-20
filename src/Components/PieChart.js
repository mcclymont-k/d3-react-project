import React, { Component } from 'react'
import * as d3 from 'd3'
import '../CSS/PieChart.css'

class PieChart extends Component {

  componentDidMount() {
    this.mainContainer = d3.select(this.refs.dataPieChart)
    let menColor = d3.scaleLinear()
      .domain([20, 70])
      .range([ 'rgb(47, 87, 110)', 'rgb(180, 212, 222)'])
    let womenColor = d3.scaleLinear()
      .domain([20, 70])
      .range(['rgb(178, 27, 194)', 'rgb(255, 155, 252)'])
    let arc =d3.arc().outerRadius(150).innerRadius(100)
    let pie = d3.pie().value(d => d.age).sort(null )(this.props.usersData)
    let background = this.mainContainer.append('rect')
    .attr('width', '400px')
    .attr('height', '400px')
    .style('fill', 'black')
    let infoDiv1 = d3.select('.infoDiv1')
    let infoDiv2 = d3.select('.infoDiv2')
    let g = this.mainContainer.selectAll('.arc')
      .data(pie)
      .enter().append('g')
      .attr('class', 'arc')
      .attr('transform', 'translate(200, 200)')
    g.append('path')
      .attr('d', arc)
      .attr('class', 'path')
      .attr('transform', 'scale(0.1)')
      .style('fill', (d, i) =>
        d.data.gender === 'male'
        ? menColor(d.data.age)
        : womenColor(d.data.age)
      )
      .on('mouseover', (d, i) => {
        let target = d3.select(d3.event.target)
        let targetData = target.data()[0].data
        infoDiv1.transition().style('opacity', 1)
          .text(() => targetData.usersName)
        infoDiv2.transition().style('opacity', 1)
          .style('left','200px')
          .style('top', '240px')
          .text(() => 'Age: ' + targetData.age)
        target.transition().attr('transform', 'scale(1.05)').attr('stroke', 'white')
      })
      .on('mouseout', (d, i) => {
        let target = d3.select(d3.event.target)
        target.transition().attr('transform', 'scale(1)').attr('stroke', '')
        infoDiv1.transition().style('opacity', 0)
        infoDiv2.transition().style('opacity', 0)
      })
    let allPaths = d3.selectAll('path')
      .transition()
      .attr('transform', 'scale(1)')
      .ease(d3.easeExp)
      .duration(500)
  }


  render() {
    return(
      <div className='pieChartContainer'>
        <svg height='400px' width='400px' ref='dataPieChart' className='dataPieChart'></svg>
        <div className='infoDiv1'></div>
        <div className='infoDiv2'></div>
      </div>
    )
  }
}

export default PieChart

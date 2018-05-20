import React, { Component } from 'react'
import * as d3 from 'd3'
import '../CSS/ForceCircles.css'

let simulation = d3.forceSimulation()
  .force('center', d3.forceCenter(400, 300))
  .force('charge', d3.forceManyBody().strength(5))
  .force('collide', d3.forceCollide(10))
  .stop()
let menColor = d3.scaleLinear()
  .domain([20, 80])
  .range([ 'rgb(178, 230, 105)', 'rgb(49, 69, 21)'])
let womenColor = d3.scaleLinear()
  .domain([20, 80])
  .range(['rgb(246, 171, 115)', 'rgb(233, 0, 0)'])


class ForceCircles extends Component {

  state = {
    users: this.props.usersData
  }

  componentDidMount() {
    this.circlesSvg = d3.select(this.refs.forceCircleSvg)
    this.appendCircles()
    simulation.on('tick', this.ticker.bind(this))
    simulation.nodes(this.state.users).alpha(0.9).restart()
  }

  ticker() {
    this.circlesSvg
      .selectAll('circle')
      .attr('cy', d => d.y)
      .attr('cx', d => d.x)
  }

  appendCircles() {
    let circleClicked = false
    this.circlesSvg
      .selectAll('circle').data(this.state.users)
      .enter()
      .append('svg:circle')
      .style('fill', (d, i) =>
        d.gender === 'male'
        ? menColor(d.age)
        : womenColor(d.age)
      )
      .attr('opacity', 0.7)
      .attr('r', 10)
      .on('click', (d, i) => {
        let selectionData = d3.select(d3.event.target).data()
        let target = d3.select(d3.event.target)
        if (d3.select(d3.event.target).attr('r') == 30) {
          d3.select('.infoDiv').style('opacity', 0)
          simulation.force('charge', d3.forceManyBody().strength(10))
            .alpha(1)
            .alphaMin(0.007)
            .restart()
        target.attr('r', 10)
        circleClicked = false
        } else {
          circleClicked
          ? []
          : (
              simulation.force('charge', d3.forceManyBody().strength(-5))
                .alpha(1)
                .alphaMin(0.03)
                .restart(),
              this.circlesSvg
                .selectAll('circle')
                .nodes().forEach( circle =>
                  d3.select(circle)
                    .attr('r', 10)),
              target.attr('r', 30),
              console.log(target.data()),
              document.querySelector('.infoDiv').innerHTML = target.data()[0].usersName + '</br>Age: ' + target.data()[0].age,
              circleClicked = true
            )
          }
          simulation.on('end', () => {
            d3.select('.infoDiv')
              .style('left', `${Number(target.attr('cx')) - 30}px`)
              .style('top', `${Number(target.attr('cy')) - 20}px`)
              .style('opacity', () =>
                circleClicked
                ? 1
                : 0
              )

          })
      })

  }

  render() {
    return(
      <div className='forceCirclesContainer'>
        <svg height='600'width='800' ref='forceCircleSvg' className='forceCircleSvg' />
        <div className='infoDiv'></div>
      </div>
    )
  }
}

export default ForceCircles

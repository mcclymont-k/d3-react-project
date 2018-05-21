import React, { Component } from 'react'
import * as d3 from 'd3'
import '../CSS/Brusher.css'
class Brusher extends Component {
  state = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct',
  'Nov', 'Dec'],
    users: this.props.usersData
  }

  componentDidMount() {
    this.brush=d3.brushX()
    let mainContainer = d3.select(this.refs.brushGraphContainer)
    let textBlue = 'rgb(141, 141, 246)'
    mainContainer.append('line')
      .style('stroke', 'grey')
      .attr('x1', 0)
      .attr('y1', 200)
      .attr('x2', 600)
      .attr('y2', 200)
    // Y axis
    mainContainer.selectAll('text')
      .data(this.state.months)
      .enter().append('text')
        .text( (d, i) => d)
        .style('stroke', textBlue)
        .style('font-size', '8px')
        .attr('width', 50)
        .attr('height', 10)
        .attr('transform', (d, i) => 'translate( 5, ' + (i*17.75+104) + ')')
    // X axis title
    mainContainer.append('text')
      .text('<-- Age -->')
      .style('font-size', '8px')
      .style('stroke', textBlue)
      .attr('transform', 'translate(294.5, 330)')
    // Circle creator
    mainContainer.append('g')
      .attr('class', 'brush')
      .selectAll('circle')
        .data(this.state.users)
        .enter().append('circle')
          .attr('class', 'brushCircle')
          .attr('r', 3)
          .style('fill', 'grey')
          .attr('fill-opacity', 0.5)
          .attr('cx', (d) => (d.age * 6))
          .attr('cy', (d) => ((d.month - 1) * 18.18 + 100))
    this.createBrush()
  }

  createBrush() {
    let brushContainer = d3.select('.brush')
    brushContainer.call(this.brush.extent([[0,94], [600, 306]]))
    this.brush.move(brushContainer, [0,50])
    // Checks the brush and changes color
    this.brush.on('brush', (d) => {
      let brushPosition = d3.select('.selection').attr('x')
      let circlesSelector = document.querySelectorAll('.brushCircle')
      circlesSelector.forEach(circle => {
        let eachCircleX = d3.select(circle).attr('cx')
        eachCircleX > brushPosition && eachCircleX < (Number(brushPosition) + 50)
        ? d3.select(circle).style('fill', 'blue')
        : d3.select(circle).style('fill', 'grey')
      })
    })
    // Checks for brush end and returns highlighted data
    this.brush.on('end', (d) => {
      let circleArray = []
      let brushPosition = d3.select('.selection').attr('x')
      let circlesSelector = document.querySelectorAll('.brushCircle')
      circlesSelector.forEach(circle => {
        let eachCircleX = d3.select(circle).attr('cx')
        if (eachCircleX > brushPosition && eachCircleX < (Number(brushPosition) + 50)) {
          let circleHoverData = d3.select(circle).data()
          circleArray.push(circleHoverData)
        } else {
          d3.select(circle).style('fill', 'grey')
        }
      })
      this.setState({circleArray})
    })
  }

  render() {
    return(
      <div className='mainBrushContainer'>
        <svg height='400px' width="600px" ref='brushGraphContainer' className='brushGraphContainer'></svg>
        <div className='userDataInfoContainer'>
          <div className='userDataInfoBoxes'>
        {
          this.state.circleArray
          ? this.state.circleArray.map((circle, i) =>
            <div className='userDataInfoBox' key={i}>
              <h1>Name: <span className='userInfo'>{circle[0].usersName}</span></h1>
              <h1>Date of birth: <span className='userInfo'>{circle[0].dob}</span></h1>
              <h1>Age: <span className='userInfo'>{circle[0].age} years old</span></h1>
            </div>)
          : []
        }
          </div>
        </div>
      </div>
    )
  }
}

export default Brusher

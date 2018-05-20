import React, { Component } from 'react'
import * as d3 from 'd3'
import '../CSS/Brusher.css'
class Brusher extends Component {
  state = {
  }
  componentDidMount() {
    console.log('started')
    this.brush=d3.brushX()
    let mainContainer = d3.select(this.refs.brushGraphContainer)
    mainContainer.append('line')
      .style('stroke', 'black')
      .attr('x1', 0)
      .attr('y1', 200)
      .attr('x2', 600)
      .attr('y2', 200)

    mainContainer.append('g')
      .attr('class', 'brush')
      .selectAll('circle')
        .data(this.props.ageArray)
        .enter().append('circle')
          .attr('class', 'circle')
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
    this.brush.move(brushContainer, [1,50])
    // Checks the brush and changes color
    this.brush.on('brush', (d) => {
      let brushPosition = d3.select('.selection').attr('x')
      let circlesSelector = document.querySelectorAll('.circle')
      circlesSelector.forEach(circle => {
        let eachCircleX = d3.select(circle).attr('cx')
        eachCircleX > brushPosition && eachCircleX < (Number(brushPosition) + 50)
        ? d3.select(circle).style('fill', 'blue')
        : d3.select(circle).style('fill', 'grey')
      })
    })
    // Checks the brush and refers data to info box
    this.brush.on('end', (d) => {
      let circleArray = []
      let brushPosition = d3.select('.selection').attr('x')
      let circlesSelector = document.querySelectorAll('.circle')
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
          <div className='userDataInfoBoxTitle'>User data of those hovered on the graph</div>
          <div className='userDataInfoBoxes'>
        {
          this.state.circleArray
          ? this.state.circleArray.map((circle) =>
            <div className='userDataInfoBox'>
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

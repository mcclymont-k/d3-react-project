import React, { Component } from 'react'
import PieChart from './PieChart'
import Brusher from './Brusher'
import ForceCircles from './ForceCircles'
import '../CSS/Home.css'
import { animateScroll as scroll, scroller } from 'react-scroll'

class Home extends Component {

  state = {}

  componentDidMount() {
    fetch('https://randomuser.me/api/?results=100')
      .then(result => result.json())
      .then(data => {
        let usersData = []
        let randomUserData = data.results
        // Get age
        randomUserData.forEach(user => {
          let gender = user.gender
          let dob = user.dob.substring(0,10)
          let month = Number(dob.substring(5, 7))
          let age = 2018 - Number(dob.substring(0,4))
        // Checks if they have had a birthday this year
          month < 5 ? age +=1 : ''
          dob = dob.split('-').reverse().join('-')
          let firstName = user.name.first.charAt(0).toUpperCase() + user.name.first.slice(1)
          let lastName = user.name.last.charAt(0).toUpperCase() + user.name.last.slice(1)
          let usersName = firstName + ' ' + lastName
          usersData.push({age, month, usersName, dob, gender})
        })
        this.setState({usersData: usersData})
      })
      .catch(error => console.log(error))
  }

  render() {
    return(
      <div>
        <div className='scrollButtonContainer'>
          <button onClick={() => scroll.scrollTo(0)}>FORCE</button>
          <button onClick={() => scroll.scrollTo(window.innerHeight + 30)}>PIE</button>
          <button onClick={() => scroll.scrollTo((window.innerHeight + 30) * 2)}>BRUSHER</button>
        </div>
        {
          this.state.usersData
          ? <div className='mainContainer'>
              <div className='graphContainer'>
                <div className='graphTitle forceTitle'>FORCE GRAPH</div>
                <div className='graphBlurb forceBlurb'>
                  The force graph shows 100 users illustrated by colored circles.
                  Male users are shown in green and female users as red. Age is
                  represented by depth of color with darker color indicating older
                  age and ligter color indicating younger age. Clicking any circle
                  applies a repulsive force to each circle and demonstrates the
                  targeted user&#39;s name and age once the animation is complete.
                </div>
                <ForceCircles usersData={this.state.usersData}/>
              </div>
              <div className='graphContainer pieContainer'>
                <div className='graphTitle pieTitle'>PIE CHART</div>
                <div className='graphBlurb pieBlurb'>
                  The pie chart is demonstrating each of the 100 users as a slice
                  of the chart. Men are colored blue and women are colored pink.
                  Age is represented by size of pie slice and by depth of color
                  with darker color and larger pie slice indicating older age.
                  Hovering over any slice returns the information about that user
                </div>
                <PieChart usersData={this.state.usersData}/>
              </div>
              <div className='graphContainer'>
                <div className='graphTitle brushTitle'>BRUSHER</div>
                <div className='graphBlurb brushBlurb'>
                  The brusher represents the age and month of birth of each
                  of the 100 users as a circle. The x-axis represents age, and the y-axis
                  represents month of birth. Darker color signifies stacked users
                  indicating that more than one user is born on that particular
                  month and year.<hr/>Use the dragger to highlight the underlying
                  data.
                </div>
                <Brusher usersData={this.state.usersData} />
              </div>
            </div>
          : []
        }
      </div>
    )
  }
}

export default Home

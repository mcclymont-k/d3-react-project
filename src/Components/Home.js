import React, { Component } from 'react'
import PieChart from './PieChart'
import Brusher from './Brusher'
import ForceCircles from './ForceCircles'

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
          month < 5 ? age +=1 : ''
          dob = dob.split('-').reverse().join('-')
          let firstName = user.name.first.charAt(0).toUpperCase() + user.name.first.slice(1)
          let lastName = user.name.last.charAt(0).toUpperCase() + user.name.last.slice(1)
          let usersName = firstName + ' ' + lastName
          usersData.push({age, month, usersName, dob, gender})
        })
        // Get
        this.setState({usersData: usersData})
      })
      .catch(error => console.log(error))


  }

  render() {
    return(
      <div className='mainContainer'>
        {
          this.state.usersData
          ? <div>
              <ForceCircles usersData={this.state.usersData}/>
              <PieChart usersData={this.state.usersData}/>
              <Brusher usersData={this.state.usersData} />
            </div>
          : []
        }
      </div>
    )
  }
}

export default Home

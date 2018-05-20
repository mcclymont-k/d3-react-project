import React, { Component } from 'react'
import PieChart from './PieChart'
import Brusher from './Brusher'

class Home extends Component {

  state = {}

  componentDidMount() {
    fetch('https://randomuser.me/api/?results=100')
      .then(result => result.json())
      .then(data => {
        let userAgeList = []
        let randomUserData = data.results
        // Get age
        randomUserData.forEach(user => {
          let gender = user.gender
          let dob = user.dob.substring(0,10)
          let month = Number(dob.substring(5, 7))
          let age = 2018 - Number(dob.substring(0,4))
          month < 5 ? age +=1 : ''
          dob = dob.split('-').reverse().join('-')
          let usersName = user.name.first + ' ' + user.name.last
          userAgeList.push({age, month, usersName, dob, gender})
        })
        // Get
        this.setState({dobInfoList: userAgeList})

      })
      .catch(error => console.log(error))



  }

  render() {
    return(
      <div className='mainContainer'>
        {
          this.state.dobInfoList
          ? <div>
              <PieChart ageArray={this.state.dobInfoList}/>
              <Brusher ageArray={this.state.dobInfoList} />
            </div>
          : []
        }
      </div>
    )
  }
}

export default Home

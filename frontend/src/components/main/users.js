import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
  <tr>
    <td>{props.exercise._id}</td>
    <td>{props.exercise.Name}</td>
    <td><img src={`data:image/jpeg;base64,${props.exercise.Image.$binary}`} alt='User'/></td>
    <td>
      <Link to={"/update/"+props.exercise._id} className="text-light">Update</Link> | <button onClick={() => { props.deleteExercise(props.exercise._id) }} className="text-light" style={{cursor:'pointer', background:"none", border:"none", textDecoration:"underline"}}>Delete</button>
    </td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {
      exercises: [],
      _id: 1,
      Name: ""
    };
  }

  componentDidMount() {
    axios.get('https://localhost:5000/user')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })

      axios.get('https://localhost:5000/logs')
        .then(res => {
          if (res.data.length !== 0) {
            this.setState({
              _id: Math.max(...res.data.map(res => res._id)) + 1
            })
          }
        })
        .catch((error) => {
          console.log(error);
        })
  }

  deleteExercise(id) {

    axios.get('https://localhost:5000/user/'+id)
      .then(response => {
        this.setState({
          Name: response.data.Name
        })
    
        const log = new FormData()
        log.append('_id', this.state._id)
        log.append('Name', this.state.Name)
    
        axios.post('https://localhost:5000/logs', log)
          .then(res => console.log(res.data));
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.delete('https://localhost:5000/user/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Users List</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}
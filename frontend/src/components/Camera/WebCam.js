import React, { Component } from 'react';
import axios from 'axios';
import CameraFeed from './CameraFeed';
import '../Custom.css';

export default class WebCam extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: 1,
      _id1: 1,
      Name: '',
      Image: '',
    }
  }

  componentDidMount() {

    axios.get('https://localhost:5000/user')
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            _id: Math.max(...res.data.map(res => res._id)) + 1
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

      axios.get('https://localhost:5000/logs')
        .then(res => {
          if (res.data.length > 0) {
            this.setState({
              _id1: Math.max(...res.data.map(res => res._id)) + 1
            })
          }
        })
        .catch((error) => {
          console.log(error);
        })

}

  onChangeName(e) {
    this.setState({
      Name: e.target.value
    })
  }

  uploadImage(img) {
    this.setState({
      Image: img
    })
  }

  onSubmit(e) {
    
    const user = new FormData()
    user.append('_id', this.state._id)
    user.append('_id1', this.state._id1)
    user.append('Name', this.state.Name)
    user.append('Image', this.state.Image)

    console.log(user);

    axios.post('https://localhost:5000/user', user)
      .then(res => console.log(res.data));

      alert('New User is successfully added')
      e.preventDefault();
      window.location = '/add';
    
  }

  render() {
    return (
    <div className="App">
      <h3>Add User</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.Name}
              onChange={this.onChangeName}
              />
        </div>
        
        <div className="form-group">
          <label>Capture Image: </label>
            <CameraFeed sendFile={this.uploadImage} />
        </div>

        <div className="form-group">
          <input className="btn navbar-gradient navlink-custom" type="submit" value="Add User" />
        </div>
      </form>
    </div>
    )
  }
}
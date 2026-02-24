import axios from 'axios';
import React, { Component } from 'react';
import { LazyLog, ScrollFollow } from 'react-lazylog';

export default class Logs extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        Logs: "Welcome to Log Management\n",
      }
    }

    componentDidMount() {
      axios.get('https://localhost:5000/logs')
        .then(response => {
            for (var i=0; i< response.data.length; i++)
            {
              this.setState({
                Logs: this.state.Logs + response.data[i].Log + '\n'
              })
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }

    render () {
    return(
      <div className="main__container">
        <div style={{ height: 500, width: 902 }}>
            <h5>Logs:</h5>
            <ScrollFollow
                startFollowing
                render={({ onScroll, follow, startFollowing, stopFollowing }) => (
                <LazyLog extraLines={1}
                        enableSearch
                        caseInsensitive
                        text={this.state.Logs}
                        stream onScroll={onScroll} 
                        follow={follow} />
                )}
            />
        </div>
        </div>
    )}
}
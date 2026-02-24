import "./Main.css";
// import axios from 'axios';
import React, { Component } from 'react';
import Users from './users';
// import NewsTicker from 'react-advanced-news-ticker';
// import { LazyLog, ScrollFollow } from 'react-lazylog';

export default class Main extends Component {
    // constructor(props) {
    //   super(props);
  
    //   this.state = {
    //     users: [],
    //     // Logs: "Welcome to Log Management\n",
    //   }
    // }

    // componentDidMount() {
    //   axios.get('https://localhost:5000/user')
    //     .then(response => {
    //         this.setState({
    //           users : response.data
    //         })
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    // }

    render () {
    return(
        <main>
            <h1>Welcome to Dashboard</h1>
            <Users/>
                {/* <div className="main__container">
                            <div className="main__title">
                                <div className="main__greeting">
                                    <h1>Dashboard</h1>
                                </div>
                                <div className="main__greeting">
                                    <div className="hwrap">
                                        <div className="hmove">
                                            <div className="hitem">Our vision is to {this.state.Vision}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                    <div className="main__cards  text-center">

                        <div className="card">
                            <Link to="/hrmanagement" className="font-bold text-title">
                                <i className="fa fa-users fa-5x"></i>
                                <div className="card__inner">
                                    <span>
                                        HR Management
                                    </span>
                                </div>
                            </Link>
                        </div>

                        <div className="card">
                            <Link to="/assetmanagement" className="font-bold text-title">
                                <i className="fa fa-sitemap fa-5x"></i>
                                <div className="card__inner">
                                    <span>
                                        Asset Management
                                    </span>
                                </div>
                            </Link>
                        </div>

                        <div className="card">
                            <Link to="/processmanagement" className="font-bold text-title">
                                <i className="fa fa-recycle fa-5x"></i>
                                <div className="card__inner">
                                    <span>
                                        Process Management
                                    </span>
                                </div>
                            </Link>
                        </div>

                        <div className="card">
                            <Link to="/objectivemanagement" className="font-bold text-title">
                                <i className="fa fa-calendar-check-o fa-5x"></i>
                                <div className="card__inner">
                                    <span>
                                        Objective Management
                                    </span>
                                </div>
                            </Link>
                        </div>
                        
                    </div>
                </div> */}

        </main>
    )}
}
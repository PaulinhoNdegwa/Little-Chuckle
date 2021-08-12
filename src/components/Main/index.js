import axios from 'axios';
import React, { Component, Fragment } from 'react';
// import data from '../../assets/mockData/data';
import Joke from '../Joke';

class Main extends Component {
    state = {
        loading: false,
        data: [],
        selectedIndex: Math.floor(Math.random() * 10)
    }

    componentDidMount() {
        this.fetchJokes();
        // this.setState({ data: data });
    }

    fetchJokes = () => {
        axios.get("https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky,Christmas?type=single&amount=10")
            .then(response => {
                console.log(response.data)
                this.setState({ data: response.data.jokes })
            })
            .catch(error => {
                console.log("Error fetching some jokes. Try again later")
                console.log(error)
            })
    }

    mapJokes = jokes => {
        const { selectedIndex } = this.state;
        return jokes.map((joke, index) => {
            return <Joke key={joke.id} joke={joke} selectedIndex={selectedIndex} index={index} />
        });
    }

    render() {
        const { data } = this.state;
        return (
            <Fragment>
                <button className="ml-4 py-1 px-2 font-semibold rounded-md text-sm text-center bg-indigo-500 w-24" onClick={() => this.fetchJokes()}>Refresh</button>
                <div className="flex flex-col mb-3 sm:flex-row sm:flex-wrap sm:justify-center w-full mx-auto">
                    {this.mapJokes(data)}
                </div>
            </Fragment>
        );
    }
}

export default Main;

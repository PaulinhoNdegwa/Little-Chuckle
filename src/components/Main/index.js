import axios from 'axios';
import React, { Component, Fragment } from 'react';
// import { data, twoPartData } from '../../assets/mockData/data';
import Joke from '../Joke';
import Loader from '../Loader';

class Main extends Component {
    state = {
        loading: false,
        error: false,
        errorMessage: "Error fetching some jokes. Try again later",
        data: [],
        selectedIndex: Math.floor(Math.random() * 10)
    }

    componentDidMount() {
        this.fetchJokes();
        // this.setState({ data: twoPartData });
    }

    fetchJokes = () => {
        this.setState({ loading: true });
        axios.get("https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky,Christmas?amount=10")
            .then(response => {
                this.setState({ data: response.data.jokes, loading: false });

            })
            .catch(error => {
                console.log("Error fetching some jokes. Try again later")
                this.setState({ loading: false, error: true, errorMessage: error.message });
            })
    }

    mapJokes = jokes => {
        const { selectedIndex } = this.state;
        return jokes.map((joke, index) => {
            return <Joke key={joke.id} joke={joke} selectedIndex={selectedIndex} index={index} />
        });
    }

    render() {
        const { loading, data, error, errorMessage } = this.state;
        return (
            <Fragment>
                <button className="ml-4 sm:ml-40 my-1 text-white py-1.5 px-2 font-semibold rounded-md text-sm text-center bg-indigo-500 w-24" onClick={() => this.fetchJokes()}>Refresh</button>
                <div className="flex flex-col mb-3 sm:flex-row sm:flex-wrap sm:justify-center w-full mx-auto">
                    {
                        loading ? (
                            <Loader />
                        ) : (
                            error ? (
                                <div className="flex-1 h-80">
                                    <div className="bg-red-100 border-red-400 text-red-700 px-4 py-2 rounded relative my-5 mx-2" role="alert">
                                    <strong className="font-bold">Alert! </strong>
                                    <span className="block sm:inline">{errorMessage}</span>
                                </div>
                                </div>
                            ) : (
                                this.mapJokes(data)
                            )
                        )
                    }
                </div>
            </Fragment>
        );
    }
}

export default Main;

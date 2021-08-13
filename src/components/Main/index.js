import axios from 'axios';
import React, { Component, Fragment } from 'react';
import FilterJokes from '../FilterForm';
// import { twoPartData } from '../../assets/mockData/data';
import Joke from '../Joke';
import Loader from '../Loader';

class Main extends Component {
    state = {
        loading: false,
        error: false,
        errorMessage: "Error fetching some jokes. Try again later",
        data: [],
        hideFilters: true,
        searchWord: "",
        categories: [],
        flags: []
    }

    componentDidMount() {
        this.fetchJokes();
        // this.setState({ data: twoPartData });
    }

    handleSearchWordChange = e => this.setState({ searchWord: e.target.value });

    handleCategoryCheckbox = e => {
        const { categories } = this.state;
        if(categories.indexOf(e.target.value) === -1) {
            this.setState({ categories: [...this.state.categories, e.target.value] })
        } else {
            const cats = categories.filter((cat, index) => {
                return categories.indexOf(e.target.value) !== index
            });
            this.setState({ categories: cats})
        }
    }

    handleFlagsCheckbox = e => {
        const { flags } = this.state;
        if(flags.indexOf(e.target.value) === -1) {
            this.setState({ flags: [...this.state.flags, e.target.value] })
        } else {
            const fls = flags.filter((flag, index) => {
                return flags.indexOf(e.target.value) !== index
            });
            this.setState({ flags: fls})
        }
    }


    fetchJokes = () => {
        this.setState({ loading: true, error: false, errorMessage: "" });
        const { categories, flags, searchWord } = this.state;
        const categoryString = categories.join()

        const flagString = flags.join()

        let url = "https://v2.jokeapi.dev/joke/";
        if (categoryString) {
            url = `${url}${categoryString}`
        } else {
            url = `${url}Any`
        }

        if(flagString){
            url = `${url}?blacklistFlags=${flagString}`
        }
        if(searchWord){
            url = `${url}${flagString !=="" ? "&" : "?"}contains=${searchWord}`
        }

        url = `${url}${ (flagString !=="" || searchWord !== "")? `&` : `?`}amount=10`
        // return;

        axios.get(url)
            .then(response => {
                if(response.data.error === true) this.setState({ error: true, errorMessage: response.data.causedBy[0] });

                this.setState({ data: response.data.jokes, loading: false, hideFilters: true });

            })
            .catch(error => {
                console.log("Error fetching some jokes. Try again later")
                this.setState({ loading: false, error: true, errorMessage: error.message, hideFilters: true });
            })
    }

    mapJokes = jokes => {
        return jokes.map((joke, index) => {
            return <Joke key={index} joke={joke} />
        });
    }

    render() {
        const { loading, data, error, errorMessage, hideFilters, searchWord } = this.state;
        return (
            <Fragment>
                <button className={`ml-4 sm:ml-40 my-1 py-1.5 px-2 font-semibold border-2 border-gray-500 rounded-md text-sm text-center w-28  ${hideFilters ? ` text-gray-200 bg-black` : `bg-gray-200 text-black `} `}
                    onClick={() => this.setState({ hideFilters: !hideFilters })}>
                    {hideFilters ? "Show Filters" : "Hide Filters"}
                </button>
                <hr />
                <FilterJokes
                    hideFilters={hideFilters}
                    handleCategoryCheckbox={this.handleCategoryCheckbox}
                    handleFlagsCheckbox={this.handleFlagsCheckbox}
                    fetchJokes={this.fetchJokes}
                    searchWord={searchWord}
                    handleSearchWordChange={this.handleSearchWordChange}
                />
                <hr />
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

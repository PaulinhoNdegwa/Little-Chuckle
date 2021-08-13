import React, { Component } from 'react';

class FilterJokes extends Component {
    render() {
        const { handleCategoryCheckbox, handleFlagsCheckbox, handleSearchWordChange, fetchJokes, searchWord, hideFilters } = this.props;

        const categories = ["Programming", "Dark", "Pun", "Spooky"];
        const flags = ["nsfw", "religious", "political", "racist", "sexist", "explicit"];


        const mapCategories = categories => {
            return categories.map(category => {
                return (
                    <div key={category} className="mx-2">
                        <input className="h-4 w-4 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-600" onChange={handleCategoryCheckbox} type="checkbox" id={category} name={category} value={category} />
                        <label className="ml-1 mt-1 text-sm font-normal" htmlFor={category}>{category}</label>
                    </div>
                );
            })
        }

        const mapFlags = flags => {
            return flags.map(flag => {
                return (
                    <div key={flag} className="mx-2">
                        <input className="h-4 w-4 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-600" onChange={handleFlagsCheckbox} type="checkbox" id={flag} name={flag} value={flag} />
                        <label className="ml-1 mt-1 text-sm font-normal capitalize" htmlFor={flag}>{flag}</label>
                    </div>
                );
            })
        }

        return (
            <form autoComplete="off" className={`${hideFilters ? `hidden` : ``} flex flex-col px-2 bg-gray-200 py-3 my-2 max-w-7xl mx-1 sm:mx-auto sm:flex-row sm:flex-wrap sm:justify-evenly`}>
                <div className="my-1">
                    <label className="ml-1 mt-1 text-sm font-normal" htmlFor="word">Enter Search Words</label>
                    <input autoComplete="off" onChange={handleSearchWordChange} value={searchWord} className="block h-8 w-full sm:w-full md:w-2/3 lg:w-60 py-1 border-b-1 border-gray-500 text-sm rounded-lg focus:border-lg focus:border-indigo-500" type="text" name="word" id="word" placeholder="Search for a joke" />
                </div>
                <div className="my-1">
                    <label className="block text-sm text-md text-black font-semibold py-1" htmlFor="lang">Select Prefered Categories</label>
                    <div className="flex flex-wrap font-medium">
                        {mapCategories(categories)}
                    </div>
                </div>
                <div className="my-1">
                    <label className="block text-sm text-md text-black font-semibold py-1" htmlFor="lang">Select Flags to Blacklist</label>
                    <div className="flex flex-wrap font-medium">
                        {mapFlags(flags)}
                    </div>
                </div>
                <div className="items-center">
                    <button 
                        className="bg-indigo-500 py-1.5 w-full sm:w-40 sm:h-9 sm:mt-5 sm:px-4 text-white font-semibold rounded-md hover:bg-indigo-700"
                        onClick={fetchJokes}
                        type="button"
                    >Search</button>
                </div>
            </form>
        );
    }
}

export default FilterJokes;

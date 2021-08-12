const Joke = props => {
    const { joke, selectedIndex, index} = props;

    const mapFlags = flags => {
        const keys = Object.keys(flags);
        const values = Object.values(flags);
        return keys.map((flag, index) => {
            return (
                values[index] ? <span key={index} className="italic font-light">{flag}, </span> : ""
            )

        })
    }
    console.log(Object.keys(joke.flags).length)
    return (
        <div className={` ${selectedIndex === index ? `bg-indigo-100 border-gray-400 transform transition hover:-rotate-6` : `` }py-4 px-3 m-2 sm:m-1 sm:w-64 md:w-80 border-2 border-gray-200 rounded-sm py-2 px-4 hover:bg-gray-100 hover:border-gray-400`}>
            <p className="my-2 font-mono antialiased font-bold">{joke.joke}</p>
            <p className="my-2 font-semibold text-indigo-500">Category: {joke.category}</p>
            {
                (Object.keys(joke.flags).length) > 0 ? (
                    <p className="my-2 font-medium text-gray-500">Flags: {mapFlags(joke.flags)}</p>
                ) : null
            }

            {
                joke.safe
                    ?
                    <p className="py-1/2 rounded-sm text-sm text-center font-semibold px-2 border-2 border-green-400 bg-green-300 w-16">Safe</p>
                    :
                    <p className="py-1/2 rounded-sm text-sm text-center font-semibold px-2 border-2 border-red-400 bg-red-300 w-16">NSFW</p>
            }
            {/* {selectedIndex == index ? <span className="text-gray-800 pt-4 bg-red-200">Joke of the day</span> : null} */}
        </div>
    );
}

export default Joke;
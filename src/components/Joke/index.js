const Joke = props => {
    const { joke } = props;

    const mapFlags = flags => {
        const keys = Object.keys(flags);
        const values = Object.values(flags);
        return keys.map((flag, index) => {
            return (
                values[index] ? <span key={index} className="italic font-medium text-sm py-1 px-1.5 bg-gray-300 text-black rounded-md mx-1">{flag}</span> : ""
            )

        })
    }
    return (
        <div className={`border-2 ${joke.safe ? `border-gray-900` : `border-red-400 transform transition hover:-rotate-2`} hover:bg-gray-100 hover:border-gray-400 py-4 px-3 m-2 sm:m-1 sm:w-64 md:w-80 rounded-sm py-2 px-4`}>
            <p className="my-2 font-semibold text-indigo-500">{joke.category}</p>

            {
                joke.type === "twopart" ? (
                    <div>
                        <p className="my-2 font-mono antialiased font-bold break-words ">{joke.setup}</p>
                        <p className="my-2 font-mono antialiased font-bold mt-7 break-words ">{joke.delivery}</p>

                    </div>
                ) : (
                    <p className="my-2 font-mono antialiased font-bold break-words ">{joke.joke}</p>
                )
            }
            <p className="my-3 font-medium text-gray-500">{mapFlags(joke.flags)}</p>

            {
                joke.safe
                    ?
                    <p className="py-1/2 mt-2 rounded-md text-sm text-center font-semibold px-2 border-2 border-green-400 bg-green-300 w-16">Safe</p>
                    :
                    <p className="py-1/2 mt-2 rounded-md text-sm text-center font-semibold px-2 border-2 border-red-400 bg-red-300 w-16">NSFW</p>
            }
            {/* {selectedIndex == index ? <span className="text-gray-800 pt-4 bg-red-200">Joke of the day</span> : null} */}
        </div>
    );
}

export default Joke;
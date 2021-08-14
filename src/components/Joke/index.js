import { toPng } from 'html-to-image';
import { FaDownload } from 'react-icons/fa';
import download from 'downloadjs';
import { Fragment } from 'react';
const Joke = props => {
    const { joke } = props;

    const handleDownload = (id) => {
        const node = document.getElementById(id)
        toPng(node, { backgroundColor: "white", cacheBust: true, })
            .then(function (dataUrl) {
                var img = new Image();
                img.src = dataUrl;
                download(dataUrl, `little-chuckle-${Date.now()}.png`);
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    }

    const mapFlags = flags => {
        const keys = Object.keys(flags);
        const values = Object.values(flags);
        return keys.map((flag, index) => {
            return (
                values[index] && index <= 4 ? <span key={index} className="italic font-medium text-sm py-1 px-1.5 bg-gray-300 text-black rounded-md mx-1">{flag}</span> : ""
            )

        })
    }
    return (
        <Fragment>
            <div className={`border-2 ${joke.safe ? `border-gray-400 hover:border-gray-900` : `border-red-400 hover:border-red-600 transform transition hover:-rotate-1`} sm:hover:bg-indigo-100  m-2 sm:m-1 sm:w-64 md:w-80 rounded-sm py-4 px-4`}>
                <p className="my-2 font-semibold text-indigo-500">{joke.category}</p>
                <div id={joke.id} className="py-4 px-5" >
                    {
                        joke.type === "twopart" ? (
                            <div>
                                <p className="font-mono antialiased font-bold break-words ">{joke.setup}</p>
                                <p className="font-mono antialiased font-bold mt-7 break-words ">{joke.delivery}</p>

                            </div>
                        ) : (
                            <p className="font-mono antialiased font-bold break-words ">{joke.joke}</p>
                        )
                    }
                </div>

                <div className="flex flex-wrap justify-between mb-3">
                    <p className="mt-4 font-medium text-gray-500 break-words">{mapFlags(joke.flags)}</p>

                    {/* {
                    joke.safe
                        ?
                        <p className="py-1/2 mt-4  mx-auto rounded-md text-sm text-center font-semibold px-2 border-2 border-green-400 bg-green-300 w-16">Safe</p>
                        :
                        <p className="py-1/2 mt-4 mx-auto rounded-md text-sm text-center font-semibold px-2 border-2 border-red-400 bg-red-300 w-16">NSFW</p>
                } */}
                    <button className="py-1/2 mt-4 mr-4 rounded-md text-sm text-center font-semibold px-2 border-2 border-indigo-400 bg-whi-300 w-20 focus:bg-indigo-500 focus:text-white" onClick={() => handleDownload(joke.id)}>
                        Save
                        <FaDownload className="inline text-xs ml-1" />
                    </button>
                </div>

            </div>
        </Fragment>
    );
}

export default Joke;
import React from "react";
import Navbar from "./Navbar";

const Invest = () => {
    return(
        <>
        <Navbar/>
        <section className="relative py-0 bg-white tails-selected-element">
            <div className="flex grid-col-2 items-center mx-auto max-w-7xl xl:px-5 lg:flex-row">
                <div className="flex items-center gap-16 w-full px-10 pt-5 pb-20 lg:pt-20 lg:flex-row 2xl:flex-row">
                    <div className="relative z-10 w-full max-w-2xl mt-20 lg:mt-0 lg:w-5/12">
                        <h4 className="w-full font-serif text-4xl font-bold leading-snug lg:font-sans lg:text-4xl">Let's convert your funds!</h4>

                        <div className="mt-10 relative z-10 flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl 2xl:static 2xl:mx-0">
                            <div className="relative w-full ">
                                <div className="mt-2 relative">
                                    <label className="justify-left font-bold text-green-500">I want to convert</label>
                                    <input type="text" className="block w-full px-4 py-4 mt-2 text-xl placeholder-grey bg-white border border-black rounded-lg focus:outline-none focus:ring-4 focus:ring-green-600 focus:ring-opacity-50" data-primary="blue-600" data-rounded="rounded-lg" placeholder="The minimum amount is $10"></input>
                                </div>
                                
                                <div className="mt-2 relative">
                                    <label className="font-bold text-green-500">Over the course of</label>
                                    <input type="text" className="block w-full px-4 py-4 mt-2 text-xl placeholder-grey bg-white border border-black rounded-lg focus:outline-none focus:ring-4 focus:ring-green-600 focus:ring-opacity-50" data-primary="blue-600" data-rounded="rounded-lg" placeholder="1 month (minimum)"></input>
                                </div>
                                
                                <div className="mt-2 relative">
                                    <label className="font-bold text-green-500">Recurring DCA should occur:</label>
                                    <input type="text" className="block w-full px-4 py-4 mt-2 text-xl placeholder-grey bg-white border border-black rounded-lg focus:outline-none focus:ring-4 focus:ring-green-600 focus:ring-opacity-50" data-primary="blue-600" data-rounded="rounded-lg" placeholder="Daily, Weekly or Monthly!"></input>
                                </div>
                                
                                <div className="mt-2 relative">
                                    <label className="font-bold text-green-500">Amount to give:</label>
                                    <input type="text" className="block w-full px-4 py-4 mt-2 text-xl placeholder-grey bg-white border border-black rounded-lg focus:outline-none focus:ring-4 focus:ring-green-600 focus:ring-opacity-50" data-primary="blue-600" data-rounded="rounded-lg" placeholder="2%"></input>
                                </div>
                                
                                <div className="mt-2 relative">
                                    <label className="font-bold text-green-500">I want my profits to support:</label>
                                    <input type="text" className="block w-full px-4 py-4 mt-2 text-xl placeholder-grey bg-white border border-black rounded-lg focus:outline-none focus:ring-4 focus:ring-green-600 focus:ring-opacity-50" data-primary="blue-600" data-rounded="rounded-lg" placeholder="3 different projects here"></input>
                                </div>
                            </div>
                        </div>
                    </div>

        <div className="px-20 relative flex flex-col items-start justify-start p-10 bg-black shadow-2xl rounded-xl 2xl:static 2xl:mx-0">
                            <h4 className="w-full font-serif text-4xl font-medium leading-snug"></h4><h4 className="w-full font-serif text-4xl font-bold text-green-400 leading-snug lg:font-sans lg:text-4xl">Choose your conversion: </h4>
                            <div className="relative w-full mt-6 space-y-8">
                            
                                <htmlForm className="grid max-w-3xl gap-4 mx-auto sm:grid-cols-2">
                                    <div className="">
                                        <label htmlFor="pay" className="inline-block mb-2 text-sm font-medium text-green-300 sm:text-base">Pay In: </label>
                                        <input type="text" className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-black border border-green-300 rounded-md focus:outline-none focus:border-black" data-rounded="rounded-lg" placeholder="Daily, Weekly or Monthly"></input>
                                    </div>
                                    <div className="">
                                        <label htmlFor="select-token" className="inline-block mb-2 text-sm font-medium text-green-400 sm:text-base">Amount:</label>
                                        <input type="text" className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-black border border-green-300 rounded-md focus:outline-none focus:border-black" data-rounded="rounded-lg" placeholder="Enter Amount!!"></input>
                                    </div>
                                    <div className="">
                                        <label htmlFor="pay" className="inline-block mb-2 text-sm font-medium text-green-300 sm:text-base">Pay In: </label>
                                        <input type="text" className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-black border border-green-300 rounded-md focus:outline-none focus:border-black" data-rounded="rounded-lg" placeholder="Daily, Weekly or Monthly"></input>
                                    </div>
                                    <div className="">
                                        <label htmlFor="select-token" className="inline-block mb-2 text-sm font-medium text-green-400 sm:text-base">Amount:</label>
                                        <input type="text" className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-black border border-green-300 rounded-md focus:outline-none focus:border-black" data-rounded="rounded-lg" placeholder="Enter Amount!!"></input>
                                    </div>
                            </htmlForm>
                            <div className="relative">
                                    <a href="#_" className="inline-block w-full px-5 py-4 text-xl border-black-2 font-medium text-center text-black transition duration-200 bg-green-300 rounded-lg hover:bg-green-400 ease" data-primary="green-400" data-rounded="rounded-lg">Start Investing</a>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            

        </section>
        </>
    );
}

export default Invest; 
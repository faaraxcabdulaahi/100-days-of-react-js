import React from 'react'

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200 p-4">
          <h1 className="text-6xl font-bold text-blue-800 mb-4 text-center">Welcome to MyApp</h1>
          <p className="text-xl text-blue-700 mb-8 max-w-2xl">
            MyApp is your go-to platform for managing tasks, tracking progress, and collaborating with your team. Whether you're a freelancer or part of a large organization, MyApp has the tools you need to stay organized and productive.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
            Get Started
          </button>
        </div>
      );
}

export default Home

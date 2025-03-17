import React from 'react'

const About = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-100 to-green-200 p-4">
          <h1 className="text-6xl font-bold text-green-800 mb-8">About Us</h1>
          <p className="text-xl text-green-700 text-center max-w-2xl mb-12">
            At MyApp, we are passionate about helping individuals and teams achieve their goals. Our mission is to provide intuitive and powerful tools that simplify task management and enhance productivity. Founded in 2023, we are committed to delivering exceptional user experiences and continuous innovation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold text-green-800 mb-2">John Doe</h2>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold text-green-800 mb-2">Jane Smith</h2>
              <p className="text-gray-600">Lead Developer</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold text-green-800 mb-2">Mike Johnson</h2>
              <p className="text-gray-600">UI/UX Designer</p>
            </div>
          </div>
        </div>
      );
}

export default About

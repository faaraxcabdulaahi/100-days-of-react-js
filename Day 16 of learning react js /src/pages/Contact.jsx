import React from 'react'
import ContactForm from '../components/ContactForm';

const Contact = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-100 to-purple-200 p-4">
          <h1 className="text-6xl font-bold text-purple-800 mb-8">Contact Us</h1>
          <p className="text-xl text-purple-700 text-center max-w-2xl mb-12">
            Have questions or feedback? We'd love to hear from you! Fill out the form below, and we'll get back to you as soon as possible.
          </p>
          <ContactForm/>
        </div>
      );
}

export default Contact

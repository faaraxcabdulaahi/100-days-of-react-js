import { useState } from "react";

const initialData = {
  name: "",
  email: "",
  message: "",
};

const ContactForm = () => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Thank you, ${formData.name}! Your message has been sent.`);
    setFormData({ name: "", email: "", message: "" });
  };

  const { name, email, message } = formData;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg bg-gradient-to-r from-purple-50 to-purple-100 p-8 rounded-lg shadow-lg"
    >
      <div className="mb-6">
        <label htmlFor="name" className="block text-purple-800 font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-300"
          placeholder="Enter your name"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="block text-purple-800 font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-300"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="message"
          className="block text-purple-800 font-bold mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-300"
          rows="5"
          placeholder="Enter your message"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-300"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
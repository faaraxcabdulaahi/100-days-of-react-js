import { useState } from "react";

const initialData = {
  username: "",
  email: "",
  password: "",
  role: "user",
  agreeTerms: false,
  agreeTerms2: false,
};

const Form = () => {
  const [formData, setFormData] = useState(initialData);
  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});
  const [darkMode, setDarkMode] = useState(true); // Default Dark Mode
  const [showSecondAgreement, setShowSecondAgreement] = useState(false); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8)
      errors.push("Password must be at least 8 characters long.");
    if (!/[A-Z]/.test(password))
      errors.push("Password must contain at least one uppercase letter.");
    if (!/[a-z]/.test(password))
      errors.push("Password must contain at least one lowercase letter.");
    if (!/[0-9]/.test(password))
      errors.push("Password must contain at least one number.");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      errors.push("Password must contain at least one special character.");
    return errors;
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.password) newErrors.password = "Password is required";
    else {
      const passwordErrors = validatePassword(formData.password);
      if (passwordErrors.length > 0) {
        newErrors.password = passwordErrors.join(" ");
      }
    }
    if (!formData.agreeTerms)
      newErrors.agreeTerms = "You must agree to the terms";
    setErrors(newErrors);

    // Show second agreement if there are errors
    if (!Object.keys(newErrors).length > 0) {
      setShowSecondAgreement(false);
    } else {
      setShowSecondAgreement(true);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      if (showSecondAgreement && !formData.agreeTerms2) {
        setErrors({
          ...errors,
          agreeTerms2: "You must agree to the second terms",
        });
        return;
      }
      setSubmittedData(formData);
      setFormData(initialData); // Reset form after submission
      setShowSecondAgreement(false); // Hide second agreement after successful submission
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
    setIsDropdownOpen(false);
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } min-h-screen flex justify-center items-center p-5 transition-colors duration-300`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-xl shadow-2xl border ${
          darkMode
            ? "border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900"
            : "border-gray-200 bg-gradient-to-br from-white to-gray-100"
        } transition-all duration-300 hover:shadow-3xl`}
      >
        <button
          onClick={toggleTheme}
          className="mb-6 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold transition-colors duration-200"
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
        <h2 className="text-2xl font-bold text-center mb-6">
          User Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                darkMode ? "border-gray-600" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent transition-all duration-200`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-2">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                darkMode ? "border-gray-600" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent transition-all duration-200`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                darkMode ? "border-gray-600" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent transition-all duration-200`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-2">Role:</label>
            <div
              onClick={toggleDropdown}
              className={`w-full px-4 py-3 rounded-lg border ${
                darkMode ? "border-gray-600" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent transition-all duration-200 cursor-pointer flex justify-between items-center`}
            >
              <span>{formData.role}</span>
              <svg
                className={`size-5 transition-transform duration-200 ${
                  isDropdownOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {isDropdownOpen && (
              <div
                className={`absolute w-full mt-2 rounded-lg shadow-lg ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } z-10`}
              >
                <div
                  onClick={() => handleRoleChange("user")}
                  className={`px-4 py-3 hover:bg-blue-500 hover:text-white cursor-pointer ${
                    darkMode ? "text-white" : "text-gray-900"
                  } ${
                    formData.role === "user" ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  User
                </div>
                <div
                  onClick={() => handleRoleChange("admin")}
                  className={`px-4 py-3 hover:bg-blue-500 hover:text-white cursor-pointer ${
                    darkMode ? "text-white" : "text-gray-900"
                  } ${
                    formData.role === "admin" ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  Admin
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className={`mr-3 w-5 h-5 rounded border ${
                  darkMode ? "border-gray-600" : "border-gray-300"
                } focus:ring-blue-500`}
              />
              <span className="text-sm">
                I agree to the terms and conditions
              </span>
            </label>
            {errors.agreeTerms && (
              <p className="text-red-500 text-sm mt-2">{errors.agreeTerms}</p>
            )}
          </div>

          {showSecondAgreement && (
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="agreeTerms2"
                  checked={formData.agreeTerms2}
                  onChange={handleChange}
                  className={`mr-3 w-5 h-5 rounded border ${
                    darkMode ? "border-gray-600" : "border-gray-300"
                  } focus:ring-blue-500`}
                />
                <span className="text-sm">
                  I agree to the additional terms (required if form was
                  incomplete)
                </span>
              </label>
              {errors.agreeTerms2 && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.agreeTerms2}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-200"
          >
            Submit
          </button>
        </form>

        {submittedData && (
          <div
            className={`mt-6 p-6 border ${
              darkMode
                ? "border-gray-700 bg-gray-800"
                : "border-gray-200 bg-gray-50"
            } rounded-lg`}
          >
            <h3 className="text-xl font-semibold mb-4">Submitted Data:</h3>
            <p>
              <strong>Username:</strong> {submittedData.username}
            </p>
            <p>
              <strong>Email:</strong> {submittedData.email}
            </p>
            <p>
              <strong>Role:</strong> {submittedData.role}
            </p>
            <p>
              <strong>Agreed to Terms:</strong>{" "}
              {submittedData.agreeTerms ? "Yes" : "No"}
            </p>
            <p>
              <strong>Agreed to Additional Terms:</strong>{" "}
              {submittedData.agreeTerms2 ? "Yes" : "No"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;

import React, { useState } from "react";

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    cardNumber: '',
    expiration: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = '';

    switch (name) {
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Invalid email format';
        }
        break;
      case 'zip':
        if (!/^\d{5}$/.test(value)) {
          error = 'Invalid zip code format';
        }
        break;
      case 'cardNumber':
        if (!/^\d{16}$/.test(value)) {
          error = 'Invalid card number format';
        }
        break;
      case 'expiration':
        if (!/^\d{2}\/\d{2}$/.test(value)) {
          error = 'Invalid expiration date format';
        }
        break;
      case 'cvv':
        if (!/^\d{3,4}$/.test(value)) {
          error = 'Invalid CVV format';
        }
        break;
      default:
        if (value.trim() === '') {
          error = 'This field is required';
        }
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = () => {
    const currentErrors = {};

    if (currentStep === 1) {
      if (formData.firstName.trim() === '') {
        currentErrors.firstName = 'First name is required*';
      }
      if (formData.lastName.trim() === '') {
        currentErrors.lastName = 'Last name is required*';
      }
      if (formData.email.trim() === '') {
        currentErrors.email = 'Email is required*';
      }
    } else if (currentStep === 2) {
      if (formData.street.trim() === '') {
        currentErrors.street = 'Street is required*';
      }
      if (formData.city.trim() === '') {
        currentErrors.city = 'City is required*';
      }
      if (formData.state.trim() === '') {
        currentErrors.state = 'State is required*';
      }
      if (formData.zip.trim() === '') {
        currentErrors.zip = 'Zip code is required*';
      }
      if (formData.country.trim() === '') {
        currentErrors.country = 'Country is required*';
      }
    } else if (currentStep === 3) {
      if (formData.cardNumber.trim() === '') {
        currentErrors.cardNumber = 'Card number is required*';
      }
      if (formData.expiration.trim() === '') {
        currentErrors.expiration = 'Expiration date is required*';
      }
      if (formData.cvv.trim() === '') {
        currentErrors.cvv = 'CVV is required*';
      }
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      setErrorMessage('Please fix the errors before proceeding.*');
      return;
    }

    setErrors({});
    setErrorMessage('');
    if (currentStep === 3) {
      setSuccessMessage('Your Form Is Submitted Successfully');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const getProgressWidth = () => {
    switch (currentStep) {
      case 1:
        return "w-1/3";
      case 2:
        return "w-2/3";
      case 3:
        return "w-full";
      default:
        return "w-0";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-12 md:py-16 lg:py-20">
      <h1 className="mb-10 flex items-center text-5xl font-extrabold dark:text-white">
        Task-1
        <span className="bg-blue-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
          Angle Bracket
        </span>
      </h1>
      <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-8">
        <div
          className={`h-full bg-black transition-width duration-500 ease-in-out ${getProgressWidth()}`}
        />
      </div>
      {currentStep === 1 && (
        <div className="shadow-md p-6 md:p-8 bg-white rounded-lg">
          {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-sm mb-4 ">{successMessage}</p>}  
          <h2 className="text-2xl font-bold mb-4">Step 1: Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="firstName">
                First Name
              </label>
              <input
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="flex justify-end gap-2">
            <button
              className="mt-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-2"
              onClick={handleNextStep}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {currentStep === 2 && (
        <div className="shadow-md p-6 md:p-8 bg-white rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Step 2: Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="street">
                Street
              </label>
              <input
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="street"
                name="street"
                placeholder="Enter your street address"
                value={formData.street}
                onChange={handleChange}
              />
              {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="city">
                City
              </label>
              <input
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="city"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="state">
                State
              </label>
              <input
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="state"
                name="state"
                placeholder="Enter your state"
                value={formData.state}
                onChange={handleChange}
              />
              {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="zip">
                Zip
              </label>
              <input
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="zip"
                name="zip"
                placeholder="Enter your zip code"
                value={formData.zip}
                onChange={handleChange}
              />
              {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="country">
                Country
              </label>
              <input
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="country"
                name="country"
                placeholder="Enter your country"
                value={formData.country}
                onChange={handleChange}
              />
              {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <button
              className="mt-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-2"
              onClick={handlePreviousStep}
            >
              Previous
            </button>
            <button
              className="mt-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-2"
              onClick={handleNextStep}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {currentStep === 3 && (
        <div className="shadow-md p-6 md:p-8 bg-white rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Step 3: Payment</h2>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700" htmlFor="cardNumber">
              Card Number
            </label>
            <input
              className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="cardNumber"
              name="cardNumber"
              placeholder="Enter your card number"
              value={formData.cardNumber}
              onChange={handleChange}
            />
            {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="expiration">
                Expiration Date
              </label>
              <input
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="expiration"
                name="expiration"
                placeholder="MM/YY"
                value={formData.expiration}
                onChange={handleChange}
              />
              {errors.expiration && <p className="text-red-500 text-sm">{errors.expiration}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="cvv">
                CVV
              </label>
              <input
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="cvv"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleChange}
              />
              {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <button
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-2"
              onClick={handlePreviousStep}
            >
              Previous
            </button>
            <button
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2"
              onClick={handleNextStep}
            >
              Submit
            </button>
          </div>
          
        </div>
      )}
          
    </div>
  );
}

export default App;

/**
 *This Code is design for task purpose only.
 *Code is developed by Syed Saad Ali.
 */
import React, { useState } from "react";

export default function Component() {
  //this part of code handles step to each state to set and reive genric value of an object.That will later going i error handling too
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    budget: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
//error handler
  const handleNextStep = () => {
    const currentErrors = {};

    if (currentStep === 1 && !formData.budget) {
      currentErrors.budget = "Please select a budget*";
    } else if (currentStep === 2) {
      if (!formData.name.trim()) {
        currentErrors.name = "Name is required*";
      }
      if (!formData.email.trim()) {
        currentErrors.email = "Email is required*";
      }
      if (!formData.phone.trim()) {
        currentErrors.phone = "Phone number is required*";
      }
    }
// if empty fields found.
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      setErrorMessage("Please fix the errors before proceeding.*");
      return;
    }

    setErrors({});
    setErrorMessage("");
    if (currentStep === 2) {
      setSuccessMessage("Your Request for a Proposal Has Been Submitted!");
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleBudgetSelection = (budget) => {
    setFormData({ ...formData, budget });
    setCurrentStep(currentStep + 1);
  };
//diretly return to state 1
  const returnHome = () => {
    setCurrentStep(currentStep - 2);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-50">
      <div className="w-full bg-white shadow-md">
        <div className="flex items-center justify-between p-4">
          <a href="#" onClick={handlePreviousStep} className="text-sm text-gray-600">
            <ArrowLeftIcon className="inline-block mr-2" />
            Go Back
          </a>
          <a href="#" onClick={returnHome} className="text-sm text-gray-600">
            Exit
            <XIcon className="inline-block ml-2" />
          </a>
        </div>
        <div
          className={`h-1 transition-width duration-500 ease-in-out ${
            currentStep === 1 ? "w-1/3" : currentStep === 2 ? "w-2/3" : "w-full"
          } bg-green-500`}
        />
      </div>
      {currentStep === 1 && (
        <div className="flex flex-col items-center w-full max-w-xl p-8 mt-10 bg-white shadow-md">
          <h2 className="text-2xl font-semibold">Step # 1</h2>
          <h3 className="mt-2 text-xl font-medium">
            What is your monthly digital marketing budget?
          </h3>
          <p className="mt-4 text-center text-gray-600">
            We're thrilled at the opportunity to help you grow your business
            online. Please select your budget.
          </p>
          <div className="grid grid-cols-1 gap-4 mt-8 w-full">
            {[
              "< $1,000/mo",
              "$1,000 - $2,000",
              "$2,000 - $5,000",
              "$5,000 - $10,000",
              "$10,000 - $25,000",
              "$25,000 +",
            ].map((budget) => (
              <button
                key={budget}
                className="w-full p-2 text-gray-800 bg-gray-200 border border-gray-400 rounded-md hover:bg-gray-300"
                onClick={() => handleBudgetSelection(budget)}
              >
                {budget}
              </button>
            ))}
          </div>
          {errors.budget && (
            <p className="mt-4 text-sm text-red-500">{errors.budget}</p>
          )}
        </div>
      )}
      {currentStep === 2 && (
        <div className="flex flex-col items-center w-full max-w-xl p-8 mt-10 bg-white shadow-md">
          <h2 className="text-2xl font-semibold">Step # 2</h2>
          <h3 className="mt-2 text-xl font-medium">Details</h3>
          <p className="mt-4 text-center text-gray-600">
            We're thrilled at the opportunity to help you grow your business
            online. Please let us know the best way to reach you.
          </p>
          <form className="w-full mt-8 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Anything else you'd like to share?
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between gap-2">
              <button
                type="button"
                className="w-full p-2 mt-4 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
                onClick={handlePreviousStep}
              >
                Previous
              </button>
              <button
                type="button"
                className="w-full p-2 mt-4 text-white bg-green-600 rounded-md hover:bg-green-700"
                onClick={handleNextStep}
              >
                Send Request
              </button>
            </div>
          </form>
          <div className="flex items-center mt-6 text-sm text-gray-500">
            <LockIcon className="inline-block mr-2" />
            We promise never to share your information or spam your inbox
          </div>
        </div>
      )}
      {currentStep === 3 && (
        <div className="flex flex-col items-center w-full max-w-xl p-8 mt-10 bg-white shadow-md">
          <h2 className="text-2xl font-semibold">
            Your Request for a Proposal Has Been Submitted!
          </h2>
          <p className="mt-4 text-center text-gray-600">
            Thank you for reaching out. We will get back to you as soon as
            possible.
          </p>
          <button
            className="w-full p-2 mt-4 text-white bg-green-600 rounded-md hover:bg-green-700"
            onClick={returnHome}
          >
            Return Home
          </button>
        </div>
      )}
      {errorMessage && (
        <p className="mt-4 text-red-500">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="mt-4 text-green-500">{successMessage}</p>
      )}
    </div>
  );
}

function ArrowLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function LockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

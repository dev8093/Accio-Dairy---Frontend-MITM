import React, { useState, useEffect, } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const CommonForm = ({register,formData,setFormData,setErrors,errors}) => {

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Check if the form is valid
  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(val => val.trim() !== '');
    const noErrors = Object.values(errors).every(error => error === '');
    setIsFormValid(allFieldsFilled && noErrors);
  }, [formData, errors]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  // Validate individual field
  const validateField = (name, value) => {
    let errorMessage = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          errorMessage = 'Name is required';
        } else if (value.trim().length < 2) {
          errorMessage = 'Name must be at least 2 characters';
        }
        break;
        
      case 'email':
        if (!value) {
          errorMessage = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errorMessage = 'Please enter a valid email address';
        }
        break;
        
      case 'password':
        if (!value) {
          errorMessage = 'Password is required';
        } else if (value.length < 8) {
          errorMessage = 'Password must be at least 8 characters';
        } else if (!/[A-Z]/.test(value)) {
          errorMessage = 'Password must contain an uppercase letter';
        } else if (!/[a-z]/.test(value)) {
          errorMessage = 'Password must contain a lowercase letter';
        } else if (!/[0-9]/.test(value)) {
          errorMessage = 'Password must contain a number';
        }
        
        // Also validate confirm password if it's not empty
        if (register && formData.confirmPassword && value !== formData.confirmPassword) {
          setErrors(prev => ({
            ...prev,
            confirmPassword: 'Passwords do not match'
          }));
        } else if (formData.confirmPassword) {
          setErrors(prev => ({
            ...prev,
            confirmPassword: ''
          }));
        }
        break;
        
      case 'confirmPassword':
        if (register&&!value) {
          errorMessage = 'Please confirm your password';
        } else if (value !== formData.password) {
          errorMessage = 'Passwords do not match';
        }
        break;
        
      default:
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isFormValid) {
      setIsSubmitting(true);
      
      // Simulate API call with timeout
      setTimeout(() => {
        console.log('Form submitted successfully', formData);
        
        setIsSubmitting(false);
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
      }, 2000);
    }
  };

  // Determine field status for styling
  const getFieldStatus = (field) => {
    if (!formData[field]) return 'default';
    return errors[field] ? 'error' : 'success';
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-center py-5 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-2 text-center text-3xl font-extrabold text-white">
          {register? "Register Yourself":"Login" }
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-950 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            {register && <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-200">
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`block w-full pr-10 sm:text-sm rounded-md py-2 px-3 border ${
                    getFieldStatus('name') === 'error' ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' :
                    getFieldStatus('name') === 'success' ? 'border-green-300 text-gray-900 focus:ring-green-500 focus:border-green-500' :
                    'border-gray-300 text-gray-900 focus:ring-gray-500 focus:border-gray-500'
                  }`}
                  placeholder="John Doe"
                />
                {getFieldStatus('name') === 'error' && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
                {getFieldStatus('name') === 'success' && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                )}
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
              )}
            </div>}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full pr-10 sm:text-sm rounded-md py-2 px-3 border ${
                    getFieldStatus('email') === 'error' ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' :
                    getFieldStatus('email') === 'success' ? 'border-green-300 text-gray-900 focus:ring-green-500 focus:border-green-500' :
                    'border-gray-300 text-gray-900 focus:ring-gray-500 focus:border-gray-500'
                  }`}
                  placeholder="you@example.com"
                />
                {getFieldStatus('email') === 'error' && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
                {getFieldStatus('email') === 'success' && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pr-10 sm:text-sm rounded-md py-2 px-3 border ${
                    getFieldStatus('password') === 'error' ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' :
                    getFieldStatus('password') === 'success' ? 'border-green-300 text-gray-900 focus:ring-green-500 focus:border-green-500' :
                    'border-gray-300 text-gray-900 focus:ring-gray-500 focus:border-gray-500'
                  }`}
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
              {!errors.password && formData.password && (
                <p className="mt-2 text-sm text-green-600">Password looks good!</p>
              )}
            </div>

            {/* Confirm Password Field */}
            {register && <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200">
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full pr-10 sm:text-sm rounded-md py-2 px-3 border ${
                    getFieldStatus('confirmPassword') === 'error' ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' :
                    getFieldStatus('confirmPassword') === 'success' ? 'border-green-300 text-gray-900 focus:ring-green-500 focus:border-green-500' :
                    'border-gray-300 text-gray-900 focus:ring-gray-500 focus:border-gray-500'
                  }`}
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
              {!errors.confirmPassword && formData.confirmPassword && formData.password === formData.confirmPassword && (
                <p className="mt-2 text-sm text-green-600">Passwords match!</p>
              )}
            </div>}
            <div>
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  !isFormValid ? 'bg-gray-900 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                } transition-colors duration-200`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                    Processing...
                  </>
                ) : (
                  register ? 'Sign up' : 'Log In'
                )}
              </button>
            </div>
          </form>
          <div className="mt-6">
            <p className="text-center text-sm text-slate-300">
              {register?"Already":"Don't"} have an account?{' '}
              <Link to={register?"/login":"/register"} className="font-medium text-sky-600 hover:text-sky-800">
                {register?"Log in":"Sign Up"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonForm;
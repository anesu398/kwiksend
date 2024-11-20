// validation.js

const Validation = {
    isRequired(value) {
      return value.trim() !== '';
    },
    isEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    isPhoneNumber(phone) {
      const phoneRegex = /^[0-9]{10,15}$/;
      return phoneRegex.test(phone);
    },
    isStrongPassword(password) {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      return passwordRegex.test(password);
    },
    isNumber(value) {
      return !isNaN(value) && typeof Number(value) === 'number';
    },
    isInRange(value, min, max) {
      const number = Number(value);
      return this.isNumber(value) && number >= min && number <= max;
    },
    matchesRegex(value, regex) {
      return regex.test(value);
    }
  };
  
  // Export the module
  module.exports = Validation;
  
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../model/userModel"); // Assuming we have a User model to check account number uniqueness

/**
 * Generate a unique account number based on the current time and a random component
 * @returns {Number} - A unique 10-digit account number
 */
const generateAccountNumber = async () => {
  let accountNumber;

  // Retry generating account number if it already exists
  while (true) {
    const date = Date.now();
    const strDate = date.toString();
    const firstFour = strDate.slice(0, 4);

    // Generate a random number between 1 and 9999
    const randomNumber = Math.floor(Math.random() * 10000);
    const strRandom = randomNumber.toString().padStart(4, "0"); // Ensure 4 digits

    // Create account number (first four digits of timestamp + random number)
    accountNumber = parseInt(firstFour + strRandom);

    // Check if the account number already exists
    const existingAccount = await User.findOne({ accountNumber });

    // If the account number is unique, break the loop
    if (!existingAccount) {
      break;
    }
  }

  return accountNumber;
};

/**
 * Generate a 4-digit PIN using cryptographic randomness for better security
 * @returns {Number} - A 4-digit PIN
 */
const generatePin = () => {
  // Generate 4 random digits securely using crypto
  const randomBuffer = crypto.randomBytes(2); // 2 bytes (16 bits) = 4 hex digits (0-65535)
  const randomPin = randomBuffer.readUInt16BE(0) % 10000; // Limit to 4-digit PIN (0000-9999)

  // Ensure the PIN is always 4 digits
  const pin = randomPin.toString().padStart(4, "0");

  return pin;
};

/**
 * Generate a JWT token for a user
 * @param {String} id - User ID
 * @param {String} [role] - Optional role or additional claim
 * @param {String} [expiresIn='1h'] - Optional expiration time (default is 1 hour)
 * @returns {String} - The generated JWT token
 */
const generateToken = (id, role = "user", expiresIn = "1h") => {
  const payload = {
    id,
    role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });

  return token;
};

module.exports = {
  generateAccountNumber,
  generatePin,
  generateToken,
};

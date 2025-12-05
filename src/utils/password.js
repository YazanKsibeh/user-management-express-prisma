import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * Hash a password using bcrypt
 * @param {string} password - Plain text password
 * @returns {Promise<string>} Hashed password
 */
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compare a plain password with a hashed password
 * @param {string} password - Plain text password
 * @param {string} hash - Hashed password to compare against
 * @returns {Promise<boolean>} True if passwords match
 */
export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};


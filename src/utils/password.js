import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

// Hash password
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

// Compare password
export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};


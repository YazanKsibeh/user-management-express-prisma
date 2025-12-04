import { registerSchema, loginSchema, updateUserSchema } from './src/utils/validators.js';

console.log('=== Testing Validation Schemas ===\n');

// Register Schema Tests
console.log('1. Testing Register Schema:');
console.log('--------------------------------');

// Valid register
const validRegister = {
  name: 'Ahmad Ali',
  email: 'ahmad@example.com',
  password: 'Password123',
  confirmPassword: 'Password123'
};

try {
  registerSchema.parse(validRegister);
  console.log('✅ Valid register data: PASSED');
} catch (error) {
  console.log('❌ Valid register data: FAILED');
  if (error.issues) {
    console.log('   Errors:', error.issues.map(err => `${err.path.join('.')}: ${err.message}`));
  } else {
    console.log('   Error:', error.message);
  }
}

// Invalid: name too short
const invalidRegister1 = {
  name: 'A',
  email: 'ahmad@example.com',
  password: 'Password123',
  confirmPassword: 'Password123'
};

try {
  registerSchema.parse(invalidRegister1);
  console.log('❌ Invalid register (short name): FAILED - should have failed');
} catch (error) {
  console.log('✅ Invalid register (short name): PASSED - correctly rejected');
}

// Invalid: passwords don't match
const invalidRegister2 = {
  name: 'Yazan Ksibeh',
  email: 'yazan@example.com',
  password: 'Password123',
  confirmPassword: 'Different123'
};

try {
  registerSchema.parse(invalidRegister2);
  console.log('❌ Invalid register (password mismatch): FAILED - should have failed');
} catch (error) {
  console.log('✅ Invalid register (password mismatch): PASSED - correctly rejected');
}

// Invalid: password too weak
const invalidRegister3 = {
  name: 'Ali Hassan',
  email: 'ali@example.com',
  password: 'weak',
  confirmPassword: 'weak'
};

try {
  registerSchema.parse(invalidRegister3);
  console.log('❌ Invalid register (weak password): FAILED - should have failed');
} catch (error) {
  console.log('✅ Invalid register (weak password): PASSED - correctly rejected');
}

// Invalid: bad email format
const invalidRegister4 = {
  name: 'Adham Saleh',
  email: 'notanemail',
  password: 'Password123',
  confirmPassword: 'Password123'
};

try {
  registerSchema.parse(invalidRegister4);
  console.log('❌ Invalid register (invalid email): FAILED - should have failed');
} catch (error) {
  console.log('✅ Invalid register (invalid email): PASSED - correctly rejected');
}

// Invalid: missing name
const invalidRegister5 = {
  email: 'george@example.com',
  password: 'Password123',
  confirmPassword: 'Password123'
};

try {
  registerSchema.parse(invalidRegister5);
  console.log('❌ Invalid register (missing name): FAILED - should have failed');
} catch (error) {
  console.log('✅ Invalid register (missing name): PASSED - correctly rejected');
}

// Invalid: missing email
const invalidRegister6 = {
  name: 'Ahmad Ali',
  password: 'Password123',
  confirmPassword: 'Password123'
};

try {
  registerSchema.parse(invalidRegister6);
  console.log('❌ Invalid register (missing email): FAILED - should have failed');
} catch (error) {
  console.log('✅ Invalid register (missing email): PASSED - correctly rejected');
}

// Invalid: missing password
const invalidRegister7 = {
  name: 'Yazan Ksibeh',
  email: 'yazan@example.com',
  confirmPassword: 'Password123'
};

try {
  registerSchema.parse(invalidRegister7);
  console.log('❌ Invalid register (missing password): FAILED - should have failed');
} catch (error) {
  console.log('✅ Invalid register (missing password): PASSED - correctly rejected');
}

// Invalid: password missing number
const invalidRegister8 = {
  name: 'Ali Hassan',
  email: 'ali@example.com',
  password: 'PasswordABC',
  confirmPassword: 'PasswordABC'
};

try {
  registerSchema.parse(invalidRegister8);
  console.log('❌ Invalid register (password without number): FAILED - should have failed');
} catch (error) {
  console.log('✅ Invalid register (password without number): PASSED - correctly rejected');
}

// Invalid: password missing uppercase
const invalidRegister9 = {
  name: 'Adham Saleh',
  email: 'adham@example.com',
  password: 'password123',
  confirmPassword: 'password123'
};

try {
  registerSchema.parse(invalidRegister9);
  console.log('❌ Invalid register (password without uppercase): FAILED - should have failed');
} catch (error) {
  console.log('✅ Invalid register (password without uppercase): PASSED - correctly rejected');
}

// Valid: boundary test (min values)
const validRegisterBoundary = {
  name: 'Ali',
  email: 'ali@ex.com',
  password: 'Pass1234',
  confirmPassword: 'Pass1234'
};

try {
  registerSchema.parse(validRegisterBoundary);
  console.log('✅ Valid register (boundary values): PASSED');
} catch (error) {
  console.log('❌ Valid register (boundary values): FAILED');
  if (error.issues) {
    console.log('   Errors:', error.issues.map(err => `${err.path.join('.')}: ${err.message}`));
  }
}

console.log('\n');

// Login Schema Tests
console.log('2. Testing Login Schema:');
console.log('--------------------------------');

// Valid login
const validLogin = {
  email: 'ahmad@example.com',
  password: 'anypassword'
};

try {
  loginSchema.parse(validLogin);
  console.log('✅ Valid login data: PASSED');
} catch (error) {
  console.log('❌ Valid login data: FAILED');
  if (error.issues) {
    console.log('   Errors:', error.issues.map(err => `${err.path.join('.')}: ${err.message}`));
  } else {
    console.log('   Error:', error.message);
  }
}

// Invalid: bad email
const invalidLogin1 = {
  email: 'notanemail',
  password: 'anypassword'
};

try {
  loginSchema.parse(invalidLogin1);
  console.log('❌ Invalid login (invalid email): FAILED - should have failed');
} catch (error) {
  console.log('✅ Invalid login (invalid email): PASSED - correctly rejected');
}

// Invalid login data - missing password
const invalidLogin2 = {
  email: 'yazan@example.com',
  password: ''
};

try {
  loginSchema.parse(invalidLogin2);
  console.log('❌ Invalid login (empty password): FAILED - should have failed');
} catch (error) {
  console.log('✅ Invalid login (empty password): PASSED - correctly rejected');
}

// Invalid: missing email
const invalidLogin3 = {
  password: 'anypassword'
};

try {
  loginSchema.parse(invalidLogin3);
  console.log('❌ Invalid login (missing email): FAILED - should have failed');
} catch (error) {
  console.log('✅ Invalid login (missing email): PASSED - correctly rejected');
}

// Invalid: missing password field
const invalidLogin4 = {
  email: 'ali@example.com'
};

try {
  loginSchema.parse(invalidLogin4);
  console.log('❌ Invalid login (missing password field): FAILED - should have failed');
} catch (error) {
  console.log('✅ Invalid login (missing password field): PASSED - correctly rejected');
}

// Invalid: email with spaces
const invalidLogin5 = {
  email: 'george @example.com',
  password: 'anypassword'
};

try {
  loginSchema.parse(invalidLogin5);
  console.log('❌ Invalid login (email with spaces): FAILED - should have failed');
} catch (error) {
  console.log('✅ Invalid login (email with spaces): PASSED - correctly rejected');
}

console.log('\n');

// Update Schema Tests
console.log('3. Testing Update User Schema:');
console.log('--------------------------------');

// Valid: update name only
const validUpdate1 = {
  name: 'Ahmad Ali'
};

try {
  updateUserSchema.parse(validUpdate1);
  console.log('✅ Valid update (name only): PASSED');
} catch (error) {
  console.log('❌ Valid update (name only): FAILED');
  if (error.issues) {
    console.log('   Errors:', error.issues.map(err => `${err.path.join('.')}: ${err.message}`));
  } else {
    console.log('   Error:', error.message);
  }
}

// Valid: update password
const validUpdate2 = {
  password: 'NewPassword123',
  confirmPassword: 'NewPassword123'
};

try {
  updateUserSchema.parse(validUpdate2);
  console.log('✅ Valid update (password): PASSED');
} catch (error) {
  console.log('❌ Valid update (password): FAILED');
  if (error.issues) {
    console.log('   Errors:', error.issues.map(err => `${err.path.join('.')}: ${err.message}`));
  } else {
    console.log('   Error:', error.message);
  }
}

// Valid: empty update (all optional)
const validUpdate3 = {};

try {
  updateUserSchema.parse(validUpdate3);
  console.log('✅ Valid update (empty object): PASSED');
} catch (error) {
  console.log('❌ Valid update (empty object): FAILED');
  if (error.issues) {
    console.log('   Errors:', error.issues.map(err => `${err.path.join('.')}: ${err.message}`));
  } else {
    console.log('   Error:', error.message);
  }
}

// Invalid: passwords don't match
const invalidUpdate1 = {
  password: 'NewPassword123',
  confirmPassword: 'Different123'
};

try {
  updateUserSchema.parse(invalidUpdate1);
  console.log('❌ Invalid update (password mismatch): FAILED - should have failed');
} catch (error) {
  console.log('✅ Invalid update (password mismatch): PASSED - correctly rejected');
}

// Invalid: bad role
const invalidUpdate2 = {
  role: 'INVALID_ROLE'
};

try {
  updateUserSchema.parse(invalidUpdate2);
  console.log('❌ Invalid update (invalid role): FAILED - should have failed');
} catch (error) {
  console.log('✅ Invalid update (invalid role): PASSED - correctly rejected');
}

// Invalid: password without confirm
const invalidUpdate3 = {
  password: 'NewPassword123'
};

try {
  updateUserSchema.parse(invalidUpdate3);
  console.log('❌ Invalid update (password without confirmPassword): FAILED - should have failed');
} catch (error) {
  console.log('✅ Invalid update (password without confirmPassword): PASSED - correctly rejected');
}

// Invalid: confirm without password
const invalidUpdate4 = {
  confirmPassword: 'NewPassword123'
};

try {
  updateUserSchema.parse(invalidUpdate4);
  console.log('❌ Invalid update (confirmPassword without password): FAILED - should have failed');
} catch (error) {
  console.log('✅ Invalid update (confirmPassword without password): PASSED - correctly rejected');
}

// Invalid: name too short
const invalidUpdate5 = {
  name: 'A'
};

try {
  updateUserSchema.parse(invalidUpdate5);
  console.log('❌ Invalid update (name with 1 char): FAILED - should have failed');
} catch (error) {
  console.log('✅ Invalid update (name with 1 char): PASSED - correctly rejected');
}

// Valid: role USER
const validUpdate4 = {
  role: 'USER'
};

try {
  updateUserSchema.parse(validUpdate4);
  console.log('✅ Valid update (role USER): PASSED');
} catch (error) {
  console.log('❌ Valid update (role USER): FAILED');
  if (error.issues) {
    console.log('   Errors:', error.issues.map(err => `${err.path.join('.')}: ${err.message}`));
  }
}

// Valid: role ADMIN
const validUpdate5 = {
  role: 'ADMIN'
};

try {
  updateUserSchema.parse(validUpdate5);
  console.log('✅ Valid update (role ADMIN): PASSED');
} catch (error) {
  console.log('❌ Valid update (role ADMIN): FAILED');
  if (error.issues) {
    console.log('   Errors:', error.issues.map(err => `${err.path.join('.')}: ${err.message}`));
  }
}

// Valid: update multiple fields
const validUpdate6 = {
  name: 'Yazan Ksibeh',
  email: 'yazan@example.com',
  role: 'ADMIN'
};

try {
  updateUserSchema.parse(validUpdate6);
  console.log('✅ Valid update (multiple fields): PASSED');
} catch (error) {
  console.log('❌ Valid update (multiple fields): FAILED');
  if (error.issues) {
    console.log('   Errors:', error.issues.map(err => `${err.path.join('.')}: ${err.message}`));
  }
}

// Invalid: password missing number
const invalidUpdate6 = {
  password: 'PasswordABC',
  confirmPassword: 'PasswordABC'
};

try {
  updateUserSchema.parse(invalidUpdate6);
  console.log('❌ Invalid update (password without number): FAILED - should have failed');
} catch (error) {
  console.log('✅ Invalid update (password without number): PASSED - correctly rejected');
}

// Invalid: password missing uppercase
const invalidUpdate7 = {
  password: 'password123',
  confirmPassword: 'password123'
};

try {
  updateUserSchema.parse(invalidUpdate7);
  console.log('❌ Invalid update (password without uppercase): FAILED - should have failed');
} catch (error) {
  console.log('✅ Invalid update (password without uppercase): PASSED - correctly rejected');
}

console.log('\n=== Testing Complete ===');


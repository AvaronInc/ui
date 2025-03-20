
import { createUser } from './userCreationService';
import { checkExistingUser } from './userCheckService';
import { handleSignupError } from './errorHandlingService';
import type { SignupFormValues, SignupResult } from './types';

export { createUser, checkExistingUser, handleSignupError };
export type { SignupFormValues, SignupResult };

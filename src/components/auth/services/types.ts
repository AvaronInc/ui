
export interface SignupResult {
  success: boolean;
  data: any | null;
  error: Error | null;
  errorDetails?: string;
}

export interface UserCheckResult {
  existingUser: { email: string } | null;
  checkError: Error | null;
}

export interface SignupFormValues {
  email: string;
  password: string;
  fullName: string;
}

import { generate } from "otp-generator";

export const generateOtp = async () => {
  return generate(6, { upperCaseAlphabets: false, specialChars: false });
};

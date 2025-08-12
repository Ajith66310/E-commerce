import bcrypt from "bcrypt";

export const compareOtp = async (enteredOtp, hashedOtp) => {
  const isMatch = await bcrypt.compare(enteredOtp, hashedOtp);
  return isMatch;
};
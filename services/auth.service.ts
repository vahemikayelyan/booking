import { RegisterResponse } from "@/app/api/auth/register/route";
import { postRequest } from "@/utils/shared";

export const registerUser = async (body: any): Promise<RegisterResponse> => {
  const response = await postRequest("auth/register", body);
  const data: RegisterResponse = await response.json();

  return data;
};

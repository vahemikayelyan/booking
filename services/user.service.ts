import { RegisterResponse } from "@/app/api/auth/user/route";
import { postRequest } from "@/utils/shared";

export const registerUser = async (body: any): Promise<RegisterResponse> => {
  const response = await postRequest("auth/user", body);
  const data: RegisterResponse = await response.json();

  return data;
};

import { RegisterResponse } from "@/app/api/auth/user/route";
import { postRequest } from "@/utils/shared";

export const registerUser = async (body: any): Promise<RegisterResponse> => {
  const data: RegisterResponse = (await postRequest("user", body)).json();

  return data;
};

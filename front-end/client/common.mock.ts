import { Backend } from "./TransClient";

export async function isLogged(){
  const client = Backend.getInstance();
  const token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') as string : " ";
  const res = await client.auth.refresh({token : token});
  if (!res.ok)
    return false;
  const data = JSON.parse(res.value);
  if (data.error){
    return false;
  }
  localStorage.setItem('access_token', data.access_token);
  return true;
}

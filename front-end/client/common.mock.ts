export async function isLogged(){
  if (localStorage.getItem('access_token') == 'access_token') return true;
  //if (localStorage.getItem('access_token') == 'ouiouioui') return true;
  return false;
}

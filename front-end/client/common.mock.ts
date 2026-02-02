import { Backend } from "./TransClient";

export async function isLogged(): Promise<boolean> {
  const client = Backend.getInstance();
  const token = localStorage.getItem('access_token');
  
  // Si pas de token du tout, pas connecté
  if (!token || token.trim() === "") {
    return false;
  }
  
  try {
    const res = await client.auth.refresh({ token: token });
    if (!res.ok) {
      localStorage.removeItem('access_token');
      return false;
    }
    const data = JSON.parse(res.value);
    if (data.error || !data.access_token) {
      localStorage.removeItem('access_token');
      return false;
    }
    localStorage.setItem('access_token', data.access_token);
    return true;
  } catch (error) {
    localStorage.removeItem('access_token');
    return false;
  }
}

// Fonction utilitaire pour le logout
export function clearAuthToken(): void {
  localStorage.removeItem('access_token');
}

// Vérifier si un token existe (sans validation)
export function hasToken(): boolean {
  const token = localStorage.getItem('access_token');
  return !!token && token.trim() !== "";
}

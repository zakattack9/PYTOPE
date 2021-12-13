export function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; SameSite=strict; Secure`;
}

export function getCookie(name: string) {
  const cookie = document.cookie.split(';').find(cookie => {
    return cookie.includes(name);
  });
  return cookie?.split('=')[1] || null;
}

export function clearCookie(name: string) {
  document.cookie = `${name}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
}

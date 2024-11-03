function setCookie(name, value) {
  if (typeof window !== 'undefined') {
    const maxAge = 30 * 24 * 60 * 60;
    document.cookie = `${name}=${value}; max-age=${maxAge}; path=/`;
  }
}

function getCookie(name) {
  if (typeof window !== 'undefined') {
    const value = `; ${document.cookie}`;
    const parts = value?.split(`; ${name}=`);
    if (parts?.length === 2) return parts?.pop()?.split(";")?.shift();
  }
  return null;
}

function deleteCookie(name) {
  if (typeof window !== 'undefined') {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}

export { setCookie , getCookie ,deleteCookie};

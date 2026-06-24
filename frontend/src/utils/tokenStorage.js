const KEY = 'talentlens_ai_token';

export const tokenStorage = {
  get:    ()        => localStorage.getItem(KEY),
  set:    (token)   => localStorage.setItem(KEY, token),
  remove: ()        => localStorage.removeItem(KEY),
  exists: ()        => !!localStorage.getItem(KEY),
};



// this will not work in ssr in nextjs, remix because localStorage is not available on the server side

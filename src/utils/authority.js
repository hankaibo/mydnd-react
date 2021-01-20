import { reloadAuthorized } from './Authorized';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  const authorityString = typeof str === 'undefined' && localStorage ? localStorage.getItem('mydnd-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority;
}

export function setAuthority(authority) {
  const mydndAuthority = typeof authority === 'string' ? authority.split(',') : authority;
  localStorage.setItem('mydnd-authority', JSON.stringify(mydndAuthority));
  // auto reload
  reloadAuthorized();
}

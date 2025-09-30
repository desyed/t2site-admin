export function prefix(name: string) {
  return `t2s-${name}`;
}

export const USER_ID_PREFIX = prefix('usr');
export const ACCOUNT_ID_PREFIX = prefix('acc');
export const MEMBER_ID_PREFIX = prefix('prjmem');
export const PROJECT_INVITED_MEMBER_ID_PREFIX = prefix('prjivtmem');
export const PRODUCT_ID_PREFIX = prefix('prd');
export const PROJECT_PRODUCT_ID_PREFIX = prefix('prjprd');
export const PROJECT_ID_PREFIX = prefix('prj');

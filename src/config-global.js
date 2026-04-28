import packageJson from '../package.json';

// ----------------------------------------------------------------------

export const CONFIG = {
  site: {
    name: 'CampusSync',
    serverUrl: import.meta.env.VITE_SERVER_URL ?? 'https://api.campussync.in/api',
    assetURL: import.meta.env.VITE_ASSET_URL ?? '',
    basePath: import.meta.env.VITE_BASE_PATH ?? '',
    version: packageJson.version,
  },
  /**
   * Auth
   * Only JWT is supported for CampusSync Mobile.
   */
  auth: {
    method: 'jwt',
    skip: false,
    redirectPath: '/',
  },
};

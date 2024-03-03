export const API_URL = import.meta.env.VITE_APP_API_URL;

export const GET_VPS_LIST = `${API_URL}/api/vps`;
export const GET_DISTRIBUTION_LIST = `${API_URL}/api/distributions`;
export const GET_OS_LIST = `${API_URL}/api/os`;
export const GET_CONFIG_LIST = `${API_URL}/api/flavor`;
export const GET_FLAVOR_STACK = `${API_URL}/api/flavorstack`;
export const GET_IMAGE_LIST = `${API_URL}/api/imagestack`;
export const GET_USER_LIST = `${API_URL}/api/users`;

export const GET_REBOOT_VPS = `${API_URL}/api/vps/:id/reboot`;
export const GET_START_VPS = `${API_URL}/api/vps/:id/start`;
export const GET_STOP_VPS = `${API_URL}/api/vps/:id/stop`;
export const GET_STATUS_VPS = `${API_URL}/api/vps/:id/status`;

export const POST_CREATE_VPS = `${API_URL}/api/vps`;
export const POST_CREATE_DISTRIBUTION = `${API_URL}/api/distributions`;
export const POST_CREATE_CONFIG = `${API_URL}/api/flavor/store`;
export const POST_CREATE_OS = `${API_URL}/api/os`;

export const DELETE_OS = `${API_URL}/api/os`;
export const DELETE_DISTRIBUTION = `${API_URL}/api/distributions`;
export const DELETE_CONFIG = `${API_URL}/api/flavor`;

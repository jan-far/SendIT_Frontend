import { get_request } from './utils/fetch';
import { clearCookie } from './utils/helpers';

export const getUser = async () => {
  try {
    const req = await get_request('/users');
    const res = await req.json();

    if (req.status === 200) {
      if (res.Profile.role === 1) {
        return { success: true, user: { ...res.Profile } };
      } else {
        clearCookie();
        return { success: false };
      }
    } else {
      clearCookie();
      return { success: false };
    }
  } catch (error) {
    console.log(error);
    return { success: false, user: {} };
  }
};

export const AdminGetUser = async () => {
  try {
    const req = await get_request('/admin/users');
    const res = await req.json();

    if (req.status === 200) {
      return { success: true, users: { ...res.Profile } };
    } else {
      clearCookie();
      return { success: false };
    }
  } catch (error) {
    console.log(error);
    return { success: false, users: {} };
  }
};

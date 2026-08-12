import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectUser, selectIsAuth, selectAuthLoading,
  selectUserRole, selectInitialized,
  loginUser, logoutUser, registerUser, fetchMe,
} from '@store/slices/authSlice';

const useAuth = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const user      = useSelector(selectUser);
  const isAuth    = useSelector(selectIsAuth);
  const isLoading = useSelector(selectAuthLoading);
  const role      = useSelector(selectUserRole);
  const initialized = useSelector(selectInitialized);

  const login = async (credentials) => {
    const result = await dispatch(loginUser(credentials));
    if (loginUser.fulfilled.match(result)) {
      const userRole = result.payload.user.role;
      navigateByRole(userRole);
    }
    return result;
  };

  const logout = async () => {
    await dispatch(logoutUser());
    navigate('/auth/login');
  };

  const register = async (data) => {
    const result = await dispatch(registerUser(data));
    if (registerUser.fulfilled.match(result)) {
      navigate('/auth/login');
    }
    return result;
  };

  const getMe = () => dispatch(fetchMe());

  const navigateByRole = (userRole) => {
    switch (userRole) {
      case 'SUPER_ADMIN':
      case 'ADMIN':
      case 'MANAGER':
        navigate('/admin/dashboard');
        break;
      case 'ASSOCIATE':
      case 'SUB_ASSOCIATE':
        navigate('/associate/dashboard');
        break;
      case 'CUSTOMER':
        navigate('/customer/dashboard');
        break;
      default:
        navigate('/');
    }
  };

  const hasRole = (...roles) => roles.includes(role);
  const isAdmin = () => ['SUPER_ADMIN', 'ADMIN'].includes(role);
  const isSuperAdmin = () => role === 'SUPER_ADMIN';
  const isManagement = () => ['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(role);
  const isAssociate  = () => ['ASSOCIATE', 'SUB_ASSOCIATE'].includes(role);
  const isCustomer   = () => role === 'CUSTOMER';

  return {
    user,
    isAuth,
    isLoading,
    role,
    initialized,
    login,
    logout,
    register,
    getMe,
    navigateByRole,
    hasRole,
    isAdmin,
    isSuperAdmin,
    isManagement,
    isAssociate,
    isCustomer,
  };
};

export default useAuth;

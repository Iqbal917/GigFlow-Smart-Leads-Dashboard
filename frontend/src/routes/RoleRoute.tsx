import {
  Navigate
} from 'react-router-dom';

import { useAuthStore } from '../store/authStore';

interface Props {
  children: React.ReactNode;
  allowedRoles: string[];
}

const RoleRoute = ({
  children,
  allowedRoles
}: Props) => {
  const { user } =
    useAuthStore();

  if (
    !user ||
    !allowedRoles.includes(user.role)
  ) {
    return (
      <Navigate to="/dashboard" />
    );
  }

  return children;
};

export default RoleRoute;
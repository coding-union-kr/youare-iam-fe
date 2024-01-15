import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { authState } from '@/store/auth';
import { getAccessToken } from '@/libs/token';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(authState);

  useEffect(() => {
    const token = getAccessToken();

    if (token) {
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated]);

  return { isAuthenticated, setIsAuthenticated };
};

export default useAuth;

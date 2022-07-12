import authApi from '../api/auth';
import { useMutation } from 'react-query';

export function useLogin() {
  return useMutation('todos', params => authApi.GenerateAuthCookie(params));
}

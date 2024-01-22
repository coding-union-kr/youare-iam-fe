import toast from 'react-hot-toast';
import type { ErrorResponse } from '@/types/api';

export const showToastErrorMessage = (error: unknown) => {
  const errorResponse = error as ErrorResponse;
  toast.error(errorResponse.message);
};

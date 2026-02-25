import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllUsers,
  getCurrentUserProfile,
  updateUserPackage,
  UpdateUserPackageRequest,
} from "@/lib/api/users";
import { PaginationParams } from "@/types/api";

export const USERS_QUERY_KEY = "users";
export const CURRENT_USER_QUERY_KEY = "currentUser";

export function useUsers(params: PaginationParams = {}) {
  return useQuery({
    queryKey: [USERS_QUERY_KEY, params],
    queryFn: () => getAllUsers(params),
  });
}

export function useCurrentUserProfile() {
  return useQuery({
    queryKey: [CURRENT_USER_QUERY_KEY],
    queryFn: getCurrentUserProfile,
  });
}

export function useUpdateUserPackage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: number;
      data: UpdateUserPackageRequest;
    }) => updateUserPackage(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
  });
}

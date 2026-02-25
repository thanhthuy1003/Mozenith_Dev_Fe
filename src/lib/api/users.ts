import apiClient from "../api-client";
import {
  ApiResponse,
  PaginatedUsers,
  PaginationParams,
  User,
} from "@/types/api";
import { PAGINATION } from "../constants";

// ============================================
// User Management API (Admin Only)
// ============================================

export async function getAllUsers(
  params: PaginationParams = {},
): Promise<PaginatedUsers> {
  const { page = PAGINATION.DEFAULT_PAGE, size = PAGINATION.DEFAULT_SIZE } =
    params;
  const response = await apiClient.get<ApiResponse<PaginatedUsers>>(
    "/api/admin/users",
    {
      params: { page, size },
    },
  );
  return response.data.data;
}

export async function getCurrentUserProfile(): Promise<User> {
  const response = await apiClient.get<ApiResponse<User>>(
    "/api/admin/users/me",
  );
  return response.data.data;
}

export type PackageType = "BASIC" | "PREMIUM";

export interface UpdateUserPackageRequest {
  packageType: PackageType;
}

export async function updateUserPackage(
  userId: number,
  data: UpdateUserPackageRequest,
): Promise<User> {
  const response = await apiClient.put<ApiResponse<User>>(
    `/api/admin/users/${userId}/package`,
    data,
  );
  return response.data.data;
}

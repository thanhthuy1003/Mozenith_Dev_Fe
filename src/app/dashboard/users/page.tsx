"use client";

import { useState } from "react";
import { TopBar } from "@/components/dashboard";
import { useAuth } from "@/contexts/auth-context";
import { useUsers, useUpdateUserPackage } from "@/hooks/use-users";
import { ROLES, PAGINATION } from "@/lib/constants";
import {
  Card,
  CardContent,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Badge,
  Button,
  LoadingState,
  EmptyState,
  Pagination,
  Alert,
  Select,
} from "@/components/ui";
import { PackageType } from "@/lib/api/users";
import { Users, Mail, Phone, Calendar, Shield, Package } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function UsersPage() {
  const { hasRole } = useAuth();
  const isAdmin = hasRole(ROLES.ADMIN);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGINATION.DEFAULT_SIZE);

  const { data, isLoading, error } = useUsers({ page, size: pageSize });
  const updatePackageMutation = useUpdateUserPackage();

  const handlePackageChange = (userId: number, packageType: PackageType) => {
    updatePackageMutation.mutate({ userId, data: { packageType } });
  };

  if (!isAdmin) {
    return (
      <>
        <TopBar title="Users" description="Manage system users" />
        <div className="p-6">
          <Alert variant="warning" title="Access Denied">
            You don't have permission to view this page. This feature is only
            available to administrators.
          </Alert>
        </div>
      </>
    );
  }

  const getRoleBadgeVariant = (roleName: string) => {
    switch (roleName) {
      case ROLES.ADMIN:
        return "destructive";
      case ROLES.MANAGER:
        return "warning";
      case ROLES.STAFF:
        return "success";
      default:
        return "secondary";
    }
  };

  const getStatusBadgeVariant = (status?: string) => {
    switch (status?.toUpperCase()) {
      case "ACTIVE":
        return "success";
      case "INACTIVE":
        return "secondary";
      case "SUSPENDED":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <>
      <TopBar
        title="User Management"
        description="View and manage all users in the system"
      />
      <div className="p-6">
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <LoadingState message="Loading users..." />
            ) : error ? (
              <div className="p-6">
                <Alert variant="error" title="Error loading users">
                  {(error as Error).message ||
                    "Failed to load users. Please try again."}
                </Alert>
              </div>
            ) : !data?.content?.length ? (
              <EmptyState
                icon={<Users className="h-8 w-8 text-[#666666]" />}
                title="No users found"
                description="There are no users in the system yet."
              />
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Roles</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Package</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.content.map((user) => (
                      <TableRow key={user.userId}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#99E7F1] text-sm font-medium text-[#0054C5]">
                              {user.fullName?.charAt(0) ||
                                user.username?.charAt(0) ||
                                "U"}
                            </div>
                            <div>
                              <p className="font-medium text-[#3D3D3D]">
                                {user.fullName || "—"}
                              </p>
                              <p className="text-sm text-[#666666]">
                                @{user.username}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-[#666666]" />
                            <span>{user.email}</span>
                            {user.emailVerified && (
                              <Badge variant="success" className="text-[10px]">
                                Verified
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-[#666666]" />
                            <span>{user.phone || "—"}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {user.role ? (
                              <Badge variant={getRoleBadgeVariant(user.role)}>
                                {user.role}
                              </Badge>
                            ) : (
                              "—"
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(user.status)}>
                            {user.status || "ACTIVE"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-[#666666]" />
                            <Select
                              value={user.packageType || "BASIC"}
                              onChange={(e) =>
                                handlePackageChange(
                                  user.userId,
                                  e.target.value as PackageType,
                                )
                              }
                              disabled={updatePackageMutation.isPending}
                              className="w-28"
                            >
                              <option value="BASIC">Basic</option>
                              <option value="PREMIUM">Premium</option>
                            </Select>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm text-[#666666]">
                            <Calendar className="h-4 w-4" />
                            {user.createdAt ? formatDate(user.createdAt) : "—"}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="border-t border-[#EEEEEE] p-4">
                  <Pagination
                    currentPage={data.page.number}
                    totalPages={data.page.totalPages}
                    totalElements={data.page.totalElements}
                    pageSize={data.page.size}
                    onPageChange={setPage}
                    onPageSizeChange={(size) => {
                      setPageSize(size);
                      setPage(0);
                    }}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

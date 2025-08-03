import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CardContent } from "@/components/ui/card";
import { Loader, Mail, Phone, Search, Trash } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchAllUser } from "@/store/allUserSlice";
import { fetchMothers } from "@/store/mothersSlice";
import DynamicPagination from "./DaynamicPagination";
import api from "@/lib/axios";
import axios from "axios";
import { toast } from "sonner";

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: users,
    loading: userLoading,
    error: userError,
  } = useSelector((state: RootState) => state.users);
  const {
    items: mothers,
    loading: motherLoading,
    error: motherError,
  } = useSelector((state: RootState) => state.mothers);
  const { currentItems } = useSelector((state: RootState) => state.pagination);

  const mixedUser = currentItems.map((user, index) => {
    const mother = mothers?.data.find((mother) => mother.email === user.email);
    if (mother) {
      return {
        ...user,
        extraRole: mother.role,
      };
    } else {
      return user;
    }
  });

  const filteredUser =
    mixedUser &&
    mixedUser.filter((user) => {
      if (searchTerm) {
        return (
          user.fullName.includes(searchTerm) ||
          user._id?.includes(searchTerm) ||
          user.email.includes(searchTerm) ||
          user.phone?.includes(searchTerm)
        );
      }

      return user;
    });

  const handleDeleteUser = async (id: string, userEmail: string) => {
    try {
      setLoading(true);

      const res = await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });

      if (!res.ok) {
        toast.error("User Delete Failed");
        return;
      }

      const userRes = await api.delete(`/delete-user/${id}`);

      if (userRes.status !== 200) {
        toast.error("User Delete Failed");
        return;
      }

      let motherRes = null;
      const mother = mothers?.data.find((mother) => mother.email === userEmail);

      if (userRes.status === 200 && mother) {
        motherRes = await api.delete(`/delete-mother/${mother._id}`);
      }

      if (userRes.status === 200 && motherRes?.status === 200) {
        toast.success("User & Mother Delete Successful");
        dispatch(fetchAllUser());
        dispatch(fetchMothers());
        return;
      } else if (userRes.status === 200) {
        toast.success("User Delete Successful");
        dispatch(fetchAllUser());
        dispatch(fetchMothers());
        return;
      } else {
        toast.error("User Delete Failed");
        return;
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "User Delete failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchAllUser());
    dispatch(fetchMothers());
  }, []);

  return (
    <CardContent>
      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search with name, id, email and phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer Info</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Subscription Status</TableHead>
            <TableHead>Donated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userLoading && (
            <TableRow>
              <TableCell colSpan={7} align="center" className="h-[100px]">
                <Loader className="animate-spin" size={34} />
              </TableCell>
            </TableRow>
          )}
          {userError && (
            <TableRow>
              <TableCell colSpan={7} align="center" className="h-[100px]">
                <p className="text-lg italic text-red-500 font-semibold">
                  {userError}
                </p>
              </TableCell>
            </TableRow>
          )}
          {!userLoading && !userError && users?.data.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} align="center" className="h-[100px]">
                <p className="text-lg italic text-black font-semibold">
                  No Data Found !
                </p>
              </TableCell>
            </TableRow>
          )}
          {filteredUser &&
            filteredUser.length > 0 &&
            filteredUser.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{user.fullName}</div>
                    <div className="text-sm text-gray-500">ID: {user._id}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {user.phone && (
                      <div className="flex items-center text-sm">
                        <Phone className="mr-1 h-3 w-3" />
                        {user.phone}
                      </div>
                    )}

                    <div className="flex items-center text-sm">
                      <Mail className="mr-1 h-3 w-3" />
                      {user.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {user?.subscriptionType?.[0].toUpperCase()! +
                    user?.subscriptionType?.slice(1)}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Badge>{user.role}</Badge>
                    {user.extraRole && <Badge>{user.extraRole}</Badge>}
                  </div>
                </TableCell>
                <TableCell>
                  {user?.subscriptionStatus?.[0].toUpperCase()! +
                    user?.subscriptionStatus?.slice(1)}
                </TableCell>
                <TableCell>{user.isDonated ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    className="cursor-pointer"
                    onClick={() => handleDeleteUser(user._id!, user.email)}
                  >
                    {loading && <Loader className="animate-spin" size={24} />}
                    {!loading && <Trash size={24} />}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <DynamicPagination data={users?.data!} />
    </CardContent>
  );
};

export default UserList;

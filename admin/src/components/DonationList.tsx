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
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import DynamicPagination from "./DaynamicPagination";
import { fetchSubscriptions } from "@/store/subscriptionSlice";

const DonationsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: donations,
    loading: donationsLoading,
    error: donationsError,
  } = useSelector((state: RootState) => state.donations);
  const { currentItems } = useSelector((state: RootState) => state.pagination);

  const filteredDonations = currentItems.filter((subs) => {
    if (searchTerm) {
      return (
        subs.userDetails.fullName.includes(searchTerm) ||
        subs.userDetails._id?.includes(searchTerm) ||
        subs.userDetails.email.includes(searchTerm) ||
        subs.status?.includes(searchTerm)
      );
    }

    return subs;
  });

  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, []);

  return (
    <CardContent>
      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search with name, id, email and status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User Info</TableHead>
            <TableHead>Contact Info</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment Method</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {donationsLoading && (
            <TableRow>
              <TableCell colSpan={7} align="center" className="h-[100px]">
                <Loader className="animate-spin" size={34} />
              </TableCell>
            </TableRow>
          )}
          {donationsError && !donations?.data && (
            <TableRow>
              <TableCell colSpan={7} align="center" className="h-[100px]">
                <p className="text-md italic text-red-500 font-semibold">
                  {donationsError}
                </p>
              </TableCell>
            </TableRow>
          )}
          {!donationsLoading && donations?.data.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} align="center" className="h-[100px]">
                <p className="text-md italic text-black font-semibold">
                  No Data Found !
                </p>
              </TableCell>
            </TableRow>
          )}
          {donations?.data &&
            donations?.data.length > 0 &&
            filteredDonations.map((donation) => (
              <TableRow key={donation._id}>
                <TableCell>
                  <div>
                    <div className="font-medium">
                      {donation.userDetails.fullName}
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {donation.userDetails._id}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {donation.userDetails.phone && (
                      <div className="flex items-center text-sm">
                        <Phone className="mr-1 h-3 w-3" />
                        {donation.userDetails.phone}
                      </div>
                    )}

                    <div className="flex items-center text-sm">
                      <Mail className="mr-1 h-3 w-3" />
                      {donation.userDetails.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{donation.order_id}</TableCell>
                <TableCell>{donation.amount} Rp</TableCell>
                <TableCell>{donation.method}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <DynamicPagination data={donations?.data!} />
    </CardContent>
  );
};

export default DonationsList;

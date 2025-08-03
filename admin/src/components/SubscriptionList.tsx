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

const SubscriptionList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: subscriptions,
    loading: subscriptionsLoading,
    error: subscriptionsError,
  } = useSelector((state: RootState) => state.subscriptions);
  const { currentItems } = useSelector((state: RootState) => state.pagination);

  const filteredSubs = currentItems.filter((subs) => {
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
            <TableHead>Order ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Expire Info</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptionsLoading && (
            <TableRow>
              <TableCell colSpan={7} align="center" className="h-[100px]">
                <Loader className="animate-spin" size={34} />
              </TableCell>
            </TableRow>
          )}
          {subscriptionsError && !subscriptions?.data && (
            <TableRow>
              <TableCell colSpan={7} align="center" className="h-[100px]">
                <p className="text-md italic text-red-500 font-semibold">
                  {subscriptionsError}
                </p>
              </TableCell>
            </TableRow>
          )}
          {!subscriptionsLoading && subscriptions?.data.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} align="center" className="h-[100px]">
                <p className="text-md italic text-black font-semibold">
                  No Data Found !
                </p>
              </TableCell>
            </TableRow>
          )}
          {subscriptions?.data &&
            subscriptions?.data.length > 0 &&
            filteredSubs.map((subs) => (
              <TableRow key={subs._id}>
                <TableCell>
                  <div>
                    <div className="font-medium">
                      {subs.userDetails.fullName}
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {subs.userDetails._id}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{subs.order_id}</TableCell>
                <TableCell>{subs.amount} Rp</TableCell>
                <TableCell>
                  {subs.method[0].toUpperCase() + subs.method.slice(1)}
                </TableCell>
                <TableCell>
                  {subs.status[0].toUpperCase() + subs.status.slice(1)}
                </TableCell>
                <TableCell>
                  <div>01/07/2025</div>
                  <div>01/08/2025</div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <DynamicPagination data={subscriptions?.data!} />
    </CardContent>
  );
};

export default SubscriptionList;

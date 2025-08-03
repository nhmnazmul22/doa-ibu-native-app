"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, Satellite, User, Users, Wallet } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useEffect } from "react";
import { fetchSubscriptions } from "@/store/subscriptionSlice";
import { formatCurrency } from "@/lib/utils";
import { fetchDonations } from "@/store/donationSlice";
import { fetchDoas } from "@/store/doasSlice";
import { fetchMothers } from "@/store/mothersSlice";
import { fetchAllUser } from "@/store/allUserSlice";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const { items: subscriptions } = useSelector(
    (state: RootState) => state.subscriptions
  );
  const { items: donations } = useSelector(
    (state: RootState) => state.donations
  );
  const { items: doas } = useSelector((state: RootState) => state.doas);
  const { items: mothers } = useSelector((state: RootState) => state.mothers);
  const { items: users } = useSelector((state: RootState) => state.users);

  const totalSubscription = subscriptions?.data.reduce(
    (prevValue, nextValue) => prevValue + nextValue.amount,
    0
  );

  const totalDonations = donations?.data.reduce(
    (pervValue, nextValue) => pervValue + nextValue.amount,
    0
  );

  const subscriptionsQrisPayments = subscriptions?.data.filter(
    (item) => item.method === "qris"
  )!;
  const donationQrisPayments = donations?.data.filter(
    (item) => item.method === "qris"
  )!;

  const subscriptionsGopayPayments = subscriptions?.data.filter(
    (item) => item.method === "gopay"
  )!;
  const donationGopayPayments = donations?.data.filter(
    (item) => item.method === "gopay"
  )!;

  let qrisPaymentsQuantity =
    subscriptionsQrisPayments.length + donationQrisPayments.length;

  let gopayPaymentsQuantity =
    subscriptionsGopayPayments.length + donationGopayPayments.length;

  let qrisPaymentAmount = 0;

  qrisPaymentAmount += subscriptionsQrisPayments.reduce(
    (prev, next) => prev + next.amount,
    0
  );
  qrisPaymentAmount += donationQrisPayments.reduce(
    (prev, next) => prev + next.amount,
    0
  );

  let gopayPaymentAmount = 0;

  gopayPaymentAmount += subscriptionsGopayPayments.reduce(
    (prev, next) => prev + next.amount,
    0
  );
  gopayPaymentAmount += donationGopayPayments.reduce(
    (prev, next) => prev + next.amount,
    0
  );

  useEffect(() => {
    dispatch(fetchSubscriptions());
    dispatch(fetchDonations());
    dispatch(fetchDoas());
    dispatch(fetchMothers());
    dispatch(fetchAllUser());
  }, []);

  return (
    <section className="p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Subscription
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalSubscription)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Donation
            </CardTitle>
            <Banknote className="h-4 w-4 " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalDonations)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Doa Published
            </CardTitle>
            <User className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{doas?.data.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Mothers & Users
            </CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users?.data.length}</div>
          </CardContent>
        </Card>
      </div>
      <Card className="my-5">
        <CardHeader>
          <CardTitle>Subscriptions & Donations Info</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment Method</TableHead>
                <TableHead className="text-center">Jumlah Transaksi</TableHead>
                <TableHead className="text-right">Nominal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">QRIS</TableCell>
                <TableCell className="text-center">
                  {qrisPaymentsQuantity}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(qrisPaymentAmount)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">GoPay</TableCell>
                <TableCell className="text-center">
                  {gopayPaymentsQuantity}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(gopayPaymentAmount)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="my-5">
        <CardHeader>
          <CardTitle>Mother & Users Info</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Type</TableHead>
                <TableHead className="text-center">Total Donation</TableHead>
                <TableHead className="text-center">
                  Total Subscriptions
                </TableHead>
                <TableHead className="text-center">Total Spend</TableHead>
                <TableHead className="text-right">Total User</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Users</TableCell>
                <TableCell className="text-center">
                  {formatCurrency(totalDonations)}
                </TableCell>
                <TableCell className="text-center">
                  {formatCurrency(totalSubscription)}
                </TableCell>
                <TableCell className="text-center">
                  {totalSubscription &&
                    totalDonations &&
                    formatCurrency(totalSubscription + totalDonations)}
                </TableCell>
                <TableCell className="text-right">
                  {users?.data.length}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}

import { AppSidebar } from "@/components/Layout/AppSideBar";
import Header from "@/components/Layout/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, TrendingUp, User, Users, Wallet } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Header />
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
                <div className="text-2xl font-bold">10,000 Rp</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Status Donation
                </CardTitle>
                <Banknote className="h-4 w-4 " />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">20,000 Rp</div>
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
                <div className="text-2xl font-bold">20</div>
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
                <div className="text-2xl font-bold">10</div>
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
                    <TableHead className="text-center">
                      Jumlah Transaksi
                    </TableHead>
                    <TableHead className="text-right">Nominal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">QRIS</TableCell>
                    <TableCell className="text-center">10</TableCell>
                    <TableCell className="text-right">20,000 Rp</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">GoPay</TableCell>
                    <TableCell className="text-center">10</TableCell>
                    <TableCell className="text-right">20,000 Rp</TableCell>
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
                    <TableHead className="text-center">
                      Total Donation
                    </TableHead>
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
                    <TableCell className="text-center">100,000 Rp</TableCell>
                    <TableCell className="text-center">120,000 Rp</TableCell>
                    <TableCell className="text-center">220,000 Rp</TableCell>
                    <TableCell className="text-right">22</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mothers</TableCell>
                    <TableCell className="text-center">100,000 Rp</TableCell>
                    <TableCell className="text-center">120,000 Rp</TableCell>
                    <TableCell className="text-center">220,000 Rp</TableCell>
                    <TableCell className="text-right">22</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </main>
    </SidebarProvider>
  );
}

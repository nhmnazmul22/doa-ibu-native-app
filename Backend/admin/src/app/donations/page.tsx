"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RootLayout from "@/components/Layout/RootLayout";
import { ListOrdered, Mail, Phone, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function DonationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <RootLayout>
      <section className="p-5">
        <h1 className="text-3xl font-bold tracking-tight">
          Donations Management
        </h1>
        <Card className="my-10">
          <CardHeader>
            <CardTitle>Donation Lists</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama, nomor HP, atau email customer..."
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
                <TableRow>
                  <TableCell>
                    <div>
                      <div className="font-medium">User 01</div>
                      <div className="text-sm text-gray-500">
                        ID: 32452353253...
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Phone className="mr-1 h-3 w-3" />
                        45634563456
                      </div>

                      <div className="flex items-center text-sm">
                        <Mail className="mr-1 h-3 w-3" />
                        gmail.com
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>45634563456</TableCell>
                  <TableCell>20000 Rp</TableCell>
                  <TableCell>QRIS</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </RootLayout>
  );
}

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
import { Mail, Phone, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function MothersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <RootLayout>
      <section className="p-5">
        <h1 className="text-3xl font-bold tracking-tight">
          Mothers Management
        </h1>
        <Card className="my-10">
          <CardHeader>
            <CardTitle>Mother Lists</CardTitle>
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
                  <TableHead>Mother Info</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Total Followers</TableHead>
                  <TableHead>Total Loved</TableHead>
                  <TableHead>Total Doa Upload</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div>
                      <div className="font-medium">Mother 01</div>
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
                  <TableCell>20K</TableCell>
                  <TableCell>40k</TableCell>
                  <TableCell>400</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </RootLayout>
  );
}

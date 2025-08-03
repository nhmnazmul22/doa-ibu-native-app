import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
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
            <TableHead>Customer Info</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Total Subscription</TableHead>
            <TableHead>Total Donations</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <div>
                <div className="font-medium">User 01</div>
                <div className="text-sm text-gray-500">ID: 32452353253...</div>
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
            <TableCell>Free</TableCell>
            <TableCell>
              <div className="flex gap-2 items-center border h-full">
                <Badge variant="default">User</Badge>
                <Badge variant="default">Mother</Badge>
              </div>
            </TableCell>
            <TableCell>20,000 Rp</TableCell>
            <TableCell>20,000 Rp</TableCell>
            <TableCell>
              <Button>
                <Link
                  href="https://dashboard.clerk.com/apps/app_30bPpOlynT970uJ8SQXo9Di13Bm/instances/ins_30bWCtZXp0awevl29UA1wYkTFhq/users"
                  target="_blank"
                >
                  Go to Clerk
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  );
};

export default UserList;

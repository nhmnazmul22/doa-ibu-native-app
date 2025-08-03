"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import RootLayout from "@/components/Layout/RootLayout";
import UserList from "@/components/UserList";

export default function UsersPage() {
  return (
    <RootLayout>
      <section className="p-5">
        <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
        <Card className="my-10">
          <CardHeader>
            <CardTitle>Users Lists</CardTitle>
          </CardHeader>
          <UserList />
        </Card>
      </section>
    </RootLayout>
  );
}

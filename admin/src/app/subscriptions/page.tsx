"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import RootLayout from "@/components/Layout/RootLayout";
import { useState } from "react";
import SubscriptionList from "@/components/SubscriptionList";

export default function SubscriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <section className="p-5">
      <h1 className="text-3xl font-bold tracking-tight">
        Subscriptions Management
      </h1>
      <Card className="my-10">
        <CardHeader>
          <CardTitle>Subscription Lists</CardTitle>
        </CardHeader>
        <SubscriptionList />
      </Card>
    </section>
  );
}

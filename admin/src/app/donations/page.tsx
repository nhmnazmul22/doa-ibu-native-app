"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import RootLayout from "@/components/Layout/RootLayout";
import DonationsList from "@/components/DonationList";

export default function DonationsPage() {
  return (
    <section className="p-5">
      <h1 className="text-3xl font-bold tracking-tight">
        Donations Management
      </h1>
      <Card className="my-10">
        <CardHeader>
          <CardTitle>Donation Lists</CardTitle>
        </CardHeader>
        <DonationsList />
      </Card>
    </section>
  );
}

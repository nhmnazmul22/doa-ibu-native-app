import RootLayout from "@/components/Layout/RootLayout";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
export default function PricingPage() {
  return (
    <RootLayout>
      <section className="p-5">
        <Tabs defaultValue="free" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="free">Free Pricing</TabsTrigger>
            <TabsTrigger value="premium">Premium Pricing</TabsTrigger>
          </TabsList>
          <TabsContent value="free">
            <div className="max-w-[600px] mx-auto mt-10 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label>Enter Pricing Title</Label>
                <Input placeholder="Enter title" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Enter Price</Label>
                <Input placeholder="15000, 25000, 30000 etc." />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Enter Short Description</Label>
                <Textarea placeholder="Write something about pricing..."></Textarea>
              </div>
              <div>
                <h3>Features:</h3>
                <div className="mt-2 flex flex-col gap-3">
                  <div className="flex gap-2 items-center">
                    <Checkbox />{" "}
                    <Label>Dengarkan doa bawaan sistem (offline).</Label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Checkbox />{" "}
                    <Label>Dengarkan doa bawaan sistem (offline).</Label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Checkbox />{" "}
                    <Label>Dengarkan doa bawaan sistem (offline).</Label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Checkbox />{" "}
                    <Label>Dengarkan doa bawaan sistem (offline).</Label>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="premium">
            {" "}
            <div className="max-w-[600px] mx-auto mt-10 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label>Enter Pricing Title</Label>
                <Input placeholder="Enter title" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Enter Price</Label>
                <Input placeholder="15000, 25000, 30000 etc." />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Enter Short Description</Label>
                <Textarea placeholder="Write something about pricing..."></Textarea>
              </div>
              <div>
                <h3>Features:</h3>
                <div className="mt-2 flex flex-col gap-3">
                  <div className="flex gap-2 items-center">
                    <Checkbox />{" "}
                    <Label>Dengarkan doa bawaan sistem (offline).</Label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Checkbox />{" "}
                    <Label>Dengarkan doa bawaan sistem (offline).</Label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Checkbox />{" "}
                    <Label>Dengarkan doa bawaan sistem (offline).</Label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Checkbox />{" "}
                    <Label>Dengarkan doa bawaan sistem (offline).</Label>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </RootLayout>
  );
}

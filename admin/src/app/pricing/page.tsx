"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/axios";
import { AppDispatch, RootState } from "@/store";
import { fetchPricing } from "@/store/PricingSlice";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

interface FeaturesType {
  text: string;
  available: boolean;
}

interface PricingItem {
  _id: string;
  type: string;
  title: string;
  price: string;
  shortDes: string;
  features: FeaturesType[];
}

export default function PricingPage() {
  const [pricingData, setPricingData] = useState<PricingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.pricing);

  useEffect(() => {
    dispatch(fetchPricing());
  }, []);

  useEffect(() => {
    if (items?.data) {
      setPricingData(
        items.data.map((item: any) => ({
          _id: item._id,
          type: item.type,
          title: item.title,
          price: item.price,
          shortDes: item.shortDes,
          features: item.features,
        }))
      );
    }
  }, [items]);

  const handleInputChange = (
    index: number,
    field: Exclude<keyof PricingItem, "features">,
    value: string
  ) => {
    setPricingData((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleFeatureChange = (
    index: number,
    featureIndex: number,
    checked: CheckedState
  ) => {
    setPricingData((prev) => {
      const updated = [...prev];
      updated[index].features[featureIndex].available = checked === true;
      return updated;
    });
  };

  const handleUpdate = async (index: number) => {
    const item = pricingData[index];
    try {
      setLoading(true);
      const res = await api.put(`/update-pricing/${item._id}`, {
        title: item.title,
        price: item.price,
        shortDes: item.shortDes,
        features: item.features,
      });

      if (res.status === 201) {
        toast.success(
          `${item.type === "free" ? "Free" : "Premium"} Pricing updated`
        );
        dispatch(fetchPricing());
      }
    } catch (err) {
      console.error(err);
      toast.error("Pricing update failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="p-5">
      <Tabs defaultValue={pricingData[0]?.type || "free"} className="w-full">
        <TabsList className="max-w-[600px] w-full mx-auto">
          {pricingData.map((item) => (
            <TabsTrigger key={item.type} value={item.type}>
              {item.type === "free" ? "Free Pricing" : "Premium Pricing"}
            </TabsTrigger>
          ))}
        </TabsList>

        {pricingData.map((item, index) => (
          <TabsContent key={item.type} value={item.type}>
            <div className="max-w-[600px] mx-auto mt-10 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label>Enter Pricing Title</Label>
                <Input
                  placeholder="Enter title"
                  value={item.title}
                  onChange={(e) =>
                    handleInputChange(index, "title", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Enter Price</Label>
                <Input
                  placeholder="15000, 25000, 30000 etc."
                  value={item.price}
                  onChange={(e) =>
                    handleInputChange(index, "price", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Enter Short Description</Label>
                <Textarea
                  placeholder="Write something about pricing..."
                  value={item.shortDes}
                  onChange={(e) =>
                    handleInputChange(index, "shortDes", e.target.value)
                  }
                />
              </div>
              <div>
                <h3>Features:</h3>
                <div className="mt-2 flex flex-col gap-3">
                  {item.features.map((feature, featureIndex) => (
                    <div className="flex gap-2 items-center" key={featureIndex}>
                      <Checkbox
                        checked={feature.available}
                        onCheckedChange={(checked) =>
                          handleFeatureChange(index, featureIndex, checked)
                        }
                      />
                      <Label>{feature.text}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <Button
                className="mt-5 cursor-pointer"
                onClick={() => handleUpdate(index)}
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Update"}
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

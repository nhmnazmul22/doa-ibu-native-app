import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { deleteCookie } from "@/lib/cookie";
import { useState } from "react";

const Header = () => {
  const [loading, setLoading] = useState(false);

  const route = useRouter();
  const pathName = usePathname();

  if (pathName.includes("/secure_admin/login")) {
    return null;
  }

  const handleLogout = async () => {
    try {
      setLoading(true);
      deleteCookie();
      toast.success("Log out successful");
      route.replace("/login");
    } catch (err) {
      console.error(err);
      toast.error("Log out failed, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="flex justify-between items-center p-4 gap-4 w-full shadow">
      <div>
        <SidebarTrigger />
      </div>
      <div className="flex gap-8">
        <Button className="cursor-pointer" onClick={handleLogout}>
          {loading ? <Loader2 className="animate-spin" size={24} /> : "Log Out"}
        </Button>
      </div>
    </header>
  );
};

export default Header;

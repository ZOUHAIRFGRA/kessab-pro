import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ui/ModeToggle";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-background shadow-md">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-primary">KessabPro</h1>

      {/* Right Section: Theme Toggle + CTA Button */}
      <div className="flex items-center gap-4">
        <ModeToggle />
        <Button className="hidden sm:block">Get the App</Button>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { ModeToggle } from "./mode-toogle";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { useNavigate,Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
//   const { user } = useSelector((state) => state.user);

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-background border-b border-border shadow-md">
      {/* Left - Logo */}
      <Link className="text-xl font-bold text-primary" to="/">MyApp</Link>

      {/* Right - Theme Toggle & Actions */}
      <div className="flex items-center gap-4">
        {/* {!user && ( */}
          <>
            <Button variant="outline" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button variant="outline" onClick={() => navigate("/register")}>
              Sign Up
            </Button>
          </>
        {/* )} */}
        <ModeToggle />
      </div>
    </nav>
  );
}

export default Navbar;

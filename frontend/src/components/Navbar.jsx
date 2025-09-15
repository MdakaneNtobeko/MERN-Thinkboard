import React from "react";
import { Link } from "react-router";
import { PlusIcon, Unlock } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { logout } = useAuth0();

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            ThinkBoard
          </h1>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="w-5 h-5" />
              <span>New Note</span>
            </Link>
            <Link
              to={"/logout"}
              className="btn btn-primary bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
            >
              <Unlock className="w-5 h-5" />
              <span>Lock</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

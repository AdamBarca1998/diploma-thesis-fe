import Link from "next/link";
import RefreshCacheButton from "./refresh-cache-button";
 
export function AppNavBar() {

  return (
    <div className="navbar bg-base-100 h-16 flex items-center justify-between">
      <div>
        <Link className="btn btn-ghost text-xl" href="/">Home</Link>
      </div>

      <div>
        <RefreshCacheButton />
      </div>
    </div>
  );
}
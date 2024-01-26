import Link from "next/link";
 
export function AppNavBar() {

  return (
    <div className="navbar bg-base-100 h-16">
      <Link className="btn btn-ghost text-xl" href="/">Home</Link>  
    </div>
  );
}
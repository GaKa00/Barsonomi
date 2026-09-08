 
 import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

 import Link from "next/link";
 export default function Navbar() {
  return (
    <div>   
         <header className="topbar">
        <div>
          <p className="eyebrow">Tuesday, August 26, 2026</p>
          <h1>
            Good morning, Jamie <span className="wave">✦</span>
          </h1>
        </div>
        <Button asChild>
          <Link href="/expenses">
            <Plus size={17} /> Add expense
          </Link>
        </Button>
      </header></div>
  )
 }
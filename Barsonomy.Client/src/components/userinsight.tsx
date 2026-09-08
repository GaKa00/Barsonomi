import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function UserInsight() {
    return (
        <div>
            <section className="insight">
          <div className="insight-icon">✦</div>
          <div>
            <strong>A small win worth noticing</strong>
            <p>
              You&apos;re spending 14% less on dining out than last month. Keep
              it up.
            </p>
          </div>
          <Link href="/expenses">
            See insights <ArrowUpRight size={15} />
          </Link>
        </section>
        </div>
    );
}
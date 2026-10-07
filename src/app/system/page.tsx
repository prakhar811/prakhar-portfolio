import type { Metadata } from "next";
import { SystemTerminal } from "@/components/command/SystemTerminal";

export const metadata: Metadata = {
  title: "System Terminal",
  description: "An interface easter egg — not a real shell.",
  robots: { index: false },
};

export default function SystemPage() {
  return (
    <section aria-labelledby="sys-title" className="container-x flex min-h-svh flex-col justify-center py-28">
      <p className="label">PRKH.SYS</p>
      <h1 id="sys-title" className="display display-md mt-4">System terminal</h1>
      <p className="prose-tight mt-3 max-w-xl">An interface easter egg. It never executes anything — try <code className="text-amber">help</code>.</p>
      <div className="mt-8 h-[60vh] max-w-3xl overflow-hidden rounded-2xl border border-line-strong bg-elevated/90">
        <SystemTerminal autoFocus={false} />
      </div>
    </section>
  );
}

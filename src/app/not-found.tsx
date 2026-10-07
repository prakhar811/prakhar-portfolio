import { LinkButton } from "@/components/ui/LinkButton";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-svh flex-col justify-center py-28">
      <p className="label">Error 404</p>
      <h1 className="display display-lg mt-4">Signal lost.</h1>
      <p className="prose-tight mt-4 max-w-md">That route doesn&apos;t exist in this system.</p>
      <div className="mt-8">
        <LinkButton href="/" variant="primary">Back to index</LinkButton>
      </div>
    </section>
  );
}

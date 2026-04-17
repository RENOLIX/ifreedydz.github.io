import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="max-w-xl text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Erreur 404
        </p>
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          La page demandee n&apos;existe pas.
        </h1>
        <p className="mt-4 text-base text-muted-foreground md:text-lg">
          Revenez a l&apos;accueil pour continuer votre visite.
        </p>
        <Link
          className="mt-8 inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
          to="/"
        >
          Retour a l&apos;accueil
        </Link>
      </div>
    </main>
  );
}

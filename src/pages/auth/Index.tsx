import { Link } from "react-router-dom";
import { SignInCard } from "@/components/ui/signin";

export function AuthPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f5f7] px-6 py-16">
      <div className="grid w-full max-w-5xl gap-8 md:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-10 shadow-sm">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Connexion simple
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Un espace client de demonstration pour suivre une intervention.
          </h1>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Cette page reste en base de travail. On pourra ensuite la connecter
            a Convex pour le suivi SAV, les devis et les notifications.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-secondary"
          >
            Retour a l&apos;accueil
          </Link>
        </div>
        <div className="flex items-center">
          <SignInCard />
        </div>
      </div>
    </main>
  );
}

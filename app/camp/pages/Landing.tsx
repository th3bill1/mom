import { useEffect, useState } from "react";
import { CalendarDays, Phone, ArrowRight, ShieldCheck } from "lucide-react";
import type { Camp } from "../types";
import Info from "./Info";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";

export default function Landing() {
  const [camp, setCamp] = useState<Camp | null>(null);
  useEffect(() => { fetch("/data/camp.json").then(r=>r.json()).then(setCamp); }, []);
  if (!camp) return null;

  const highlights = [
    {
      title: "Archiwum zawsze pod ręką",
      description: "Zadania z tego i poprzednich obozów pozostają dostępne na stronie przez cały rok.",
      icon: ShieldCheck,
    },
    {
      title: "Powrót jeszcze w tym roku",
      description: "Nowa edycja pojawi się jesienią wraz z informacjami o miejscu i terminie.",
      icon: CalendarDays,
    },
    {
      title: "Po obozie dalej w kontakcie",
      description: "W razie jakichkolwiek pytań kontaktujcie się z nami na grupie. Zawsze będziemy chętni Wam pomóc.",
      icon: Phone,
    },
  ];

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-linear-to-br from-stone-50 via-white to-sky-50 p-6 shadow-sm md:p-8 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-sky-200/20 blur-3xl dark:bg-sky-500/5" />
        <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-amber-200/15 blur-3xl dark:bg-amber-500/5" />

        <div className="relative grid gap-8 lg:grid-cols-[1.25fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="gap-2 border border-border/70 bg-background/90 px-3 py-1 text-xs font-medium tracking-wide text-foreground shadow-sm dark:bg-slate-900/80">
                IV Mielecki Obóz Matematyczny
              </Badge>
              <Badge variant="outline" className="border-border/70 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm dark:bg-slate-950/40">
                Edycja zakończona
              </Badge>
            </div>

            <div className="space-y-3">
              <h1 className="max-w-2xl text-4xl font-black tracking-tight text-foreground sm:text-5xl">
                Czwarty obóz już się zakończył, ale Wasza przygoda z matematyką trwa dalej!
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Dziękujemy wszystkim uczestnikom za obecność, energię i świetną atmosferę.
                Na stronie pozostają wszystkie zadania z tego i poprzednich obozów, a nowa
                edycja wróci jesienią wraz z informacjami o miejscu i dacie.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {highlights.map(({ title, description, icon: Icon }) => (
                <Card key={title} className="border-border/70 bg-background/90 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
                  <CardContent className="space-y-3 p-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm dark:bg-slate-100 dark:text-slate-950">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-sm font-semibold leading-5 text-foreground">{title}</h2>
                      <p className="text-sm leading-6 text-muted-foreground">{description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2 text-md text-muted-foreground">
              Jeśli chcecie nas wesprzeć, pytajcie o obóz swoich nauczycieli. Powodzenia na konkursach i do zobaczenia!
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -inset-6 rounded-[2rem] bg-linear-to-br from-amber-200/40 via-amber-100/20 to-transparent blur-3xl dark:from-amber-400/10 dark:via-transparent dark:to-transparent" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-background shadow-2xl dark:border-white/10 dark:bg-slate-950/80">
              <img
                src={camp.posterUrl}
                alt="Plakat Mieleckiego Obozu Matematycznego"
                className="aspect-3/4 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* <Info /> */}
    </div>
  );
}

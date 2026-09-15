export default function About() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 px-2 py-10">
      <header className="space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Mielecki Obóz Matematyczny
        </p>  
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Od uczniów dla uczniów.
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-8 text-muted-foreground">
          Mielecki Obóz Matematyczny tworzą absolwenci mieleckiego „Kopernika”,
          których połączyła matematyka. Kilka lat temu sami przygotowywaliśmy
          się do olimpiad i konkursów. Dziś wracamy, żeby dzielić się tym,
          czego nauczyliśmy się po drodze, i pokazać, że ambitna matematyka
          może być czymś więcej niż siedzeniem nad kartką z zadaniami.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Jak to się zaczęło?</h2>
        <div className="space-y-4 leading-7 text-muted-foreground">
          <p>
            Zaczęło się w 2021 roku od pomysłu, żeby wrócić do szkoły i
            poprowadzić kilka zajęć dla młodszych kolegów. Chcieliśmy pokazać
            matematykę od strony, której sami szukaliśmy, przygotowując się do
            konkursów i olimpiad: wymagającą, ale też pełną ciekawych pomysłów
            i satysfakcji z odkrywania rozwiązań. Kilka wykładów szybko przerodziło się w pełnoprawny obóz.
          </p>
            
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-semibold">Kto za tym stoi?</h2>
          <p className="mt-2 text-muted-foreground">
            Za obozem stoi grupa absolwentów II LO im. Mikołaja Kopernika w
            Mielcu. Łączy nas matematyka, ale każdy z nas wnosi do obozu własne
            doświadczenia i zainteresowania.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Tomasz Martyński", "Jeden z założycieli Obozu i jego główny organizator, obecnie student matematyki."],
            ["Wojciech Wójcik", "Jeden z założycieli Obozu, obecnie student, informatyk."],
            ["Daniel Pazdro", "Jeden z założycieli Obozu, obecnie student informatyki i pasjonat chemii."],
            ["Anna Martyńska", "Członkini kadry Mieleckiego Obozu Matematycznego, finalistka Olimpiady Matematycznej, obecnie studentka chemii."],
            ["Daniel Kopacz", "Członek kadry Mieleckiego Obozu Matematycznego, obecnie student matematyki."],
          ].map(([name, description]) => (
            <article key={name} className="rounded-xl border p-5">
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="mt-2 leading-6 text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-muted/30 p-6 md:p-8">
        <h2 className="text-2xl font-semibold">Po co to robimy?</h2>
        <div className="mt-4 space-y-4 leading-7 text-muted-foreground">
          <p>
            Nie chcemy tylko przygotowywać do kolejnego etapu olimpiady.
            Chcemy stworzyć miejsce, w którym ludzie o podobnych zainteresowaniach mogą się
            poznać i rozwijać razem. Dlatego obok wykładów i konkursów są u nas
            warsztaty, rozmowy, wspólna praca nad zadaniami i czas na budowanie
            relacji.
          </p>
        </div>
      </section>
    </div>
  );
}

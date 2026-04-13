import { Link } from "react-router";

export function PdfViewer({ file }: { file: string }) {
  return (
    <div className="w-full h-[85vh]">
      <iframe
        src={`${file}#view=FitH`}
        className="w-full h-full border rounded-lg"
        title="Tasks PDF"
      />
    </div>
  );
}

export function Mlodsza() {
  return <PdfViewer file="/data/cm3.pdf" />;
}

export function Starsza() {
  return <PdfViewer file="/data/cs3.pdf" />;
}

export function Elita() {
  return <PdfViewer file="/data/ce3.pdf" />;
}

export default function Tasks() {
  const groups = [
    { name: "Młodsza", path: "/zadania/mlodsza", color: "bg-blue-100 text-blue-900 hover:bg-blue-200 dark:bg-blue-950/50 dark:text-blue-200 dark:hover:bg-blue-900/60" },
    { name: "Starsza", path: "/zadania/starsza", color: "bg-green-100 text-green-900 hover:bg-green-200 dark:bg-green-950/50 dark:text-green-200 dark:hover:bg-green-900/60" },
    { name: "Elita", path: "/zadania/elita", color: "bg-violet-100 text-violet-900 hover:bg-violet-200 dark:bg-violet-950/50 dark:text-violet-200 dark:hover:bg-violet-900/60" },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-8">
      <h1 className="text-2xl font-bold text-foreground">
        Zobacz zadania swojej grupy
      </h1>

      <div className="grid gap-6 sm:grid-cols-3">
        {groups.map(g => (
          <Link
            key={g.name}
            to={g.path}
            className={`rounded-2xl shadow-md px-6 py-10 text-center font-semibold text-lg transition ${g.color}`}
          >
            {g.name}
          </Link>
        ))}
      </div>
      <div className="text-sm text-muted-foreground mt-4 max-w-md text-center">
        Jeśli chcesz zobaczyć zadania z poprzednich dni, przejdź do{" "}
        <Link to="/archiwum" className="text-blue-600 dark:text-blue-400 hover:underline">
          archiwum
        </Link>.
      </div>
    </div>
  );
}

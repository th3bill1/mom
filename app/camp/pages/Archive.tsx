import { Link } from "react-router";
import { PdfViewer } from "./Tasks";

export function Mlodsza1() {
  return <PdfViewer file="/data/cm1.pdf" />;
}

export function Starsza1() {
  return <PdfViewer file="/data/cs1.pdf" />;
}

export function Elita1() {
  return <PdfViewer file="/data/ce1.pdf" />;
}

export function Mlodsza2() {
  return <PdfViewer file="/data/cm2.pdf" />;
}

export function Starsza2() {
  return <PdfViewer file="/data/cs2.pdf" />;
}

export function Elita2() {
  return <PdfViewer file="/data/ce2.pdf" />;
}

export function Mlodsza3() {
  return <PdfViewer file="/data/cm3.pdf" />;
}

export function Starsza3() {
  return <PdfViewer file="/data/cs3.pdf" />;
}

export function Elita3() {
  return <PdfViewer file="/data/ce3.pdf" />;
}

export default function TasksArchive() {
  const groups = [
    { name: "Młodsza Dzień 1", path: "/archiwum/mlodsza1", color: "bg-blue-100 text-blue-900 hover:bg-blue-200 dark:bg-blue-950/50 dark:text-blue-200 dark:hover:bg-blue-900/60" },
    { name: "Starsza Dzień 1", path: "/archiwum/starsza1", color: "bg-green-100 text-green-900 hover:bg-green-200 dark:bg-green-950/50 dark:text-green-200 dark:hover:bg-green-900/60" },
    { name: "Elita Dzień 1", path: "/archiwum/elita1", color: "bg-violet-100 text-violet-900 hover:bg-violet-200 dark:bg-violet-950/50 dark:text-violet-200 dark:hover:bg-violet-900/60" },
    { name: "Młodsza Dzień 2", path: "/archiwum/mlodsza2", color: "bg-blue-100 text-blue-900 hover:bg-blue-200 dark:bg-blue-950/50 dark:text-blue-200 dark:hover:bg-blue-900/60" },
    { name: "Starsza Dzień 2", path: "/archiwum/starsza2", color: "bg-green-100 text-green-900 hover:bg-green-200 dark:bg-green-950/50 dark:text-green-200 dark:hover:bg-green-900/60" },
    { name: "Elita Dzień 2", path: "/archiwum/elita2", color: "bg-violet-100 text-violet-900 hover:bg-violet-200 dark:bg-violet-950/50 dark:text-violet-200 dark:hover:bg-violet-900/60" },
    { name: "Młodsza Dzień 3", path: "/archiwum/mlodsza3", color: "bg-blue-100 text-blue-900 hover:bg-blue-200 dark:bg-blue-950/50 dark:text-blue-200 dark:hover:bg-blue-900/60" },
    { name: "Starsza Dzień 3", path: "/archiwum/starsza3", color: "bg-green-100 text-green-900 hover:bg-green-200 dark:bg-green-950/50 dark:text-green-200 dark:hover:bg-green-900/60" },
    { name: "Elita Dzień 3", path: "/archiwum/elita3", color: "bg-violet-100 text-violet-900 hover:bg-violet-200 dark:bg-violet-950/50 dark:text-violet-200 dark:hover:bg-violet-900/60" },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-8">
      <h1 className="text-2xl font-bold text-foreground">
        Zobacz zadania z poszczególnych dni i grup
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
    </div>
  );
}

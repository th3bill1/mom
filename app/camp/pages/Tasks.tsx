import {
  buildLibraryEntries,
  DocumentLibrary,
  DocumentLibraryFileView,
  type LibraryCollection,
} from "../components/DocumentLibrary";

const TASK_COLLECTIONS: LibraryCollection[] = [
  {
    id: "piatek",
    title: "Piątek",
    sections: [
      {
        name: "Zadania dzienne",
        path: "dzienne",
        files: [
          { slug: "mlodsza", fileName: "piatek-mlodsza.pdf", name: "Grupa mlodsza", placeholder: "Zadanie będzie dostępne w momencie rozpoczęcia kontestu"  },
          { slug: "starsza", fileName: "piatek-starsza.pdf", name: "Grupa starsza", placeholder: "Zadanie będzie dostępne w momencie rozpoczęcia kontestu"  },
          { slug: "elita", fileName: "piatek-elita.pdf", name: "Grupa elita", placeholder: "Zadanie będzie dostępne w momencie rozpoczęcia kontestu" },
        ],
      },
    ],
  },
  {
    id: "sobota",
    title: "Sobota",
    sections: [
      {
        name: "Zadania dzienne",
        path: "dzienne",
        files: [
          { slug: "mlodsza", fileName: "sobota-mlodsza.pdf", name: "Grupa mlodsza", placeholder: "Zadanie będzie dostępne w momencie rozpoczęcia kontestu"  },
          { slug: "starsza", fileName: "sobota-starsza.pdf", name: "Grupa starsza", placeholder: "Zadanie będzie dostępne w momencie rozpoczęcia kontestu"  },
          { slug: "elita", fileName: "sobota-elita.pdf", name: "Grupa elita", placeholder: "Zadanie będzie dostępne w momencie rozpoczęcia kontestu" },
        ],
      },
    ],
  },
  {
    id: "mecz-matematyczny",
    title: "Mecz Matematyczny",
    sections: [
      {
        name: "Zadania finałowe",
        path: "final",
        files: [
          { slug: "grupa-1", fileName: "mecz-grupa-1.pdf", name: "Grupa 1", placeholder: "Zadanie będzie dostępne w momencie rozpoczęcia Meczu Matematycznego" },
          { slug: "grupa-2", fileName: "mecz-grupa-2.pdf", name: "Grupa 2", placeholder: "Zadanie będzie dostępne w momencie rozpoczęcia Meczu Matematycznego" },
        ],
      },
    ],
  },
];

const TASK_FILES = buildLibraryEntries(TASK_COLLECTIONS);

export function TasksFileView() {
  return (
    <DocumentLibraryFileView
      baseRoute="/zadania"
      backLabel="Wroc do zadan"
      entries={TASK_FILES}
      createFileUrl={(entry) =>
        `/data/tasks/${encodeURIComponent(entry.collectionId)}/${encodeURIComponent(entry.originalFileName)}`
      }
    />
  );
}

export default function Tasks() {
  return (
    <DocumentLibrary
      title="Zadania"
      description="Kontesty oraz zadania na Mecz Matematyczny. Pliki będą dodawane sukcesywnie w trakcie trwania obozu."
      baseRoute="/zadania"
      collections={TASK_COLLECTIONS}
      getFileUrl={(entry) =>
        `/data/tasks/${encodeURIComponent(entry.collectionId)}/${encodeURIComponent(entry.originalFileName)}`
      }
    />
  );
}

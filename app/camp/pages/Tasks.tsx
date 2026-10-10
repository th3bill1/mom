import {
  buildLibraryEntries,
  DocumentLibrary,
  DocumentLibraryFileView,
  type LibraryCollection,
} from "../components/DocumentLibrary";

const TASK_COLLECTIONS: LibraryCollection[] = [
   {
     id: "czwartek",
     title: "Czwartek",
     sections: [
       {
         name: "Zadania dzienne",
         path: "kontesty",
         files: [
           { slug: "mlodsza", fileName: "C1 młodsza.pdf", name: "Grupa młodsza"},
           { slug: "starsza", fileName: "C1 starsza.pdf", name: "Grupa starsza"},
           { slug: "elita", fileName: "C1 Elita.pdf", name: "Elita"},
         ],
       },
     ],
   },
  {
    id: "piatek",
    title: "Piątek",
    sections: [
      {
        name: "Zadania dzienne",
        path: "kontesty",
        files: [
          { slug: "mlodsza", fileName: "C2 młodsza.pdf", name: "Grupa młodsza"},
          { slug: "starsza", fileName: "C2 starsza.pdf", name: "Grupa starsza"},
          { slug: "elita", fileName: "C2 Elita.pdf", name: "Elita"},
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
        path: "kontesty",
        files: [
          { slug: "mlodsza", fileName: "C3 młodsza.pdf", name: "Grupa młodsza" },
          { slug: "starsza", fileName: "C3 starsza.pdf", name: "Grupa starsza" },
          { slug: "elita", fileName: "C3 Elita.pdf", name: "Elita" },
        ],
      },
      {
        name: "Mecz matematyczny",
        path: "mecz",
        files: [
          { slug: "mlodsza", fileName: "mmm.pdf", name: "Mecz młodszej"},
          { slug: "starsza", fileName: "mms.pdf", name: "Mecz starszej"},
          { slug: "elita", fileName: "mme.pdf", name: "Mecz elity"},
        ]
      }
    ],
  }
];

const TASK_FILES = buildLibraryEntries(TASK_COLLECTIONS);

export function TasksFileView() {
  return (
    <DocumentLibraryFileView
      baseRoute="/zadania"
      backLabel="Wróć do zadań"
      entries={TASK_FILES}
      createFileUrl={(entry) =>
        `/data/zadania/${encodeURIComponent(entry.collectionId)}/${encodeURIComponent(entry.originalFileName)}`
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
        `/data/zadania/${encodeURIComponent(entry.collectionId)}/${encodeURIComponent(entry.originalFileName)}`
      }
      subtext={false}
    />
  );
}

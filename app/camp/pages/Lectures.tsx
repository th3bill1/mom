import {
  buildLibraryEntries,
  DocumentLibrary,
  DocumentLibraryFileView,
  type LibraryCollection,
} from "../components/DocumentLibrary";

const LECTURE_COLLECTIONS: LibraryCollection[] = [
  {
    id: "piatek",
    title: "Piątek",
    sections: [
      {
        name: "Wykłady",
        path: "wyklady",
        files: [
          { slug: "min-max", fileName: "min-max.pdf", name: "Zasada minimum i maksimum"},
          { slug: "wyklad-2", fileName: "piatek-wyklad-2.pdf", name: "Wykład 2", placeholder: "Wykład będzie dostępny chwilę przed rozpoczęciem wykładu" },
          { slug: "wyklad-3", fileName: "piatek-wyklad-3.pdf", name: "Warsztaty 1", placeholder: "Zadania warsztatowe będą dostępne chwilę przed rozpoczęciem warsztatów" },
          { slug: "wyklad-4", fileName: "piatek-wyklad-4.pdf", name: "Warsztaty 2", placeholder: "Zadania warsztatowe będą dostępne chwilę przed rozpoczęciem warsztatów" },
        ],
      },
    ],
  },
  {
    id: "sobota",
    title: "Sobota",
    sections: [
      {
        name: "Wykłady",
        path: "wyklady",
        files: [
          { slug: "wyklad-1", fileName: "sobota-wyklad-1.pdf", name: "Wykład 1", placeholder: "Wykład będzie dostępny chwilę przed rozpoczęciem wykładu" },
          { slug: "wyklad-2", fileName: "sobota-wyklad-2.pdf", name: "Wykład 2", placeholder: "Wykład będzie dostępny chwilę przed rozpoczęciem wykładu" }
        ],
      },
    ],
  },
];

const LECTURE_FILES = buildLibraryEntries(LECTURE_COLLECTIONS);

export function LecturesFileView() {
  return (
    <DocumentLibraryFileView
      baseRoute="/wyklady"
      backLabel="Wroc do wykladow"
      entries={LECTURE_FILES}
      createFileUrl={(entry) =>
        `/data/wyklady_warsztaty/${encodeURIComponent(entry.collectionId)}/${encodeURIComponent(entry.categoryPath)}/${encodeURIComponent(entry.originalFileName)}`
      }
    />
  );
}

export default function Lectures() {
  return (
    <DocumentLibrary
      title="Wykłady i Warsztaty"
      description="Wykłady i zadania z warsztatów. Pliki będą dodawane sukcesywnie w trakcie trwania obozu."
      baseRoute="/wyklady"
      collections={LECTURE_COLLECTIONS}
      getFileUrl={(entry) =>
        `/data/wyklady_warsztaty/${encodeURIComponent(entry.collectionId)}/${encodeURIComponent(entry.categoryPath)}/${encodeURIComponent(entry.originalFileName)}`
      }
    />
  );
}

import {
  buildLibraryEntries,
  DocumentLibrary,
  DocumentLibraryFileView,
  type LibraryCollection,
} from "../components/DocumentLibrary";

const LECTURE_COLLECTIONS: LibraryCollection[] = [
  {
    id: "czwartek",
    title: "Czwartek",
    sections: [
      {
        name: "Wykłady",
        path: "wyklady",
        files: [
          { slug: "(1M) Przekształcenia algebraiczne", fileName: "(1M) Przekształcenia algebraiczne.pdf", name: "Przekształcenia algebraiczne"},
          { slug: "(1S) Niezmienniki", fileName: "(1S) Niezmienniki.pdf", name: "Niezmienniki"},
          { slug: "(1E) Ciągi", fileName: "(1E) Ciągi.pdf", name: "Ciągi"},
          
        ],
      },
      {
        name: "Warsztaty",
        path: "warsztaty",
        files: [
          { slug: "(1M) Lingwistyka matematyczna", fileName: "(1M) Lingwistyka matematyczna.pdf", name: "Lingiwstyka matematyczna"}
        ]
      }
    ],
  },
  {
    id: "piatek",
    title: "Piątek",
    sections: [
      {
        name: "Wykłady",
        path: "wyklady",
        files: [
          { slug: "(2M) Własności trójkąta", fileName: "(2M) Własności trójkąta.pdf", name: "Własności trójkąta"},
          { slug: "(2S) Potęga punktu", fileName: "(2S) Potęga punktu.pdf", name: "Potęga punktu"},
          { slug: "(2E) Wykładniki p-adyczne", fileName: "(2E) Wykładniki p-adyczne.pdf", name: "Wykładniki p-adyczne"},
          
        ],
      },
      {
        name: "Warsztaty",
        path: "warsztaty",
        files: [
          { slug: "(2W) Punkty izogonalnie sprzężone", fileName: "(2W) Punkty izogonalnie sprzężone.pdf", name: "Punkty izogonalnie sprzężone"}
        ]
      }
    ],
  }
];

const LECTURE_FILES = buildLibraryEntries(LECTURE_COLLECTIONS);

export function LecturesFileView() {
  return (
    <DocumentLibraryFileView
      baseRoute="/wyklady"
      backLabel="Wróć do wykładów"
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
      subtext={false}
    />
  );
}

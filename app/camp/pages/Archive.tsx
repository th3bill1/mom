import {
  buildLibraryEntries,
  DocumentLibrary,
  DocumentLibraryFileView,
  type LibraryCollection,
} from "../components/DocumentLibrary";
import archiveManifest from "~/../data/archiwum/archive-files.json";

const ARCHIVE = archiveManifest.camps as LibraryCollection[];
const ARCHIVE_FILES = buildLibraryEntries(ARCHIVE);

function toArchiveFileUrl(collectionId: string, categoryPath: string, fileName: string) {
  const segments = ["data", "archiwum", collectionId, categoryPath, fileName];
  return `/${segments.map((segment) => encodeURIComponent(segment)).join("/")}`;
}

export function ArchiveFileView() {
  return (
    <DocumentLibraryFileView
      baseRoute="/archiwum"
      backLabel="Wróć do archiwum"
      entries={ARCHIVE_FILES}
      createFileUrl={(entry) =>
        toArchiveFileUrl(entry.collectionId, entry.categoryPath, entry.originalFileName)
      }
    />
  );
}

export default function Archive() {
  return (
    <DocumentLibrary
      title="Archiwum materiałów MOM"
      description="Zbiór zawiera kontesty, mecze i wykłady z poprzednich edycji obozu."
      baseRoute="/archiwum"
      collections={ARCHIVE}
      getFileUrl={(entry) =>
        toArchiveFileUrl(entry.collectionId, entry.categoryPath, entry.originalFileName)
      }
    />
  );
}

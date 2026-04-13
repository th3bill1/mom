import { FileText, Folder } from "lucide-react";
import { Link, Navigate, useParams } from "react-router";
import { Badge } from "~/components/ui/badge";
import { buttonVariants } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";
import { PdfViewer } from "./Tasks";
import archiveManifest from "~/../data/archiwum/archive-files.json"

type ArchiveFile = {
  slug: string;
  fileName: string;
  name: string;
};

type ArchiveSection = {
  name: string;
  path: string;
  files: ArchiveFile[];
};

type ArchiveCamp = {
  id: string;
  title: string;
  sections: ArchiveSection[];
};

type ArchiveFileEntry = {
  campId: string;
  campTitle: string;
  categoryName: string;
  categoryPath: string;
  originalFileName: string;
  displayName: string;
  fileSlug: string;
};

const ARCHIVE = archiveManifest.camps as ArchiveCamp[];

function toArchiveFileUrl(campId: string, categoryPath: string, fileName: string) {
  const segments = ["data", "archiwum", campId, categoryPath, fileName];
  return `/${segments.map((segment) => encodeURIComponent(segment)).join("/")}`;
}

function countFiles(camp: ArchiveCamp) {
  return camp.sections.reduce((total, section) => total + section.files.length, 0);
}

const ARCHIVE_FILES: ArchiveFileEntry[] = (() => {
  return ARCHIVE.flatMap((camp) =>
    camp.sections.flatMap((section) => {
      return section.files.map((file) => {
        return {
          campId: camp.id,
          campTitle: camp.title,
          categoryName: section.name,
          categoryPath: section.path,
          originalFileName: file.fileName,
          displayName: file.name,
          fileSlug: file.slug,
        };
      });
    }),
  );
})();

function findArchiveFile(campId: string, categoryPath: string, fileSlug: string) {
  return ARCHIVE_FILES.find(
    (entry) =>
      entry.campId === campId &&
      entry.categoryPath === categoryPath &&
      entry.fileSlug === fileSlug,
  );
}

export function ArchiveFileView() {
  const { campId, category, fileSlug } = useParams();

  if (!campId || !category || !fileSlug) {
    return <Navigate to="/archiwum" replace />;
  }

  const fileEntry = findArchiveFile(campId, category, fileSlug);

  if (!fileEntry) {
    return <Navigate to="/archiwum" replace />;
  }

  const pdfUrl = toArchiveFileUrl(fileEntry.campId, fileEntry.categoryPath, fileEntry.originalFileName);

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Link to="/archiwum" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
          Wroc do archiwum
        </Link>
        <Badge variant="secondary">{fileEntry.campTitle}</Badge>
        <Badge variant="outline">{fileEntry.categoryName}</Badge>
      </div>
      <h1 className="text-lg font-semibold">{fileEntry.displayName}</h1>
      <PdfViewer file={pdfUrl} />
    </section>
  );
}

export default function Archive() {
  const allFiles = ARCHIVE.reduce((total, camp) => total + countFiles(camp), 0);

  return (
    <section className="space-y-6">
      <header className="rounded-xl border bg-muted/20 p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Folder className="h-5 w-5 text-muted-foreground" />
          <h1 className="text-xl font-semibold">Archiwum materiałów MOM</h1>
          <Badge variant="secondary">{allFiles} plików</Badge>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Zbiór zawiera kontesty, mecze i wykłady z poprzednich edycji obozu. Każdy materiał otwiera się bezpośrednio na stronie.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        {ARCHIVE.map((camp) => (
          <Card key={camp.id}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between gap-2 text-base">
                <span>{camp.title}</span>
                <Badge variant="outline">{countFiles(camp)} plików</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {camp.sections.map((section, sectionIndex) => (
                <div key={section.name} className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{section.name}</span>
                  </div>
                  <div className="space-y-1.5">
                    {section.files.map((file) => {
                      const entry = ARCHIVE_FILES.find(
                        (item) =>
                          item.campId === camp.id &&
                          item.categoryPath === section.path &&
                          item.fileSlug === file.slug,
                      );

                      if (!entry) {
                        return null;
                      }

                      return (
                        <Link
                          key={file.slug}
                          to={`/archiwum/${entry.campId}/${entry.categoryPath}/${entry.fileSlug}`}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "sm" }),
                          "h-auto w-full justify-between whitespace-normal px-2 py-2 text-left",
                        )}
                      >
                          <span className="line-clamp-2">{entry.displayName}</span>
                        </Link>
                      );
                    })}
                  </div>
                  {sectionIndex < camp.sections.length - 1 ? <Separator /> : null}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

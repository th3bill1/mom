import type { ReactNode } from "react";
import { Download, FileText, Folder } from "lucide-react";
import { Link, Navigate, useParams } from "react-router";
import { Badge } from "~/components/ui/badge";
import { buttonVariants } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

export type LibraryFile = {
  slug: string;
  fileName: string;
  name: string;
  placeholder?: string;
};

export type LibrarySection = {
  name: string;
  path: string;
  files: LibraryFile[];
};

export type LibraryCollection = {
  id: string;
  title: string;
  sections: LibrarySection[];
};

export type LibraryFileEntry = {
  collectionId: string;
  collectionTitle: string;
  categoryName: string;
  categoryPath: string;
  originalFileName: string;
  displayName: string;
  fileSlug: string;
  placeholder?: string;
};

type DocumentLibraryProps = {
  title: string;
  description: string;
  baseRoute: string;
  collections: LibraryCollection[];
  getFileUrl: (entry: LibraryFileEntry) => string;
  icon?: ReactNode;
};

type DocumentLibraryFileViewProps = {
  baseRoute: string;
  backLabel: string;
  entries: LibraryFileEntry[];
  createFileUrl: (entry: LibraryFileEntry) => string;
};

export function PdfViewer({ file }: { file: string }) {
  return (
    <div className="h-[85vh] w-full">
      <iframe
        src={`${file}#view=FitH`}
        className="h-full w-full rounded-lg border"
        title="Dokument PDF"
      />
    </div>
  );
}

export function buildLibraryEntries(collections: LibraryCollection[]): LibraryFileEntry[] {
  return collections.flatMap((collection) =>
    collection.sections.flatMap((section) =>
      section.files.map((file) => ({
        collectionId: collection.id,
        collectionTitle: collection.title,
        categoryName: section.name,
        categoryPath: section.path,
        originalFileName: file.fileName,
        displayName: file.name,
        fileSlug: file.slug,
        placeholder: (file as any).placeholder,
      })),
    ),
  );
}

function countCollectionFiles(collection: LibraryCollection) {
  return collection.sections.reduce((total, section) => total + section.files.length, 0);
}

export function DocumentLibrary({
  title,
  description,
  baseRoute,
  collections,
  getFileUrl,
  icon,
}: DocumentLibraryProps) {
  const entries = buildLibraryEntries(collections);

  const resolveRoute = (entry: LibraryFileEntry) => {
    return `${baseRoute}/${entry.collectionId}/${entry.categoryPath}/${entry.fileSlug}`;
  };

  return (
    <section className="space-y-6">
      <header className="rounded-xl border bg-muted/20 p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-2">
          {icon ?? <Folder className="h-5 w-5 text-muted-foreground" />}
          <h1 className="text-xl font-semibold">{title}</h1>
          <Badge variant="secondary">{entries.length} plikow</Badge>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        {collections.map((collection) => (
          <Card key={collection.id}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between gap-2 text-base">
                <span>{collection.title}</span>
                <Badge variant="outline">{countCollectionFiles(collection)} plikow</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {collection.sections.map((section, sectionIndex) => (
                <div key={`${collection.id}-${section.path}`} className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{section.name}</span>
                  </div>
                  <div className="space-y-1.5">
                    {section.files.map((file) => {
                      const entry = entries.find(
                        (item) =>
                          item.collectionId === collection.id &&
                          item.categoryPath === section.path &&
                          item.fileSlug === file.slug,
                      );

                      if (!entry) {
                        return null;
                      }

                      return (
                        <div
                          key={`${collection.id}-${section.path}-${file.slug}`}
                          className="flex items-center gap-1"
                        >
                          <div className="flex items-center gap-2 w-full">
                            <Link
                              to={resolveRoute(entry)}
                              className={cn(
                                buttonVariants({ variant: "ghost", size: "sm" }),
                                "h-auto flex-1 justify-start whitespace-normal px-2 py-2 text-left",
                              )}
                            >
                              <span className="line-clamp-2">{entry.displayName}</span>
                            </Link>

                            {entry.placeholder ? (
                              <>
                                <Badge variant="outline">Niedostępne</Badge>
                                <button
                                  className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8 opacity-50 cursor-not-allowed")}
                                  aria-disabled="true"
                                  title="Plik niedostępny"
                                  disabled
                                >
                                  <Download className="h-4 w-4" />
                                </button>
                              </>
                            ) : (
                              <a
                                href={getFileUrl(entry)}
                                className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8")}
                                aria-label={`Pobierz ${entry.displayName}`}
                                title="Pobierz plik"
                                download
                              >
                                <Download className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {sectionIndex < collection.sections.length - 1 ? <Separator /> : null}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-sm text-muted-foreground">
        Wszystkie dokumenty otwierają się bezpośrednio na stronie. W razie problemów z wyświetleniem pliku, mozna go pobrać klikając ikonę pobierania obok nazwy pliku.
      </div>
    </section>
  );
}

export function DocumentLibraryFileView({
  baseRoute,
  backLabel,
  entries,
  createFileUrl,
}: DocumentLibraryFileViewProps) {
  const { collectionId, category, fileSlug } = useParams();

  if (!collectionId || !category || !fileSlug) {
    return <Navigate to={baseRoute} replace />;
  }

  const fileEntry = entries.find(
    (entry) =>
      entry.collectionId === collectionId &&
      entry.categoryPath === category &&
      entry.fileSlug === fileSlug,
  );

  if (!fileEntry) {
    return <Navigate to={baseRoute} replace />;
  }

  const pdfUrl = createFileUrl(fileEntry);
  const hasPlaceholder = Boolean(fileEntry.placeholder && fileEntry.placeholder.trim());

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Link
          to={baseRoute}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          {backLabel}
        </Link>
        {!hasPlaceholder ? (
          <a
            href={pdfUrl}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            download
          >
            <Download className="mr-2 h-4 w-4" />
            Pobierz plik
          </a>
        ) : null}
        <Badge variant="secondary">{fileEntry.collectionTitle}</Badge>
        <Badge variant="outline">{fileEntry.categoryName}</Badge>
      </div>
      <h1 className="text-lg font-semibold">{fileEntry.displayName}</h1>
      {hasPlaceholder ? (
        <div className="rounded-md border p-4 text-muted-foreground">{fileEntry.placeholder}</div>
      ) : (
        <PdfViewer file={pdfUrl} />
      )}
    </section>
  );
}

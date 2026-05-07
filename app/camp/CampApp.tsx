import { Routes, Route, NavLink, Link, Navigate } from "react-router";
import "katex/dist/katex.min.css";
import Landing from "./pages/Landing";
import Timetable from "./pages/Timetable";
import Match from "./pages/Match";
import ThemeToggle from "~/components/theme-toggle";
import { buttonVariants } from "~/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";
import Archive, { ArchiveFileView } from "./pages/Archive";
import Lectures, { LecturesFileView } from "./pages/Lectures";
import Tasks, { TasksFileView } from "./pages/Tasks";

export default function CampApp() {
  const link = "px-2";
  const active = ({ isActive }: { isActive: boolean }) =>
    isActive ? link + " font-semibold" : link;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 flex flex-col min-h-screen">
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link to="/" className="shrink-0">
                <img
                  src="/data/logo-light.png"
                  alt="Logo Mieleckiego Obozu Matematycznego"
                  className="h-10 w-auto cursor-pointer dark:hidden"
                />
                <img
                  src="/data/logo-dark.png"
                  alt="Logo Mieleckiego Obozu Matematycznego"
                  className="hidden h-10 w-auto cursor-pointer dark:block"
                />
              </Link>
              <Link to="/" className="shrink-0">
                <CardTitle className="text-lg">Mielecki Obóz Matematyczny</CardTitle>
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <nav className="flex flex-wrap gap-2">
            <NavLink className={({ isActive }) => cn(buttonVariants({ variant: "ghost", size: "sm" }), active({ isActive }))} to="/kalendarz">Kalendarz</NavLink>
            <NavLink className={({ isActive }) => cn(buttonVariants({ variant: "ghost", size: "sm" }), active({ isActive }))} to="/zadania">Zadania</NavLink>
            <NavLink className={({ isActive }) => cn(buttonVariants({ variant: "ghost", size: "sm" }), active({ isActive }))} to="/wyklady">Wyklady i Warsztaty</NavLink>
            <NavLink className={({ isActive }) => cn(buttonVariants({ variant: "ghost", size: "sm" }), active({ isActive }))} to="/archiwum">Archiwum</NavLink>
            <NavLink className={({ isActive }) => cn(buttonVariants({ variant: "ghost", size: "sm" }), active({ isActive }))} to="/mecz">Mecz Matematyczny</NavLink>
          </nav>
        </CardContent>
      </Card>

      <div className="flex-1 rounded-xl border bg-card p-4 md:p-6">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/kalendarz" element={<Timetable />} />
          <Route path="/zadania" element={<Tasks />} />
          <Route path="/zadania/:collectionId/:category/:fileSlug" element={<TasksFileView />} />
          <Route path="/wyklady" element={<Lectures />} />
          <Route path="/wyklady/:collectionId/:category/:fileSlug" element={<LecturesFileView />} />
          <Route path="/archiwum" element={<Archive />} />
          <Route path="/archiwum/:collectionId/:category/:fileSlug" element={<ArchiveFileView />} />
          <Route path="/mecz" element={<Match />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <Card className="mt-6">
        <CardFooter className="flex-col items-center justify-center gap-2 py-4 text-center text-sm text-muted-foreground">
          <div>
            Strona stworzona przez <span className="font-medium text-foreground">Wojciecha Wojcika</span>
          </div>
          <div>
            Kadra: <span className="font-medium text-foreground">Tomasz Martynski</span>, <span className="font-medium text-foreground">Wojciech Wojcik</span>, <span className="font-medium text-foreground">Daniel Pazdro</span>, <span className="font-medium text-foreground">Anna Martynska</span>, <span className="font-medium text-foreground">Daniel Kopacz</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

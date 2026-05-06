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
            <NavLink className={({ isActive }) => cn(buttonVariants({ variant: "ghost", size: "sm" }), active({ isActive }))} to="/archiwum">Archiwum</NavLink>
            {/* <NavLink className={({ isActive }) => cn(buttonVariants({ variant: "ghost", size: "sm" }), active({ isActive }))} to="/zadania">Zadania</NavLink>
            <NavLink className={({ isActive }) => cn(buttonVariants({ variant: "ghost", size: "sm" }), active({ isActive }))} to="/wyklady">Wyklady</NavLink>
            */}
            <NavLink className={({ isActive }) => cn(buttonVariants({ variant: "ghost", size: "sm" }), active({ isActive }))} to="/mecz">Mecz Matematyczny</NavLink>
          </nav>
        </CardContent>
      </Card>

      <div className="flex-1 rounded-xl border bg-card p-4 md:p-6">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/kalendarz" element={<Timetable />} />
          <Route path="/archiwum" element={<Archive />} />
          <Route path="/archiwum/:campId/:category/:fileSlug" element={<ArchiveFileView />} />
          <Route path="/mecz" element={<Match />} />
          {/* <Route path="/zadania" element={<TasksArchive />} />
          <Route path="/zadania/mlodsza" element={<Mlodsza />} />
          <Route path="/zadania/starsza" element={<Starsza />} />
          <Route path="/zadania/elita" element={<Elita />} />
          <Route path="/wyklady" element={<Lectures />} />
          <Route path="/wyklady/wsm" element={<WSM />} />
          <Route path="/wyklady/zmm" element={<ZMM />} />
          <Route path="/wyklady/ps" element={<PS />} />
          <Route path="/wyklady/owio" element={<OWIO />} />
          <Route path="/wyklady/rd" element={<RD />} />
          <Route path="/wyklady/wm" element={<WM />} />
          <Route path="/wyklady/kol" element={<KOL />} />
          <Route path="/wyklady/pp" element={<PP />} />
          <Route path="/wyklady/wie" element={<WIE />} />
          <Route path="/mecz/zadania" element={<MatchTasks />} />
          <Route path="/mecz/mlodsza" element={<MlodszaMecz />} />
          <Route path="/mecz/starsza" element={<StarszaMecz />} />
          <Route path="/mecz/elita" element={<ElitaMecz />} /> */}
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

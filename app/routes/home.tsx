import type { Route } from "./+types/home";
import CampApp from "../camp/CampApp";
import { CampProvider } from "../camp/context/CampContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mielecki Obóz Matematyczny" },
    { name: "description", content: "Strona Mieleckiego Obozu Matematycznego" },
  ];
}

export default function Home() {
  return (
    <CampProvider>
      <CampApp />
    </CampProvider>
  );
}

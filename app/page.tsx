import { PresentationLayout } from "@components/layouts";
import { Hero } from "@components/app/home";

export default function Home() {
  return (
    <main>
      <PresentationLayout>
        <Hero />
      </PresentationLayout>
    </main>
  );
}

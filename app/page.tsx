import { HomeLayout } from "@components/layouts";
import { Hero } from "@components/app/home";

export default function Home() {
  return (
    <main>
      <HomeLayout>
        <Hero />
      </HomeLayout>
    </main>
  );
}

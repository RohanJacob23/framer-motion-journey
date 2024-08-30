import TextEnter from "@/components/TextEnter";

/**
 * Renders the Home component, displaying a welcome message to the Animation Library.
 */
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-4 text-center md:p-24">
      <TextEnter className="lowercase">
        Welcome to Animation Library Of
      </TextEnter>
      <TextEnter delay={0.25} className="mt-0 uppercase md:mt-4">
        Rohan Jacob
      </TextEnter>
    </main>
  );
}

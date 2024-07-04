import TextEnter from "@/components/TextEnter";

/**
 * Renders the Home component, displaying a welcome message to the Animation Library.
 */
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-4 text-center md:p-24">
      <TextEnter className="!mt-20 lowercase">
        Welcome to Animation Library Of
      </TextEnter>
      <TextEnter delay={0.25} className="mt-4 uppercase">
        Rohan Jacob
      </TextEnter>
    </main>
  );
}

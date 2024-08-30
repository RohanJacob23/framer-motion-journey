import ClipPathTab from "@/components/ClipPathTab";

export default function page() {
  return (
    <main className="flex flex-col items-center justify-center p-4 text-center md:p-8 md:pt-24">
      <section className="grid size-full max-h-[28rem] max-w-screen-md place-items-center rounded-lg border-2 bg-background">
        <ClipPathTab />
      </section>
    </main>
  );
}

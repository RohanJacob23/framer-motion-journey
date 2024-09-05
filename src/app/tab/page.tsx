import ClipPathTab from "@/components/ClipPathTab";

export default function page() {
  return (
    <main className="flex flex-col items-center justify-center gap-4 p-4 md:p-8 md:pt-24">
      <div className="space-y-2">
        <h1>ClipPath Tab</h1>
        <p className="text-muted-foreground">
          Animated tab with clip path animation using Framer Motion
        </p>
      </div>
      <section className="grid size-full max-h-[28rem] max-w-screen-md place-items-center rounded-lg border-2 bg-background">
        <ClipPathTab />
      </section>
    </main>
  );
}

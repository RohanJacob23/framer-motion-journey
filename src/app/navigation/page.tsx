import NavigationMenu from "@/components/navigation/NavigationMenu";

export default function page() {
  return (
    <main className="flex flex-col items-center justify-center gap-4 p-4 pt-20 md:p-8 md:pt-24">
      <div className="space-y-2">
        <h1>Navigation Menu</h1>
        <p className="text-muted-foreground">
          Animated navigation menu inspired by Vercel navigation menu and
          animated using Framer Motion.
        </p>
      </div>
      <section className="grid size-full max-h-[28rem] max-w-screen-md justify-center rounded-lg border-2 bg-background p-4 pt-12">
        <NavigationMenu />
      </section>
    </main>
  );
}

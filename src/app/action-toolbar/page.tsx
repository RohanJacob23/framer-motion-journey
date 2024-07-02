import ActionToolbar from "@/components/action-toolbar/ActionToolbar";

export default function page() {
  return (
    <main className="flex flex-col px-2.5 py-8 md:px-8">
      <h2 className="!mt-20 border-none text-center underline">
        Action Toolbar
      </h2>

      <section className="mt-4 flex min-h-[50vh] flex-col items-center justify-evenly">
        <ActionToolbar />
      </section>
    </main>
  );
}

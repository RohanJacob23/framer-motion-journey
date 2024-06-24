import ActionToolbar from "@/components/action-toolbar/ActionToolbar";

export default function page() {
  return (
    <main className="flex flex-col px-2.5 py-8 md:px-8">
      <h2 className="border-none text-center underline">Action Toolbar</h2>

      <section className="mt-4 flex min-h-[50vh] flex-col items-center justify-center">
        <ActionToolbar />
      </section>
    </main>
  );
}

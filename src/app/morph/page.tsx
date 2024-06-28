import MorphEffect from "@/components/morph/MorphEffect";

export default function page() {
  return (
    <main className="flex flex-col px-4 py-8 md:px-8">
      <h2 className="border-none text-center underline">Morph Text Effect</h2>

      <section className="mt-4 flex flex-col items-center">
        <MorphEffect />
        {/* <ElasticCard /> */}
      </section>
    </main>
  );
}

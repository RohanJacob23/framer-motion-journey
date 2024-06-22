import ElasticCard from "@/components/elastic-card/ElasticCard";

export default function page() {
  return (
    <main className="flex flex-col px-4 py-8 md:px-8">
      <h2 className="border-none text-center underline">Elastic Card</h2>

      <section className="relative mt-4 flex flex-col items-center">
        <ElasticCard />
      </section>
    </main>
  );
}

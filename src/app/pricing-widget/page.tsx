import PricingWidget from "@/components/pricingWidget/PricingWidget";

export default function page() {
  return (
    <main className="flex flex-col items-center justify-center gap-4 p-4 pt-20 md:p-8 md:pt-24">
      <div className="space-y-2">
        <h1>Pricing Widget</h1>
        <p className="text-muted-foreground">
          Animated pricing widget animation using Framer Motion inspired by{" "}
          <b>Nitish Khagwal</b>
        </p>
      </div>
      <section className="grid size-full max-h-[28rem] max-w-screen-md place-items-center rounded-lg border-2 bg-background">
        <PricingWidget />
      </section>
    </main>
  );
}
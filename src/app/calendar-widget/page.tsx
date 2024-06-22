import CalendarWidget from "@/components/calendar-widget/CalendarWidget";

/**
 * Renders the main page content with a Calendar Widget component.
 *
 * @returns {JSX.Element} The JSX element representing the main page content.
 */
export default function page() {
  return (
    <main className="flex flex-col px-4 py-8 md:px-8">
      <h2 className="border-none text-center underline">Calendar Widget</h2>

      <section className="relative mt-4 flex h-[50vh] flex-col items-center">
        <CalendarWidget />
      </section>
    </main>
  );
}

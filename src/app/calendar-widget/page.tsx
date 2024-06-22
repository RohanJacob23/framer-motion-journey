import CalendarWidget from "@/components/calendar-widget/CalendarWidget";

/**
 * Renders the main page content with a Calendar Widget component.
 *
 * @returns {JSX.Element} The JSX element representing the main page content.
 */
export default function page() {
  return (
    <main className="flex flex-col px-4 md:px-8 py-8">
      <h2 className="text-center border-none underline">Calendar Widget</h2>

      <section className="flex flex-col items-center h-[50vh] mt-4 relative">
        <CalendarWidget />
      </section>
    </main>
  );
}

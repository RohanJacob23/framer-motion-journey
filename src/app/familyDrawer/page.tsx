import FamilyDrawer from "@/components/familyDrawer/FamilyDrawer";

export default function page() {
  return (
    <main className="relative flex flex-col items-center justify-center gap-4 p-4 pt-20 md:p-8 md:pt-24">
      <div className="space-y-2">
        <h1>Family Drawer</h1>
        <p className="text-muted-foreground">
          Developed using techniques from{" "}
          <b>Emil Kowalski&apos;s Framer Motion Course</b>
        </p>
      </div>
      <FamilyDrawer />
    </main>
  );
}

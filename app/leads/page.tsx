import Leads from "../components/Leads";
export const metadata = {
  title: "Leads Page",
  description: "View submitted leads from the lead capture form",
};
export default function LeadsPage() {
  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Submitted Leads</h1>
      <Leads />
    </main>
  );
}

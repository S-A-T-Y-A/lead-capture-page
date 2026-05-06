import Image from "next/image";
import LeadForm from "./components/LeadForm";

export const metadata = {
  title: "Lead Capture Form Page",
  description: "A simple lead capture page built with Next.js and Supabase",
};
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">
        Welcome to Our Lead Capture Form Page
      </h1>
      <p className="text-lg mb-8">
        Please fill out the form below to get in touch with us.
      </p>
      <div className="w-full max-w-md  p-6 rounded shadow">
        {/* LeadForm component will go here */}
        <LeadForm />
      </div>
    </div>
  );
}

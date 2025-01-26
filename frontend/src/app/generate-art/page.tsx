import GenerateArtForm from "@/components/GenerateArtForm"; // Adjust path if needed

export default function GenerateArtPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Modern Art Generator</h1>
      <GenerateArtForm />
    </div>
  );
}

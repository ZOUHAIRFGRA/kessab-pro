import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-16 text-center bg-gray-200 dark:bg-gray-900">
      <h2 className="text-3xl font-bold">Start Managing Your Farm Today</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
        Download KessabPro and take control of your farm.
      </p>
      <div className="mt-6">
        <Button className="px-6 py-3 text-lg">Get the App</Button>
      </div>
    </section>
  );
};

export default CTA;

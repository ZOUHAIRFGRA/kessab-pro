import { Card, CardContent } from "@/components/ui/card";
import { FaTractor, FaShoppingCart, FaClipboardList } from "react-icons/fa";

const features = [
  {
    title: "Animal Management",
    icon: <FaTractor className="text-4xl text-primary" />,
    description: "Easily track and manage your livestock with powerful tools.",
  },
  {
    title: "Sales & Transactions",
    icon: <FaShoppingCart className="text-4xl text-primary" />,
    description: "Keep records of sales and payments with ease.",
  },
  {
    title: "Farm Insights",
    icon: <FaClipboardList className="text-4xl text-primary" />,
    description: "Monitor farm activities and get valuable analytics.",
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <h2 className="text-center text-3xl font-bold">Why Choose KessabPro?</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-6">
        {features.map((feature, index) => (
          <Card key={index} className="p-6">
            <CardContent className="flex flex-col items-center text-center">
              {feature.icon}
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Features;

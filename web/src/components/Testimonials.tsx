import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Ahmed El Yassir",
    feedback: "KessabPro has completely transformed the way I manage my farm! Easy to use and incredibly helpful.",
    rating: 5,
  },
  {
    name: "Fatima Bekkali",
    feedback: "I love how I can track my sales and payments effortlessly. A must-have for every farmer!",
    rating: 5,
  },
  {
    name: "Omar Tazi",
    feedback: "Great app! The insights and analytics help me make better decisions for my farm.",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-800">
      <h2 className="text-3xl font-bold text-center">What Farmers Say About KessabPro</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
            <div className="flex gap-1 text-yellow-500 mb-2">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className="text-gray-700 dark:text-gray-300">"{testimonial.feedback}"</p>
            <h3 className="text-lg font-semibold mt-4">{testimonial.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

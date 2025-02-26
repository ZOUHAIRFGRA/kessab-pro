import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  { question: "How can I download KessabPro?", answer: "You can download the app from the App Store and Google Play Store." },
  { question: "Is KessabPro free to use?", answer: "Yes! The basic version is free, with premium features available for advanced users." },
  { question: "Can I manage multiple farms with KessabPro?", answer: "Yes, you can track multiple farms and animals from a single account." },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
      <div className="mt-8 max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
            <button
              className="flex justify-between items-center w-full text-lg font-semibold text-left"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {faq.question}
              <FaChevronDown className={`transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
            </button>
            {openIndex === index && <p className="mt-2 text-gray-700 dark:text-gray-300">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;

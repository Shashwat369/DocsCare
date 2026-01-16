import React, { useState } from "react";
import "./FAQ.css";

const faqData = [
  {
    question: "Is online consultation safe?",
    answer:
      "Yes, all consultations are conducted with verified doctors and your data is securely encrypted.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "You can easily book an appointment by selecting a doctor and choosing a suitable time slot.",
  },
  {
    question: "Can I cancel or reschedule my appointment?",
    answer:
      "Yes, appointments can be cancelled or rescheduled from your dashboard.",
  },
  {
    question: "Are my medical records secure?",
    answer:
      "Absolutely. We use industry-standard encryption to protect your health records.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>

      <div className="faq-container">
        {faqData.map((item, index) => (
          <div
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            key={index}
            onClick={() =>
              setActiveIndex(activeIndex === index ? null : index)
            }
          >
            <h4>{item.question}</h4>
            {activeIndex === index && <p>{item.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;

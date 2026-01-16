import React from "react";
import "./HealthBlog.css";
import Blog2 from "../../../assets/Blog2.webp" 

const HealthBlog = () => {
  const blogs = [
    {
      title: "10 Tips to Stay Healthy",
      desc:
        "Healthy living doesn’t have to be complicated. Simple daily habits like balanced nutrition, hydration, and regular exercise can significantly improve your overall well-being.",
      date: "Dec 20, 2025",
      image:
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571",
    },
    {
      title: "Why Regular Health Checkups Matter",
      desc:
        "Regular health checkups help in early detection of diseases, reducing risks and ensuring long-term health. Prevention is always better than cure.",
      date: "Dec 18, 2025",
      image:
        Blog2,
    },
    {
      title: "Managing Stress in Daily Life",
      desc:
        "Stress is common, but managing it effectively is essential. Learn practical techniques like mindfulness, breathing exercises, and time management.",
      date: "Dec 15, 2025",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    },
    {
      title: "Importance of Mental Health",
      desc:
        "Mental health is just as important as physical health. Taking care of your mind improves productivity, relationships, and happiness.",
      date: "Dec 12, 2025",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    },
    {
      title: "Healthy Diet for a Better Life",
      desc:
        "A balanced diet fuels your body. Discover how fruits, vegetables, and proper nutrition can enhance immunity and energy levels.",
      date: "Dec 10, 2025",
      image:
        "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
    },
    {
      title: "Benefits of Regular Exercise",
      desc:
        "Regular physical activity improves heart health, boosts mood, and increases stamina. Even 30 minutes a day can make a big difference.",
      date: "Dec 08, 2025",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    },
    {
      title: "Sleep & Recovery Explained",
      desc:
        "Quality sleep allows your body to recover and function optimally. Learn why sleep is essential for immunity and mental clarity.",
      date: "Dec 05, 2025",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    },
  ];

  return (
    <div className="blog-page">
      <h1 className="blog-title">Health Blog</h1>
      <p className="blog-subtitle">
        Trusted health articles curated by DocsCare professionals.
      </p>

      <div className="blog-grid">
        {blogs.map((blog, index) => (
          <div className="blog-card" key={index}>
            <img src={blog.image} alt={blog.title} />
            <div className="blog-content">
              <h3>{blog.title}</h3>
              <p>{blog.desc}</p>
              <span>{blog.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthBlog;

import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";

// Realistic Robot SVG
function RobotSVG() {
  return (
    <svg viewBox="0 0 400 500" className={styles.robotSvg}>
      <defs>
        <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Robot Head */}
      <g className={styles.robotHead}>
        <rect
          x="140"
          y="60"
          width="120"
          height="100"
          rx="15"
          fill="url(#robotGradient)"
          stroke="url(#accentGradient)"
          strokeWidth="2"
        />

        {/* Visor/Eyes */}
        <rect
          x="155"
          y="85"
          width="90"
          height="30"
          rx="5"
          fill="#0f172a"
          stroke="#6366f1"
          strokeWidth="1"
          opacity="0.8"
        />
        <line
          x1="200"
          y1="85"
          x2="200"
          y2="115"
          stroke="#6366f1"
          strokeWidth="1"
          opacity="0.5"
        />

        {/* Animated Eye Lights */}
        <circle
          cx="175"
          cy="100"
          r="3"
          fill="#00ffff"
          filter="url(#glow)"
          className={styles.eyeLight}
        >
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="225"
          cy="100"
          r="3"
          fill="#00ffff"
          filter="url(#glow)"
          className={styles.eyeLight}
        >
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="2s"
            begin="0.5s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Mouth/Vents */}
        <rect x="170" y="130" width="60" height="8" rx="2" fill="#0f172a" />
        <line
          x1="180"
          y1="134"
          x2="220"
          y2="134"
          stroke="#6366f1"
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Antenna */}
        <line
          x1="200"
          y1="60"
          x2="200"
          y2="40"
          stroke="url(#accentGradient)"
          strokeWidth="2"
        />
        <circle cx="200" cy="35" r="5" fill="#6366f1" filter="url(#glow)">
          <animate
            attributeName="r"
            values="5;8;5"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Robot Body */}
      <g className={styles.robotBody}>
        <rect
          x="130"
          y="160"
          width="140"
          height="160"
          rx="20"
          fill="url(#robotGradient)"
          stroke="url(#accentGradient)"
          strokeWidth="2"
        />

        {/* Chest Panel */}
        <rect
          x="160"
          y="180"
          width="80"
          height="100"
          rx="10"
          fill="#0f172a"
          opacity="0.5"
        />

        {/* Core Processor */}
        <circle
          cx="200"
          cy="210"
          r="20"
          fill="none"
          stroke="#6366f1"
          strokeWidth="2"
          filter="url(#glow)"
        >
          <animate
            attributeName="stroke-opacity"
            values="0.3;1;0.3"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="200"
          cy="210"
          r="15"
          fill="url(#accentGradient)"
          opacity="0.8"
        />
        <circle cx="200" cy="210" r="8" fill="#0f172a" />
        <circle cx="200" cy="210" r="5" fill="#00ffff" filter="url(#glow)">
          <animate
            attributeName="opacity"
            values="0.5;1;0.5"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Circuit Lines */}
        <path
          d="M 160 240 L 240 240 M 160 250 L 240 250 M 160 260 L 240 260"
          stroke="#6366f1"
          strokeWidth="1"
          opacity="0.4"
        />
        <path
          d="M 180 240 L 180 260 M 200 240 L 200 260 M 220 240 L 220 260"
          stroke="#6366f1"
          strokeWidth="1"
          opacity="0.4"
        />

        {/* Status Indicators */}
        <circle cx="170" cy="290" r="4" fill="#10b981">
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="200" cy="290" r="4" fill="#f59e0b">
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="1.5s"
            begin="0.5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="230" cy="290" r="4" fill="#ef4444">
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="1.5s"
            begin="1s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Robot Arms */}
      <g className={styles.robotArms}>
        {/* Left Arm */}
        <g className={styles.leftArm}>
          <rect
            x="90"
            y="180"
            width="40"
            height="100"
            rx="8"
            fill="url(#robotGradient)"
            stroke="url(#accentGradient)"
            strokeWidth="2"
          />
          <circle cx="110" cy="200" r="6" fill="#6366f1" />
          <circle cx="110" cy="220" r="6" fill="#6366f1" />
          <circle cx="110" cy="240" r="6" fill="#6366f1" />
          <rect
            x="100"
            y="270"
            width="20"
            height="30"
            rx="5"
            fill="#0f172a"
            stroke="#6366f1"
            strokeWidth="1"
          />
        </g>

        {/* Right Arm */}
        <g className={styles.rightArm}>
          <rect
            x="270"
            y="180"
            width="40"
            height="100"
            rx="8"
            fill="url(#robotGradient)"
            stroke="url(#accentGradient)"
            strokeWidth="2"
          />
          <circle cx="290" cy="200" r="6" fill="#6366f1" />
          <circle cx="290" cy="220" r="6" fill="#6366f1" />
          <circle cx="290" cy="240" r="6" fill="#6366f1" />
          <rect
            x="280"
            y="270"
            width="20"
            height="30"
            rx="5"
            fill="#0f172a"
            stroke="#6366f1"
            strokeWidth="1"
          />
        </g>
      </g>

      {/* Robot Legs */}
      <g className={styles.robotLegs}>
        {/* Left Leg */}
        <g className={styles.leftLeg}>
          <rect
            x="160"
            y="320"
            width="40"
            height="120"
            rx="8"
            fill="url(#robotGradient)"
            stroke="url(#accentGradient)"
            strokeWidth="2"
          />
          <rect
            x="165"
            y="340"
            width="30"
            height="8"
            rx="2"
            fill="#6366f1"
            opacity="0.5"
          />
          <rect
            x="165"
            y="360"
            width="30"
            height="8"
            rx="2"
            fill="#6366f1"
            opacity="0.5"
          />
          <rect
            x="165"
            y="380"
            width="30"
            height="8"
            rx="2"
            fill="#6366f1"
            opacity="0.5"
          />
          <rect
            x="150"
            y="430"
            width="60"
            height="20"
            rx="10"
            fill="#0f172a"
            stroke="#6366f1"
            strokeWidth="2"
          />
        </g>

        {/* Right Leg */}
        <g className={styles.rightLeg}>
          <rect
            x="200"
            y="320"
            width="40"
            height="120"
            rx="8"
            fill="url(#robotGradient)"
            stroke="url(#accentGradient)"
            strokeWidth="2"
          />
          <rect
            x="205"
            y="340"
            width="30"
            height="8"
            rx="2"
            fill="#6366f1"
            opacity="0.5"
          />
          <rect
            x="205"
            y="360"
            width="30"
            height="8"
            rx="2"
            fill="#6366f1"
            opacity="0.5"
          />
          <rect
            x="205"
            y="380"
            width="30"
            height="8"
            rx="2"
            fill="#6366f1"
            opacity="0.5"
          />
          <rect
            x="190"
            y="430"
            width="60"
            height="20"
            rx="10"
            fill="#0f172a"
            stroke="#6366f1"
            strokeWidth="2"
          />
        </g>
      </g>
    </svg>
  );
}

// Modern Hero Section
function HeroSection() {
  const { siteConfig } = useDocusaurusContext();
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Innovate", "Build", "Automate", "Create"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <div className={styles.heroGrid}></div>
        <div className={styles.heroGradient}></div>
      </div>

      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
          

            <h1 className={styles.heroTitle}>
              Master <span className={styles.heroTitleAccent}>Humanoid</span>{" "}
              Robotics
            </h1>

            <div className={styles.heroSubtitle}>
              <span>{siteConfig.tagline}</span>
              <div className={styles.wordRotate}>
                {words.map((word, index) => (
                  <span
                    key={index}
                    className={clsx(
                      styles.rotatingWord,
                      index === currentWord && styles.active
                    )}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.heroButtons}>
              <Link to="/docs/intro" className={styles.btnPrimary}>
                Get Started
                <svg
                  className={styles.btnArrow}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 12h14m-7-7l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link to="#features" className={styles.btnSecondary}>
                Explore Features
              </Link>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.heroIllustration}>
              <RobotSVG />
              <div className={styles.robotGlow}></div>
              <div className={styles.floatingElements}>
                <div className={styles.floatElement}></div>
                <div className={styles.floatElement}></div>
                <div className={styles.floatElement}></div>
                <div className={styles.floatElement}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine}></div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}

// Features Grid
function FeaturesSection() {
  const features = [
    {
      icon: "🧠",
      title: "AI Integration",
      description:
        "Learn to integrate cutting-edge AI technologies into robotic systems",
      color: "#6366f1",
    },
    {
      icon: "⚡",
      title: "Real-time Control",
      description:
        "Master real-time control systems and sensor fusion techniques",
      color: "#8b5cf6",
    },
    {
      icon: "🔧",
      title: "Hardware Design",
      description: "Design and build custom hardware for humanoid robots",
      color: "#ec4899",
    },
    {
      icon: "💻",
      title: "Software Architecture",
      description:
        "Develop robust software architectures for complex robotic systems",
      color: "#f59e0b",
    },
    {
      icon: "🎯",
      title: "Computer Vision",
      description: "Implement advanced computer vision for robot perception",
      color: "#10b981",
    },
    {
      icon: "🚀",
      title: "Deployment",
      description: "Learn deployment strategies for production robotic systems",
      color: "#3b82f6",
    },
  ];

  return (
    <section id="features" className={styles.features}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Comprehensive Learning Path</h2>
          <p className={styles.sectionSubtitle}>
            Everything you need to become a robotics expert
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div
                className={styles.featureIcon}
                style={{ backgroundColor: feature.color }}
              >
                {feature.icon}
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
              <Link to="/docs/intro" className={styles.featureLink}>
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Learning Path Section
function LearningPathSection() {
  const paths = [
    {
      step: "01",
      title: "Fundamentals",
      description: "Robotics basics, mathematics, and programming foundations",
      duration: "2 weeks",
    },
    {
      step: "02",
      title: "Hardware Components",
      description: "Sensors, actuators, microcontrollers, and circuit design",
      duration: "3 weeks",
    },
    {
      step: "03",
      title: "Software Development",
      description: "ROS, control systems, and algorithm implementation",
      duration: "4 weeks",
    },
    {
      step: "04",
      title: "AI & Machine Learning",
      description: "Neural networks, computer vision, and deep learning",
      duration: "6 weeks",
    },
  ];

  return (
    <section className={styles.learningPath}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Your Learning Journey</h2>
          <p className={styles.sectionSubtitle}>
            Structured path from beginner to expert
          </p>
        </div>

        <div className={styles.pathContainer}>
          <div className={styles.pathLine}></div>
          {paths.map((path, index) => (
            <div key={index} className={styles.pathCard}>
              <div className={styles.pathStep}>{path.step}</div>
              <div className={styles.pathContent}>
                <h3>{path.title}</h3>
                <p>{path.description}</p>
                <span className={styles.pathDuration}>{path.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaBackground}>
        <div className={styles.ctaGradient}></div>
      </div>
      <div className="container">
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Build the Future?</h2>
          <p className={styles.ctaDescription}>
            Join thousands of engineers and researchers advancing humanoid
            robotics
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/docs/intro" className={styles.ctaButton}>
              Start Learning Now
            </Link>
          
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title} - Advanced Robotics Guide`}
      description="Master humanoid robotics with comprehensive guides, tutorials, and hands-on projects"
    >
      <HeroSection />
      <main>
        <FeaturesSection />
        <LearningPathSection />
        <CTASection />
      </main>
    </Layout>
  );
}

import React from "react";
import styles from "./styles.module.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.waveContainer}>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className={styles.wave}
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className={styles.footerContent}>
        <div className={styles.mainSection}>
          <div className={styles.brand}>
            <div className={styles.logoContainer}>
              <div className={styles.logoIcon}>
                <i className="fa-solid fa-robot"></i>
              </div>
              <span className={styles.logoText}>RAG Assistant</span>
            </div>
            <p className={styles.tagline}>
              Intelligent Document Retrieval with AI
            </p>
          </div>

          <div className={styles.techStackSection}>
            <h4 className={styles.sectionTitle}>Powered By</h4>
            <div className={styles.techIcons}>
              <div className={styles.techItem}>
                <i className="fa-solid fa-book"></i>
                <span>Docusaurus</span>
              </div>
              <div className={styles.techItem}>
                <i className="fa-solid fa-brain"></i>
                <span>RAG</span>
              </div>
              <div className={styles.techItem}>
                <i className="fa-solid fa-database"></i>
                <span>Qdrant</span>
              </div>
              <div className={styles.techItem}>
                <i className="fa-solid fa-gem"></i>
                <span>Gemini</span>
              </div>
            </div>
          </div>

          <div className={styles.creatorSection}>
            <h4 className={styles.sectionTitle}>Creator</h4>
            <div className={styles.creatorInfo}>
              <div className={styles.avatar}>
                <i className="fa-solid fa-user"></i>
              </div>
              <div>
                <p className={styles.creatorName}>Kiran Mushtaque</p>
                <p className={styles.creatorRole}>Full Stack Developer</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.bottomSection}>
          <div className={styles.socialLinks}>
            <a
              href="https://github.com/kiranMushtaque"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <div className={styles.socialIcon}>
                <i className="fa-brands fa-github"></i>
              </div>
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/kiran-m-9b238b2b6/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <div className={styles.socialIcon}>
                <i className="fa-brands fa-linkedin"></i>
              </div>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://twitter.com/KiranMushtaque"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <div className={styles.socialIcon}>
                <i className="fa-brands fa-x-twitter"></i>
              </div>
              <span>Twitter</span>
            </a>
            <a
              href="mailto:kiran.mushtaque.dev@email.com"
              aria-label="Email"
              className={styles.socialLink}
            >
              <div className={styles.socialIcon}>
                <i className="fa-solid fa-envelope"></i>
              </div>
              <span>Email</span>
            </a>
          </div>

          <div className={styles.copyrightSection}>
            <p className={styles.copyright}>
              © {currentYear} Kiran Mushtaque. All rights reserved.
            </p>
            <p className={styles.disclaimer}>
              Built with passion and modern web technologies
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);

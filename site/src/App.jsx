import React, { useState } from "react";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.wrapper}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}></div>
          <span>Creative Agency</span>
        </div>

        <nav className={styles.nav}>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Sevices</a>
          <a href="#">Projects</a>
          <a href="#">Blog</a>
        </nav>

        <button className={styles.contactBtn}>Contact</button>
      </header>

      {/* HERO */}
      <section className={styles.hero}>
        <h1>
          Make your dream <br />
          business goal come true
        </h1>

        <p>
          When you need us for improve your business,
          <br />
          then come with us to help your business have reach it.
        </p>

        <button className={styles.primaryBtn}>Start Project</button>

        <div className={styles.heroImage}></div>
      </section>

      {/* ABOUT */}
      <section className={styles.about}>
        <p className={styles.smallTitle}>About Us</p>
        <h2>Our Teammate</h2>

        <div className={styles.aboutContent}>
          <div className={styles.aboutImage}></div>

          <div className={styles.aboutText}>
            <p>
              We move with make a Creative Strategy for help your business
              goal, we help to improve your income by a services we have.
            </p>

            <p>
              We have 20+ Creative team to support your business.
              We provide design, digital marketing and more.
            </p>

            <div className={styles.aboutButtons}>
              <button className={styles.primaryBtn}>About Us</button>
              <button className={styles.outlineBtn}>Our Story</button>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className={styles.services}>
        <p className={styles.smallTitle}>Our Service</p>
        <h2>Perfect and Fast Movement</h2>

        <p className={styles.serviceText}>
          We move with make a Creative Strategy for help your business goal,
          we help to improve your income by a services we have.
        </p>

        <div className={styles.serviceGrid}>
          <div className={styles.serviceCard}>
            <div className={styles.iconBlue}></div>
            <h4>Social Media Management</h4>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.iconRed}></div>
            <h4>Search Engine Optimization</h4>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.iconGreen}></div>
            <h4>Design</h4>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.iconYellow}></div>
            <h4>Ads</h4>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className={styles.portfolio}>
        <p className={styles.smallTitle}>Our Portfolio</p>
        <h2>What do we do</h2>

        <div className={styles.portfolioGrid}>
          <div className={styles.portfolioCard}></div>
          <div className={styles.portfolioCard}></div>
          <div className={styles.portfolioCard}></div>
        </div>

        <button className={styles.outlineBtn}>See All Portfolio</button>
      </section>

      {/* TESTIMONIAL */}
      <section className={styles.testimonial}>
        <h2>People Talk about us</h2>

        <div className={styles.testimonialGrid}>
          <div className={styles.testCard}>
            <p>
              Veniam quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
            </p>
            <span>Angel Rose</span>
          </div>

          <div className={styles.testCard}>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </p>
            <span>Mark Wood</span>
          </div>

          <div className={styles.testCard}>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa.
            </p>
            <span>Angel Rose</span>
          </div>
        </div>
      </section>

      {/* COLLAB */}
      <section className={styles.collab}>
        <div>
          <h2>Interesting Collaboration With Us?</h2>
          <button className={styles.primaryBtn}>Get Started</button>
        </div>

        <div className={styles.collabImage}></div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>
          <div className={styles.logoIcon}></div>
          <span>Creative Agency</span>
        </div>

        <p className={styles.copy}>
          Copyright © 2025 Creative Agency. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
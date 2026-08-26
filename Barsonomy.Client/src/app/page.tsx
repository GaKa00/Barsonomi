"use client";

import Image from "next/image";
import { useState } from "react";
import heroImg from "../assets/hero.png";
import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";
import styles from "./page.module.css";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <main className={styles.shell}>
      <section className={styles.center}>
        <div className={styles.hero}>
          <Image
            src={heroImg}
            className={styles.base}
            width={170}
            height={179}
            alt=""
          />
          <Image
            src={reactLogo}
            className={styles.framework}
            alt="React logo"
          />
          <Image src={viteLogo} className={styles.vite} alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/app/page.tsx</code> and save to test HMR
          </p>
        </div>
        <button
          type="button"
          className={styles.counter}
          onClick={() => setCount((value) => value + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className={styles.ticks} />

      <section className={styles.nextSteps}>
        <div className={styles.docs}>
          <span className={styles.icon} aria-hidden="true">
            ▤
          </span>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noreferrer"
              >
                Explore Next.js
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank" rel="noreferrer">
                Learn React
              </a>
            </li>
          </ul>
        </div>
        <div>
          <span className={styles.icon} aria-hidden="true">
            ◎
          </span>
          <h2>Connect with us</h2>
          <p>Join the Barsonomy community</p>
          <ul>
            <li>
              <a
                href="https://github.com/GaKa00/Barsonomi"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className={styles.ticks} />
      <section className={styles.spacer} />
    </main>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, LockKeyhole, Mail, UserRound } from "lucide-react";
import { AuthLogo } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const isRegister = mode === "register";
  const [submitted, setSubmitted] = useState(false);
  return (
    <main className="auth-page">
      <div className="auth-decoration">
        <div className="deco-grid" />
        <div className="deco-note note-one">Know where your money goes.</div>
        <div className="deco-note note-two">
          Spend with intention <span>✦</span>
        </div>
      </div>
      <section className="auth-panel">
        <AuthLogo />
        <div className="auth-copy">
          <p className="eyebrow">
            {isRegister ? "START YOUR JOURNEY" : "WELCOME BACK"}
          </p>
          <h1>
            {isRegister ? "Make money feel simpler." : "Your money, in focus."}
          </h1>
          <p>
            {isRegister
              ? "A calmer way to track spending, build better habits, and feel in control."
              : "Pick up where you left off and keep your spending in check."}
          </p>
        </div>
        <form
          className="auth-form"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="field-group">
            {isRegister && (
              <>
                <Label htmlFor="name">Your name</Label>
                <div className="input-with-icon">
                  <UserRound size={17} />
                  <Input id="name" placeholder="Jamie Davis" required />
                </div>
              </>
            )}
            <Label htmlFor="email">Email address</Label>
            <div className="input-with-icon">
              <Mail size={17} />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="field-label-row">
              <Label htmlFor="password">Password</Label>
              {!isRegister && (
                <Link href="#" className="form-link">
                  Forgot password?
                </Link>
              )}
            </div>
            <div className="input-with-icon">
              <LockKeyhole size={17} />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                minLength={8}
                required
              />
            </div>
            {isRegister && (
              <label className="check-row">
                <input type="checkbox" required />{" "}
                <span>I agree to the terms and privacy policy</span>
              </label>
            )}
          </div>
          <Button type="submit" size="lg" className="auth-submit">
            {submitted
              ? "You’re in"
              : isRegister
                ? "Create your account"
                : "Sign in"}{" "}
            {!submitted && <ArrowRight size={17} />}
          </Button>
        </form>
        {submitted && (
          <p className="success-message">
            Demo mode is ready. Connect this form to your API when
            authentication is wired.
          </p>
        )}
        <p className="auth-switch">
          {isRegister ? "Already have an account?" : "New to Barsonomy?"}{" "}
          <Link href={isRegister ? "/login" : "/register"}>
            {isRegister ? "Sign in" : "Create an account"}
          </Link>
        </p>
      </section>
    </main>
  );
}

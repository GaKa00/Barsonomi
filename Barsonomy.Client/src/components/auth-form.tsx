"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, LockKeyhole, Mail, UserRound } from "lucide-react";
import { api } from "@/api/api-client";
import { AuthLogo } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const isRegister = mode === "register";
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    try {
      if (isRegister) {
        await api.auth.register({ email, password });
        router.replace("/login");
      } else {
        await api.auth.login({ email, password });
        router.replace("/dashboard");
      }

      setSubmitted(true);
    } catch {
      setErrorMessage(
        isRegister
          ? "We could not create your account. Check your details and try again."
          : "We could not sign you in. Check your email and password.",
      );
    }
  }

  return (
    <main className="auth-page">

      <section className="auth-panel">
        <AuthLogo />
        <div className="auth-copy">
      
          <h1>
           Enklare Ekonomi  --
            Av Alkoholister, För Alkoholister
          </h1>
          <p>
          Inget mer krångel med att hålla koll på dina utgifter. Vi snackar i den enda valutan som betyder något. Skål!
          </p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field-group">
            {isRegister && (
              <>
                <Label htmlFor="name">Va Fan heter du?</Label>
                <div className="input-with-icon">
                  <UserRound size={17} />
                  <Input
                    id="name"
                    name="name"
                    placeholder="Janne Dååe"
                    required
                  />
                </div>
              </>
            )}
            <Label htmlFor="email">Email address</Label>
            <div className="input-with-icon">
              <Mail size={17} />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="nåtting@gmail.com"
                required
              />
            </div>
            <div className="field-label-row">
              <Label htmlFor="password">Password</Label>
              {!isRegister && (
                <Link href="#" className="form-link">
               Glömt Lösenordet? Jävla Fyllo.
                </Link>
              )}
            </div>
            <div className="input-with-icon">
              <LockKeyhole size={17} />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                minLength={8}
                required
              />
            </div>
            
          </div>
          <Button type="submit" size="lg" className="auth-submit">
            {submitted
              ? "You’re in"
              : isRegister
                ? "Skapa ditt konto"
                : "Logga in"}{" "}
            {!submitted && <ArrowRight size={17} />}
          </Button>
        </form>
   
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p className="auth-switch">
          {isRegister ? "Har du redan ett konto?" : "Ny som Alkis?"}{" "}
          <Link href={isRegister ? "/login" : "/register"}>
            {isRegister ? "Logga in" : "Skapa konto"}
          </Link>
        </p>
      </section>
    </main>
  );
}

"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Status = "idle" | "success";

/**
 * The single campaign CTA. Opens a minimal, accessible email-capture
 * dialog — no other fields, no other CTA on the page.
 */
export default function JoinDrop({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const headingId = useId();

  useEffect(() => {
    if (!open) return;
    emailInputRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function handleClose() {
    setOpen(false);
    setStatus("idle");
    setEmail("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    // Placeholder submit — wire to a real waitlist/API route before launch.
    setStatus("success");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group inline-flex w-fit items-center gap-3 border-2 border-ink bg-ink px-6 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.15em] text-cream transition-all duration-300 ease-out hover:bg-transparent hover:text-ink sm:px-8 sm:py-4 sm:text-base ${className}`}
      >
        Join the Drop
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5"
        >
          →
        </span>
      </button>

      {/* Portalled to <body> so the overlay is always positioned against the
          real viewport — never trapped by an ancestor's transform (e.g. the
          page-load entrance animations), which would otherwise turn "fixed"
          into something scoped to that ancestor instead. */}
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/70 px-4 backdrop-blur-[1px]"
            onClick={(event) => {
              if (event.target === event.currentTarget) handleClose();
            }}
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={headingId}
              className="animate-rise relative w-full max-w-sm border-2 border-ink bg-cream p-7 sm:p-8"
            >
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close"
                className="absolute right-4 top-4 font-sans text-lg leading-none text-ink/70 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                ✕
              </button>

              {status === "idle" ? (
                <form onSubmit={handleSubmit}>
                  <h2
                    id={headingId}
                    className="font-display text-2xl uppercase tracking-tight sm:text-3xl"
                  >
                    Get First Access
                  </h2>
                  <p className="mt-2 font-sans text-xs uppercase tracking-[0.15em] text-ink/60">
                    Closet Drop 001 · Est. 2026
                  </p>

                  <label htmlFor={`${headingId}-email`} className="sr-only">
                    Your email
                  </label>
                  <input
                    ref={emailInputRef}
                    id={`${headingId}-email`}
                    type="email"
                    required
                    placeholder="YOUR EMAIL"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="mt-6 w-full border-2 border-ink bg-transparent px-4 py-3 font-sans text-sm uppercase tracking-wide text-ink placeholder:text-ink/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
                  />

                  <button
                    type="submit"
                    className="group mt-4 inline-flex w-full items-center justify-center gap-3 border-2 border-ink bg-ink px-6 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.15em] text-cream transition-all duration-300 ease-out hover:bg-electric hover:border-electric"
                  >
                    Join the Drop
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </button>
                </form>
              ) : (
                <div>
                  <h2
                    id={headingId}
                    className="font-display text-2xl uppercase tracking-tight sm:text-3xl"
                  >
                    You&apos;re on the list
                  </h2>
                  <p className="mt-3 font-sans text-sm text-ink/70">
                    We&apos;ll email you the moment the closet opens.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-6 w-full border-2 border-ink px-6 py-3 font-sans text-sm font-bold uppercase tracking-[0.15em] transition-colors hover:bg-ink hover:text-cream"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

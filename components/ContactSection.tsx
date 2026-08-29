"use client";

import { useState } from "react";
import { site } from "@/data/site";
import SectionHeading from "./SectionHeading";

const PROJECT_TYPES = [
  "Photography",
  "Video",
  "Artist Interview",
  "Editorial Coverage",
  "Festival Coverage",
  "Portraits",
  "Other",
] as const;

type FormState = {
  name: string;
  email: string;
  org: string;
  type: (typeof PROJECT_TYPES)[number];
  message: string;
};

export default function ContactSection() {
  const [state, setState] = useState<"idle" | "ready">("idle");
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    org: "",
    type: PROJECT_TYPES[0],
    message: "",
  });

  // The form composes a mailto: link. No backend, no third-party service.
  // If you later add a form endpoint (Formspree, Resend, etc.), swap this out.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent(
      `[${form.type.toUpperCase()}] ${form.name || "Inquiry"} — ${form.org || "—"}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Organization / Artist: ${form.org}`,
        `Project Type: ${form.type}`,
        "",
        form.message,
      ].join("\n"),
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setState("ready");
  }

  return (
    <section
      id="contact"
      className="border-t border-white/5 bg-ink-950 px-5 py-24 md:px-8 md:py-32"
      aria-label="Contact"
    >
      <SectionHeading
        eyebrow="INDEX 04"
        title="CONTACT"
        right={
          <div className="text-micro tracking-widest2 uppercase text-ink-400">
            MEDIA · EDITORIAL · COMMISSIONS
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <dl className="grid grid-cols-[110px_1fr] gap-y-4 text-tiny tracking-widest2 uppercase">
            <dt className="text-ink-500">EMAIL</dt>
            <dd>
              <a
                href={`mailto:${site.email}`}
                className="text-ink-100 hover:text-ink-50 link-underline"
              >
                {site.email}
              </a>
            </dd>
            <dt className="text-ink-500">INSTAGRAM</dt>
            <dd>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noreferrer"
                className="text-ink-100 hover:text-ink-50 link-underline"
              >
                {site.instagram.handle}
              </a>
            </dd>
            <dt className="text-ink-500">BASED</dt>
            <dd className="text-ink-100">{site.location}</dd>
          </dl>

          <a
            href={`mailto:${site.email}`}
            className="mt-12 inline-block text-tiny tracking-widest2 uppercase text-ink-50 link-underline"
          >
            WORK WITH ME ↗
          </a>
        </div>

        <form
          onSubmit={handleSubmit}
          className="md:col-span-7 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <Field
            label="NAME"
            value={form.name}
            onChange={(v) => setForm((f) => ({ ...f, name: v }))}
            required
          />
          <Field
            label="EMAIL"
            type="email"
            value={form.email}
            onChange={(v) => setForm((f) => ({ ...f, email: v }))}
            required
          />
          <Field
            label="ORGANIZATION / ARTIST"
            value={form.org}
            onChange={(v) => setForm((f) => ({ ...f, org: v }))}
            className="md:col-span-2"
          />

          <div className="md:col-span-2">
            <label className="block text-micro tracking-widest2 uppercase text-ink-400">
              PROJECT TYPE
            </label>
            <select
              value={form.type}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  type: e.target.value as (typeof PROJECT_TYPES)[number],
                }))
              }
              className="mt-2 w-full border-b border-white/10 bg-transparent py-2 text-sm text-ink-100 outline-none focus:border-ink-100"
            >
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t} className="bg-ink-950">
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-micro tracking-widest2 uppercase text-ink-400">
              MESSAGE
            </label>
            <textarea
              value={form.message}
              onChange={(e) =>
                setForm((f) => ({ ...f, message: e.target.value }))
              }
              rows={5}
              required
              className="mt-2 w-full resize-none border-b border-white/10 bg-transparent py-2 text-sm text-ink-100 outline-none focus:border-ink-100"
            />
          </div>

          <div className="md:col-span-2 flex items-center justify-between">
            <div className="text-micro tracking-widest2 uppercase text-ink-500">
              {state === "ready"
                ? "MAIL CLIENT OPENED"
                : "PRESS SEND — YOUR EMAIL CLIENT WILL OPEN"}
            </div>
            <button
              type="submit"
              className="text-tiny tracking-widest2 uppercase text-ink-50 link-underline"
            >
              SEND MESSAGE ↗
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-micro tracking-widest2 uppercase text-ink-400">
        {label}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border-b border-white/10 bg-transparent py-2 text-sm text-ink-100 outline-none focus:border-ink-100"
      />
    </div>
  );
}

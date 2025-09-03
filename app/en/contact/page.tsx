// ...existing code...
"use client";
import Link from "next/link";
import RegionSelector, {
  getRegionDetails,
} from "../components/region-selector";
import { useState } from "react";

export default function ContactPage() {
  const [region, setRegion] = useState<"MY" | "SG" | "INT">("INT"); // Default to international while detecting
  const regionDetails = getRegionDetails(region);

  type ContactForm = {
    name: string;
    email: string;
    message: string;
    region: "MY" | "SG" | "INT";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      message: { value: string };
    };
    const data: ContactForm = {
      name: target.name.value,
      email: target.email.value,
      message: target.message.value,
      region,
    };
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    alert("Message sent!");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 bg-olive text-foreground font-lato">
      <RegionSelector onChange={setRegion} showSelector={false} />
      <div className="mb-4 text-center text-lg font-semibold">
        You see rates in {regionDetails.symbol}. For custom quotes, see our
        Services page.
      </div>
      <h1 className="text-4xl font-bold mb-6 text-accent font-mono">
        Contact Us
      </h1>
      <p className="mb-8 text-lg text-brown">
        Interested in working together or have a question? Fill out the form
        below or book a free discovery call.
      </p>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block font-semibold mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="message" className="block font-semibold mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
        >
          Send Message
        </button>
      </form>
      <div className="mt-10 text-center">
        <Link
          href="https://cal.com/tukangstudio/discovery"
          target="_blank"
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 font-semibold inline-block"
        >
          Book a Free Discovery Call
        </Link>
      </div>
    </div>
  );
}

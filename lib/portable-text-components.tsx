import React from "react";
import { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?.url) {
        return null;
      }

      return (
        <div className="my-8 w-full">
          <div className="relative w-full rounded-xl overflow-hidden">
            <Image
              src={value.asset.url}
              alt={value.alt || "Portfolio image"}
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
          {value.caption && (
            <p className="text-sm text-gray-400 mt-3 text-center italic">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-medium mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-4 italic my-4">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="mb-4">{children}</p>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "#";
      return (
        <a
          href={href}
          className="text-accent link-underline focus-ring"
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
  unknownType: ({ value, isInline }) => {
    console.warn("Unknown type:", value);
    return isInline ? <span /> : <div />;
  },
  unknownBlockStyle: ({ children }) => <p>{children}</p>,
  unknownMark: ({ children }) => <span>{children}</span>,
};

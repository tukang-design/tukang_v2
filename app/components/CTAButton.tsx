import React from "react";
import Link from "next/link";

// CTA Button Types based on action hierarchy
type CTAVariant = "primary" | "secondary" | "tertiary" | "whatsapp";
type CTASize = "sm" | "md" | "lg";

interface CTAButtonProps {
  variant: CTAVariant;
  size?: CTASize;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  external?: boolean;
  disabled?: boolean;
}

// Base styles for consistency
const baseStyles =
  "font-bold inline-flex items-center justify-center focus-ring disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300";

// Size variants
const sizeStyles = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-xl",
};

// Variant styles based on action intent
const variantStyles = {
  primary: {
    // Neon green primary with left-to-right darkening on hover
    default:
      "text-[#0D0D0D] bg-[linear-gradient(90deg,#39FF14,#2de50f)] bg-[length:200%_100%] bg-left hover:bg-right shadow-[0_10px_30px_rgba(57,255,20,0.15)]",
    disabled: "bg-gray-600 text-gray-400 cursor-not-allowed",
  },
  secondary: {
    // Outline with soft fill sweep on hover
    default:
      "bg-transparent border-2 border-[#AEB5BF] text-[#AEB5BF] bg-[linear-gradient(90deg,transparent,rgba(174,181,191,0.15))] bg-[length:200%_100%] bg-left hover:bg-right",
    disabled:
      "bg-transparent border-2 border-gray-600 text-gray-400 cursor-not-allowed",
  },
  tertiary: {
    default:
      "text-[#AEB5BF] bg-[linear-gradient(90deg,transparent,rgba(174,181,191,0.10))] bg-[length:200%_100%] bg-left hover:bg-right",
    disabled: "text-gray-400 cursor-not-allowed",
  },
  whatsapp: {
    default:
      "text-white bg-[linear-gradient(90deg,#25D366,#19b757)] bg-[length:200%_100%] bg-left hover:bg-right shadow-[0_10px_30px_rgba(37,211,102,0.15)]",
    disabled: "bg-gray-600 text-gray-300 cursor-not-allowed",
  },
};

export function CTAButton({
  variant,
  size = "md",
  href,
  onClick,
  children,
  icon,
  iconPosition = "right",
  className = "",
  external = false,
  disabled = false,
}: CTAButtonProps) {
  const styles = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${
      disabled
        ? variantStyles[variant].disabled
        : variantStyles[variant].default
    }
    ${className}
  `;

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </>
  );

  // External link
  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles}
        onClick={onClick}
        aria-disabled={disabled}
      >
        {content}
      </a>
    );
  }

  // Internal link
  if (href && !disabled) {
    return (
      <Link href={href} className={styles} onClick={onClick} aria-label={typeof children === 'string' ? children : undefined}>
        {content}
      </Link>
    );
  }

  // Button
  return (
    <button
      className={styles}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {content}
    </button>
  );
}

// Common icon components for consistency
export const ArrowRightIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

export const ArrowDownIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 14l-7 7m0 0l-7-7m7 7V3"
    />
  </svg>
);

export const ChevronRightIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

// Preset CTA components for common use cases
export const PrimaryCTA = (props: Omit<CTAButtonProps, "variant">) => (
  <CTAButton variant="primary" {...props} />
);

export const SecondaryCTA = (props: Omit<CTAButtonProps, "variant">) => (
  <CTAButton variant="secondary" {...props} />
);

export const TertiaryCTA = (props: Omit<CTAButtonProps, "variant">) => (
  <CTAButton variant="tertiary" {...props} />
);

export const WhatsAppCTA = (props: Omit<CTAButtonProps, "variant">) => (
  <CTAButton variant="whatsapp" {...props} />
);

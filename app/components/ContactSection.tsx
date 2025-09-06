"use client";

import React from "react";

interface ContactSectionProps {
	variant?: "default" | "compact";
	className?: string;
}

export default function ContactSection({
	variant = "default",
	className = "",
}: ContactSectionProps) {
	const compact = variant === "compact";

	return (
		<section className={`space-y-4 p-6 rounded-xl ${className}`}>
			<h3 className="text-xl font-semibold text-accent">Get in touch</h3>
			<p className="text-gray-300">Reach out to discuss your project or book a discovery call.</p>
			{!compact && (
				<div className="pt-2">
					<a href="/contact" className="text-accent underline">
						Contact page
					</a>
				</div>
			)}
		</section>
	);
}

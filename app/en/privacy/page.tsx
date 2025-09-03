export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4 text-gray-700">Your privacy is important to us. This policy explains how we collect, use, and protect your information.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">Information We Collect</h2>
      <ul className="list-disc ml-6 mb-4 text-gray-700">
        <li>Contact information (name, email) submitted via forms</li>
        <li>Analytics data (website usage, device info)</li>
        <li>Payment details (for service purchases, handled securely via Stripe)</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2">How We Use Your Information</h2>
      <ul className="list-disc ml-6 mb-4 text-gray-700">
        <li>To respond to inquiries and provide services</li>
        <li>To improve our website and offerings</li>
        <li>To process payments securely</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2">Your Rights</h2>
      <ul className="list-disc ml-6 mb-4 text-gray-700">
        <li>You may request to view, update, or delete your personal data</li>
        <li>Contact us at <a href="mailto:hello@tukang.studio" className="text-blue-600 underline">hello@tukang.studio</a></li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2">Third-Party Services</h2>
      <p className="mb-4 text-gray-700">We use trusted third-party services (Sanity, Stripe, Cal.com) to deliver our services. Your data is handled securely and never sold.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">Updates</h2>
      <p className="mb-4 text-gray-700">This policy may be updated periodically. Please check back for changes.</p>
    </div>
  );
}

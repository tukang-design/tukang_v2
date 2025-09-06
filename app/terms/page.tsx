export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
      <p className="mb-4 text-gray-700">
        By using our website and services, you agree to the following terms and
        conditions.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">Services</h2>
      <ul className="list-disc ml-6 mb-4 text-gray-700">
        <li>
          All services are provided by Tukang Studio as described on our website
        </li>
        <li>Payment is required before work commences</li>
        <li>Project timelines are estimates and may vary</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2">Payments</h2>
      <ul className="list-disc ml-6 mb-4 text-gray-700">
        <li>Payments are processed securely via secure payment gateways</li>
        <li>Refunds are considered on a case-by-case basis</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2">
        Intellectual Property
      </h2>
      <ul className="list-disc ml-6 mb-4 text-gray-700">
        <li>
          All work delivered remains the property of Tukang Studio until full
          payment is received
        </li>
        <li>
          Clients receive rights to use deliverables upon project completion and
          payment
        </li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2">
        Limitation of Liability
      </h2>
      <p className="mb-4 text-gray-700">
        Tukang Studio is not liable for any indirect or consequential damages
        arising from the use of our services.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">Updates</h2>
      <p className="mb-4 text-gray-700">
        These terms may be updated periodically. Please check back for changes.
      </p>
    </div>
  );
}

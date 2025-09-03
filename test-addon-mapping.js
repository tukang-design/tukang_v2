// Test script to verify addon mapping is working correctly

const addons = [
  {
    id: "domain",
    name: "Domain Registration",
    price: 60,
    description: "1 year .com domain included",
    category: "Domain",
  },
  {
    id: "page",
    name: "Additional Page",
    price: 350,
    description: "Extra custom website page",
    category: "Page",
  },
  {
    id: "contact",
    name: "Advanced Contact Form",
    price: 400,
    description: "Enhanced form with automation",
    category: "Feature",
  },
  {
    id: "blog",
    name: "Blog / News Section",
    price: 750,
    description: "Fully functional blog with CMS setup",
    category: "Feature",
  },
  {
    id: "email",
    name: "Email Auto-Reply",
    price: 450,
    description: "Automated email responses",
    category: "Feature",
  },
  {
    id: "maintenance",
    name: "Website Maintenance",
    price: 250,
    description: "Monthly updates, security & support",
    category: "Service",
  },
];

// Test the mapping logic that was fixed
const selectedAddons = ["page", "blog", "email"]; // Example selection

const services = selectedAddons.map((addonId) => {
  const addon = addons.find((a) => a.id === addonId);
  return {
    name: addon?.name || "Unknown Service",
    category: addon?.category || "Service",
  };
});

console.log("Selected addon IDs:", selectedAddons);
console.log("Mapped services:", services);

// Verify all names are properly resolved
const hasUnknownServices = services.some(
  (service) => service.name === "Unknown Service"
);
console.log("Has unknown services:", hasUnknownServices);

if (!hasUnknownServices) {
  console.log("✅ Addon mapping is working correctly!");
  console.log("Services that will be saved to Sanity:");
  services.forEach((service, index) => {
    console.log(`${index + 1}. ${service.name} (${service.category})`);
  });
} else {
  console.log("❌ Some services are not being mapped correctly");
}

// Test script to verify the complete quote submission flow with all fields
const testQuoteSubmission = async () => {
  const testData = {
    name: "Test User",
    email: "test@example.com",
    company: "Test Company",
    phone: "+1234567890",

    // Main service selection
    selectedService: {
      id: "business-website",
      name: "The Business Website",
      basePrice: 1899,
    },

    // Add-on services
    services: [
      {
        name: "Blog / News Section",
        category: "Feature",
        id: "blog",
        price: 750,
      },
      {
        name: "Additional Page",
        category: "Page",
        id: "page",
        price: 350,
      },
      {
        name: "Email Auto-Reply",
        category: "Feature",
        id: "email",
        price: 450,
      },
    ],

    // Project configuration
    projectConfiguration: {
      domain: "new",
      paymentPlan: "installments",
    },

    timeline: "Normal (3-4 weeks)",

    projectBrief: {
      businessName: "Test Business Inc",
      businessDescription:
        "A comprehensive test business for verification of the booking system",
      mainGoal: "Get more customer inquiries",
    },

    estimatedPrice: 3449,
    region: "MY",
    submittedAt: new Date().toISOString(),
  };

  try {
    console.log("🧪 Testing complete quote submission with all fields...");
    console.log("\n📋 Submission Data:");
    console.log("Main Service:", testData.selectedService.name);
    console.log(
      "Add-on Services:",
      testData.services.map((s) => s.name).join(", ")
    );
    console.log("Domain Choice:", testData.projectConfiguration.domain);
    console.log("Payment Plan:", testData.projectConfiguration.paymentPlan);
    console.log("Business Name:", testData.projectBrief.businessName);
    console.log("Main Goal:", testData.projectBrief.mainGoal);
    console.log("Estimated Price:", `RM${testData.estimatedPrice}`);

    const response = await fetch("http://localhost:3002/api/submit-quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("\n✅ Quote submission successful!");
      console.log("Response:", result);

      // Verify all key fields are present
      const requiredFields = [
        "selectedService.name",
        "services",
        "projectConfiguration.domain",
        "projectBrief.businessName",
      ];

      console.log("\n🔍 Field Verification:");
      requiredFields.forEach((field) => {
        const hasField = field
          .split(".")
          .reduce((obj, key) => obj && obj[key], testData);
        console.log(
          `${hasField ? "✅" : "❌"} ${field}: ${hasField || "MISSING"}`
        );
      });
    } else {
      console.log("\n❌ Quote submission failed:");
      console.log("Status:", response.status);
      console.log("Error:", result);
    }
  } catch (error) {
    console.log("\n❌ Network error:", error.message);
  }
};

// Run the test
testQuoteSubmission();

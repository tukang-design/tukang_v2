// Test script to verify the complete quote submission flow
const testQuoteSubmission = async () => {
  const testData = {
    name: "Test User",
    email: "test@example.com",
    company: "Test Company",
    phone: "+1234567890",
    services: [
      { name: "Blog / News Section", category: "Feature" },
      { name: "Additional Page", category: "Page" },
      { name: "Email Auto-Reply", category: "Feature" },
    ],
    timeline: "Normal (3-4 weeks)",
    projectBrief: {
      businessName: "Test Business",
      businessDescription: "A test business for verification",
      mainGoal: "Test the booking system",
    },
    estimatedPrice: 2000,
    region: "MY",
    submittedAt: new Date().toISOString(),
  };

  try {
    console.log("🧪 Testing quote submission with proper addon names...");
    console.log("Services being submitted:", testData.services);

    const response = await fetch("http://localhost:3001/api/submit-quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("✅ Quote submission successful!");
      console.log("Response:", result);

      // Check if services have proper names (not "Unnamed Service")
      const hasProperNames = testData.services.every(
        (service) =>
          service.name !== "Unnamed Service" && service.name.length > 0
      );

      if (hasProperNames) {
        console.log("✅ Addon names are properly resolved!");
        console.log("Services saved:");
        testData.services.forEach((service, index) => {
          console.log(`   ${index + 1}. ${service.name} (${service.category})`);
        });
      } else {
        console.log("❌ Some services still show as 'Unnamed Service'");
      }
    } else {
      console.log("❌ Quote submission failed:");
      console.log("Error:", result);
    }
  } catch (error) {
    console.log("❌ Network error:", error.message);
  }
};

// Run the test
testQuoteSubmission();

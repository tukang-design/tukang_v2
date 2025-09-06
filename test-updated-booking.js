// Test the updated booking system with price breakdown
const testBookingWithPrices = async () => {
  const testData = {
    selectedGoals: [
      {
        id: "business-presence",
        title: "Establish Business Presence",
        description: "Create a professional online presence",
        price: 3500,
      },
      {
        id: "generate-leads",
        title: "Generate Leads",
        description: "Capture and convert potential customers",
        price: 2800,
      },
    ],
    selectedFeatures: [
      {
        id: "seo-optimization",
        title: "SEO Optimization",
        description: "Improve search engine visibility",
        price: 500,
      },
      {
        id: "premium-hosting",
        title: "Premium Web Hosting",
        description: "Fast loading high-performance hosting",
        price: 150,
      },
    ],
    projectBrief: {
      businessName: "Tukang Test Co",
      businessDescription:
        "A testing company for the updated booking system with price breakdown",
    },
    contactInfo: {
      name: "Test User",
      email: "test@example.com",
      phone: "+60174062788",
    },
    selectedRegion: "MY",
    totalPrice: 6950,
    websiteType: "Business Website",
  };

  try {
    console.log("Testing updated booking with price breakdown...");

    const response = await fetch("http://localhost:3000/api/booking/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testData),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("✅ Updated booking submitted successfully!");
      console.log("Submission ID:", result.submissionId);
      console.log("Document ID:", result.documentId);
      console.log("Expected price breakdown in email:");
      console.log("- Goals: RM6,300 (Business Presence + Generate Leads)");
      console.log("- Features: RM650 (SEO + Premium Hosting)");
      console.log("- Total: RM6,950");
    } else {
      console.log("❌ Booking submission failed:", result.error);
    }
  } catch (error) {
    console.error("❌ Error submitting booking:", error);
  }
};

testBookingWithPrices();

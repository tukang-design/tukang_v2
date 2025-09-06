// Test booking submission with properly formatted data
const testBookingSubmission = async () => {
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
    ],
    projectBrief: {
      businessName: "Test Company",
      businessDescription: "A testing company for booking validation",
    },
    contactInfo: {
      name: "Test User",
      email: "test@example.com",
      company: "Test Company",
      phone: "+60123456789",
    },
    selectedRegion: "MY",
    totalPrice: 6800,
    websiteType: "Business Website",
  };

  try {
    console.log("Sending test booking submission...");

    const response = await fetch("http://localhost:3000/api/booking/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testData),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("✅ Booking submitted successfully!");
      console.log("Submission ID:", result.submissionId);
      console.log("Document ID:", result.documentId);
    } else {
      console.log("❌ Booking submission failed:", result.error);
    }
  } catch (error) {
    console.error("❌ Error submitting booking:", error);
  }
};

testBookingSubmission();

// Test email functionality without acceptance links
async function testSimpleBooking() {
  const baseUrl = "http://localhost:3000";

  const bookingData = {
    selectedGoals: [
      {
        id: "generate-leads",
        title: "Generate Leads",
        description: "Attract potential customers",
        price: 2500,
      },
    ],
    selectedFeatures: [
      {
        id: "seo-optimization",
        title: "SEO Optimization",
        description: "Improve search rankings",
        price: 500,
      },
    ],
    projectBrief: {
      businessName: "Test Business Inc",
      businessDescription: "A test business for simplified email flow",
    },
    contactInfo: {
      name: "Test User",
      email: "test@example.com",
      phone: "+1234567890",
    },
    selectedRegion: "MY",
    totalPrice: 3000,
  };

  try {
    console.log("🧪 Testing simplified booking submission...\n");

    const response = await fetch(`${baseUrl}/api/booking/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("✅ Booking submitted successfully!");
      console.log(`📋 Submission ID: ${result.submissionId}`);
      console.log(
        `📧 Email should include "Accept Quotation" reply instruction`
      );
      console.log(`💰 Total: RM${bookingData.totalPrice.toLocaleString()}`);
    } else {
      const error = await response.text();
      console.log("❌ Error:", error);
    }
  } catch (error) {
    console.log("❌ Network error:", error.message);
  }
}

testSimpleBooking();

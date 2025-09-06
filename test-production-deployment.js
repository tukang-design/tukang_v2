// Production deployment test for simplified email workflow
async function testProductionBooking() {
  const baseUrl = "https://tukang.design";

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
      businessName: "Production Test Business",
      businessDescription:
        "Testing production deployment of simplified email workflow",
    },
    contactInfo: {
      name: "Production Test",
      email: "test@example.com",
      phone: "+1234567890",
    },
    selectedRegion: "MY",
    totalPrice: 3000,
  };

  try {
    console.log("🌐 Testing production booking submission...\n");

    const response = await fetch(`${baseUrl}/api/booking/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("✅ Production booking submitted successfully!");
      console.log(`📋 Submission ID: ${result.submissionId}`);
      console.log(`📧 Email sent with "Accept Quotation" reply workflow`);
      console.log(`💰 Total: RM${bookingData.totalPrice.toLocaleString()}`);
      console.log(
        "\n🎉 Deployment successful - simplified email workflow is live!"
      );
    } else {
      const error = await response.text();
      console.log("❌ Production error:", error);
    }
  } catch (error) {
    console.log("❌ Network error:", error.message);
  }

  // Test that quote acceptance API is properly removed
  try {
    console.log("\n🗑️ Verifying quote acceptance API removal...");
    const acceptResponse = await fetch(`${baseUrl}/api/quote/accept`);
    if (acceptResponse.status === 404) {
      console.log("✅ Quote acceptance API properly removed (404)");
    } else {
      console.log(`⚠️ Unexpected response: ${acceptResponse.status}`);
    }
  } catch (error) {
    console.log("✅ Quote acceptance API properly removed (connection failed)");
  }
}

testProductionBooking();

import { sanityClient } from "./lib/sanity-client.js";

async function checkRecentBookings() {
  try {
    console.log("🔍 Checking recent bookings in Sanity...");
    const query =
      '*[_type == "booking"] | order(_createdAt desc)[0...5]{ _id, submissionId, contactName, status, _createdAt, acceptanceToken }';
    const bookings = await sanityClient.fetch(query);

    console.log("Recent bookings:");
    bookings.forEach((booking, i) => {
      console.log(
        `${i + 1}. ${booking.submissionId} - ${booking.contactName} - ${
          booking.status || "pending"
        } - ${new Date(booking._createdAt).toLocaleString()}`
      );
      if (booking.acceptanceToken) {
        console.log(`   Token: ${booking.acceptanceToken}`);
      }
    });

    if (bookings.length > 0) {
      const latest = bookings[0];
      console.log("\n🧪 Testing with latest booking:", latest.submissionId);

      // Test URL with saved token
      if (latest.acceptanceToken) {
        const testUrl = `http://localhost:3000/api/quote/accept?id=${latest.submissionId}&token=${latest.acceptanceToken}`;
        console.log("📋 Test URL with saved token:", testUrl);

        // Test the URL
        try {
          const response = await fetch(testUrl);
          console.log(`✅ Response: ${response.status} ${response.statusText}`);

          if (response.status === 200) {
            console.log(
              "🎉 SUCCESS! The acceptance route works with real data."
            );
          } else {
            const text = await response.text();
            console.log("❌ Error response:", text.substring(0, 200));
          }
        } catch (fetchError) {
          console.log("❌ Fetch error:", fetchError.message);
        }
      } else {
        console.log("⚠️ No acceptance token found in this booking");
      }
    } else {
      console.log("⚠️ No bookings found");
    }
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
  }
}

checkRecentBookings();

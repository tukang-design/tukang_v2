import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity";
import crypto from "node:crypto";

// Helper function to generate acceptance token
function generateAcceptanceToken(submissionId) {
  const secret = process.env.QUOTE_ACCEPTANCE_SECRET;
  if (!secret) {
    throw new Error("Server misconfigured: QUOTE_ACCEPTANCE_SECRET is missing");
  }
  return crypto
    .createHash("sha256")
    .update(submissionId + secret)
    .digest("hex")
    .substring(0, 16);
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const submissionId = searchParams.get("id");
    const token = searchParams.get("token");

    if (!submissionId || !token) {
      return NextResponse.json(
        { error: "Missing submission ID or token" },
        { status: 400 }
      );
    }

    // Verify the token
    const expectedToken = generateAcceptanceToken(submissionId);
    if (token !== expectedToken) {
      return NextResponse.json(
        { error: "Invalid acceptance token" },
        { status: 403 }
      );
    }

    // Find the booking document in Sanity
    const query = `*[_type == "booking" && submissionId == $submissionId][0]`;
    const booking = await sanityClient.fetch(query, { submissionId });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Check if already accepted
    if (booking.status === "accepted") {
      return new Response(
        `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Quote Already Accepted - Tukang</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: #0f1419;
              color: #e5e7eb;
              margin: 0;
              padding: 2rem;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .container {
              max-width: 600px;
              text-align: center;
              background: #1a1f2e;
              padding: 3rem;
              border-radius: 16px;
              border: 1px solid #2563eb;
            }
            h1 { color: #2563eb; margin-bottom: 1rem; }
            .status { 
              background: #059669; 
              color: white; 
              padding: 0.5rem 1rem; 
              border-radius: 8px; 
              display: inline-block;
              margin: 1rem 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Quote Already Accepted</h1>
            <div class="status">✅ ACCEPTED</div>
            <p>This quote was already accepted on ${new Date(
              booking.acceptedAt
            ).toLocaleDateString()}.</p>
            <p>We'll be in touch soon to follow up on your inquiry.</p>
          </div>
        </body>
        </html>
        `,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    // Update the booking status to "accepted"
    await sanityClient
      .patch(booking._id)
      .set({
        status: "accepted",
        acceptedAt: new Date().toISOString(),
        acceptanceToken: token,
      })
      .commit();

    console.log("Quote accepted successfully:", {
      submissionId,
      documentId: booking._id,
      acceptedAt: new Date().toISOString(),
    });

    // Return styled success page matching global design
    return new Response(
      `
      <!DOCTYPE html>
      <html lang="en" class="scroll-smooth">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Quote Accepted - Tukang Design</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <script>
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    accent: '#10b981',
                    primary: '#1f2937',
                    secondary: '#6b7280',
                    olive: '#0f1419',
                    'olive-dark': '#0a0f14'
                  }
                }
              }
            }
          </script>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
            body { font-family: 'Inter', sans-serif; }
            .animate-bounce-slow { animation: bounce 2s infinite; }
            .animate-fade-in { animation: fadeIn 0.8s ease-in-out; }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          </style>
      </head>
      <body class="bg-olive min-h-screen text-white">
          <div class="min-h-screen flex items-center justify-center p-4">
              <div class="max-w-2xl w-full animate-fade-in">
                  <!-- Header -->
                  <div class="text-center mb-8">
                      <div class="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
                          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                      </div>
                      <h1 class="text-4xl font-bold text-white mb-4">🎉 Quote Accepted!</h1>
                      <p class="text-xl text-gray-300">Thank you for choosing Tukang Design</p>
                  </div>

                  <!-- Main Card -->
                  <div class="bg-olive-dark rounded-2xl border border-accent/20 overflow-hidden">
                      <!-- Success Banner -->
                      <div class="bg-gradient-to-r from-accent to-emerald-600 p-6 text-white">
                          <h2 class="text-2xl font-semibold mb-2">Your project is confirmed!</h2>
                          <p class="text-emerald-100">We're excited to bring your vision to life.</p>
                      </div>

                      <!-- Content -->
                      <div class="p-8">
                          <!-- Next Steps -->
                          <div class="mb-8">
                              <h3 class="text-xl font-semibold text-white mb-4">What happens next?</h3>
                              <div class="space-y-4">
                                  <div class="flex items-start space-x-4">
                                      <div class="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm">1</div>
                                      <div>
                                          <h4 class="font-medium text-white">Invoice & Deposit</h4>
                                          <p class="text-gray-300 text-sm">We'll issue an invoice for the deposit within 24 hours</p>
                                      </div>
                                  </div>
                                  <div class="flex items-start space-x-4">
                                      <div class="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm">2</div>
                                      <div>
                                          <h4 class="font-medium text-white">Project Kickoff</h4>
                                          <p class="text-gray-300 text-sm">Our team will contact you for a project kickoff call</p>
                                      </div>
                                  </div>
                                  <div class="flex items-start space-x-4">
                                      <div class="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm">3</div>
                                      <div>
                                          <h4 class="font-medium text-white">Development Begins</h4>
                                          <p class="text-gray-300 text-sm">Project development starts once deposit is received</p>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          <!-- Project Details -->
                          <div class="bg-olive rounded-xl p-6 mb-6 border border-accent/10">
                              <h3 class="text-lg font-semibold text-white mb-4">Project Details</h3>
                              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                  <div>
                                      <span class="text-gray-400">Submission ID:</span>
                                      <span class="font-medium text-white ml-2">${submissionId}</span>
                                  </div>
                                  <div>
                                      <span class="text-gray-400">Status:</span>
                                      <span class="font-medium text-accent ml-2">✅ Accepted</span>
                                  </div>
                                  <div>
                                      <span class="text-gray-400">Website Type:</span>
                                      <span class="font-medium text-white ml-2">${
                                        booking.websiteType || "Custom Website"
                                      }</span>
                                  </div>
                                  <div>
                                      <span class="text-gray-400">Accepted Date:</span>
                                      <span class="font-medium text-white ml-2">${new Date().toLocaleDateString()}</span>
                                  </div>
                              </div>
                          </div>

                          <!-- Contact Information -->
                          <div class="border-t border-accent/20 pt-6">
                              <h3 class="text-lg font-semibold text-white mb-3">Questions?</h3>
                              <p class="text-gray-300 mb-4">Our team is here to help. Get in touch anytime:</p>
                              <div class="flex flex-col sm:flex-row gap-4">
                                  <a href="mailto:studio@tukang.design" 
                                     class="inline-flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-emerald-600 transition-colors">
                                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                      </svg>
                                      Email Us
                                  </a>
                                  <a href="https://tukang.design" 
                                     class="inline-flex items-center px-4 py-2 border border-accent/30 text-white rounded-lg hover:bg-accent/10 transition-colors">
                                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                      </svg>
                                      Visit Website
                                  </a>
                              </div>
                          </div>
                      </div>
                  </div>

                  <!-- Footer -->
                  <div class="text-center mt-8 text-gray-400">
                      <p>&copy; 2024 Tukang Design. All rights reserved.</p>
                  </div>
              </div>
          </div>

          <script>
              // Scroll to top on page load
              window.scrollTo(0, 0);
          </script>
      </body>
      </html>
      `,
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (error) {
    console.error("Error accepting quote:", error);

    return new Response(
      `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Error - Tukang</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #0f1419;
            color: #e5e7eb;
            margin: 0;
            padding: 2rem;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .container {
            max-width: 600px;
            text-align: center;
            background: #1a1f2e;
            padding: 3rem;
            border-radius: 16px;
            border: 1px solid #ef4444;
          }
          h1 { color: #ef4444; margin-bottom: 1rem; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>❌ Error</h1>
          <p>Unable to process quote acceptance. Please contact studio@tukang.design for assistance.</p>
          <p style="opacity: 0.7;">Error: ${error.message}</p>
        </div>
      </body>
      </html>
      `,
      { headers: { "Content-Type": "text/html" } }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity";

// Helper function to generate a unique submission ID
function generateSubmissionId() {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).substring(2, 8);
  return `BK-${timestamp}-${randomString}`.toUpperCase();
}

// Helper function to get currency info based on region
function getCurrencyInfo(region) {
  const currencyMap = {
    MY: { symbol: "RM", multiplier: 1 },
    SG: { symbol: "SGD", multiplier: 0.63 },
    INT: { symbol: "€", multiplier: 0.25 },
  };
  return currencyMap[region] || currencyMap.INT;
}

export async function POST(request) {
  try {
    const bookingData = await request.json();

    // Validate required fields
    if (
      !bookingData.service ||
      !bookingData.contactInfo?.name ||
      !bookingData.contactInfo?.email
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: service, contact name, or contact email",
        },
        { status: 400 }
      );
    }

    // Generate unique submission ID
    const submissionId = generateSubmissionId();

    // Get currency info
    const currencyInfo = getCurrencyInfo(bookingData.region);

    // Calculate estimated price
    const basePrice = bookingData.service.basePrice * currencyInfo.multiplier;
    let addOnsPrice = 0;

    if (bookingData.projectDetails?.selectedAddOns?.length > 0) {
      // Get add-on details from the booking data
      const selectedAddOnIds = bookingData.projectDetails.selectedAddOns;
      // You might want to fetch add-on prices from your data source
      // For now, we'll calculate based on typical add-on prices
      const addOnPrices = {
        "seo-optimization": 800,
        "analytics-setup": 500,
        "social-media": 600,
        ecommerce: 2000,
        "blog-system": 1200,
        maintenance: 300, // monthly
      };

      addOnsPrice = selectedAddOnIds.reduce((total, addOnId) => {
        return total + (addOnPrices[addOnId] || 0) * currencyInfo.multiplier;
      }, 0);
    }

    const totalEstimatedPrice = Math.round(basePrice + addOnsPrice);

    // Prepare the document for Sanity
    const sanityDocument = {
      _type: "booking",
      submissionId,
      submittedAt: new Date().toISOString(),
      status: "new",
      service: {
        id: bookingData.service.id,
        name: bookingData.service.name,
        basePrice: bookingData.service.basePrice,
      },
      addOns:
        bookingData.projectDetails?.selectedAddOns?.map((addOnId) => {
          // Map add-on IDs to full objects
          const addOnDetails = {
            "seo-optimization": { name: "SEO Optimization", basePrice: 800 },
            "analytics-setup": { name: "Analytics Setup", basePrice: 500 },
            "social-media": {
              name: "Social Media Integration",
              basePrice: 600,
            },
            ecommerce: { name: "E-commerce Functionality", basePrice: 2000 },
            "blog-system": { name: "Blog System", basePrice: 1200 },
            maintenance: { name: "Monthly Maintenance", basePrice: 300 },
          };

          const details = addOnDetails[addOnId] || {
            name: addOnId,
            basePrice: 0,
          };
          return {
            id: addOnId,
            name: details.name,
            basePrice: details.basePrice,
          };
        }) || [],
      projectDetails: {
        timeline: bookingData.projectDetails?.timeline || "",
        budget: bookingData.projectDetails?.budget || "",
        description: bookingData.projectDetails?.description || "",
        features: bookingData.projectDetails?.features || [],
      },
      contactInfo: {
        name: bookingData.contactInfo.name,
        email: bookingData.contactInfo.email,
        company: bookingData.contactInfo.company || "",
        phone: bookingData.contactInfo.phone || "",
      },
      region: bookingData.region || "INT",
      estimatedPrice: {
        amount: totalEstimatedPrice,
        currency: currencyInfo.symbol,
        originalAmount: Math.round(
          bookingData.service.basePrice + addOnsPrice / currencyInfo.multiplier
        ),
      },
      language: bookingData.language || "en",
      scheduledCall: bookingData.scheduledCall || false,
      followUpDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
    };

    // Save to Sanity
    const result = await sanityClient.create(sanityDocument);

    console.log("Booking submitted successfully:", {
      submissionId,
      documentId: result._id,
      contactName: bookingData.contactInfo.name,
      service: bookingData.service.name,
    });

    return NextResponse.json({
      success: true,
      submissionId,
      documentId: result._id,
      message: "Booking submitted successfully",
    });
  } catch (error) {
    console.error("Error saving booking to Sanity:", error);

    return NextResponse.json(
      {
        error: "Failed to submit booking",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  return NextResponse.json({
    message: "Booking API endpoint is working",
    methods: ["POST"],
  });
}

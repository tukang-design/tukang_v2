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

    // Check if this is the new goal-based structure or old service-based structure
    const isGoalBased =
      bookingData.selectedGoals && Array.isArray(bookingData.selectedGoals);

    if (isGoalBased) {
      // Handle new goal-based booking structure
      return await handleGoalBasedBooking(bookingData);
    } else {
      // Handle legacy service-based structure
      return await handleServiceBasedBooking(bookingData);
    }
  } catch (error) {
    console.error("Error processing booking:", error);
    return NextResponse.json(
      {
        error: "Failed to submit booking",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

async function handleGoalBasedBooking(bookingData) {
  // Validate required fields for goal-based structure
  if (!bookingData.selectedGoals || !bookingData.contactInfo) {
    return NextResponse.json(
      { error: "Missing required fields: selectedGoals and contactInfo" },
      { status: 400 }
    );
  }

  // Generate unique submission ID
  const submissionId = generateSubmissionId();

  // Determine website type based on selected goals
  function getWebsiteType(goals) {
    const goalIds = goals.map((goal) => goal.id);

    if (
      goalIds.includes("sell-products") ||
      goalIds.includes("take-payments")
    ) {
      return "E-commerce Website";
    }
    if (
      goalIds.includes("generate-leads") ||
      goalIds.includes("showcase-portfolio")
    ) {
      return "Business Website";
    }
    if (
      goalIds.includes("share-content") ||
      goalIds.includes("build-community")
    ) {
      return "Content Website";
    }
    return "Custom Website";
  }

  const websiteType = getWebsiteType(bookingData.selectedGoals);

  // Prepare the document for Sanity
  const sanityDocument = {
    _type: "booking",
    submissionId,
    submittedAt: new Date().toISOString(),
    status: "new",
    bookingType: "goal-based",
    websiteType,
    selectedGoals: bookingData.selectedGoals.map((goal) => ({
      id: goal.id,
      title: goal.title,
      description: goal.description,
      price: goal.price,
    })),
    selectedFeatures: (bookingData.selectedFeatures || []).map((feature) => ({
      id: feature.id,
      title: feature.title,
      description: feature.description,
      price: feature.price,
    })),
    projectBrief: {
      businessDescription: bookingData.projectBrief?.businessDescription || "",
      targetAudience: bookingData.projectBrief?.targetAudience || "",
      keyGoals: bookingData.projectBrief?.keyGoals || "",
      timeline: bookingData.projectBrief?.timeline || "",
      budget: bookingData.projectBrief?.budget || "",
      inspiration: bookingData.projectBrief?.inspiration || "",
      additionalRequirements:
        bookingData.projectBrief?.additionalRequirements || "",
    },
    contactInfo: {
      name: bookingData.contactInfo.name,
      email: bookingData.contactInfo.email,
      company: bookingData.contactInfo.company || "",
      phone: bookingData.contactInfo.phone || "",
    },
    region: bookingData.selectedRegion || "INT",
    pricing: {
      totalAmount: bookingData.totalPrice || 0,
      currency: bookingData.selectedRegion === "MY" ? "MYR" : "USD",
      region: bookingData.selectedRegion || "INT",
    },
    language: "en", // Default to English for now
    followUpDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
  };

  // Save to Sanity
  try {
    const result = await sanityClient.create(sanityDocument);

    console.log("Goal-based booking submitted successfully:", {
      submissionId,
      documentId: result._id,
      contactName: bookingData.contactInfo.name,
      websiteType,
      goalsCount: bookingData.selectedGoals.length,
      totalPrice: bookingData.totalPrice,
    });

    return NextResponse.json({
      success: true,
      submissionId,
      documentId: result._id,
      websiteType,
      message: "Booking submitted successfully",
    });
  } catch (sanityError) {
    console.error("Error saving goal-based booking to Sanity:", sanityError);
    return NextResponse.json(
      {
        error: "Failed to submit booking",
        details: sanityError.message,
      },
      { status: 500 }
    );
  }
}

async function handleServiceBasedBooking(bookingData) {
  // Validate required fields for legacy structure
  if (!bookingData.service || !bookingData.contactInfo) {
    return NextResponse.json(
      { error: "Missing required fields: service and contactInfo" },
      { status: 400 }
    );
  }

  // Generate unique submission ID
  const submissionId = generateSubmissionId();
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
  try {
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

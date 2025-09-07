import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity";

export async function GET() {
  try {
    const query = `*[_type == "portfolioProject"][0...3] {
      _id,
      title,
      category,
      slug,
      mainImage {
        asset-> {
          _id,
          url
        },
        alt
      },
      gallery[] {
        asset-> {
          _id,
          url
        },
        alt
      },
      publishedAt,
      featured
    }`;

    const projects = await sanityClient.fetch(query);

    return NextResponse.json({
      success: true,
      projects: projects || [],
      count: projects?.length || 0,
    });
  } catch (error) {
    console.error("API Error fetching portfolio projects:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch portfolio projects",
        projects: [],
        count: 0,
      },
      { status: 500 }
    );
  }
}

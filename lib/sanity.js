import { createClient } from "@sanity/client";

const projectId = "330f0le5";
const dataset = "production";
console.log("Sanity project:", projectId, dataset);

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2023-08-31",
  useCdn: false, // Set to false for write operations
  token: process.env.SANITY_API_TOKEN, // Add token for write operations
});

// Create a separate read-only client for faster reads
export const sanityReadClient = createClient({
  projectId,
  dataset,
  apiVersion: "2023-08-31",
  useCdn: true,
});

// Write client for creating/updating documents
export const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion: "2023-08-31",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export async function fetchSanity(query, params = {}) {
  return sanityReadClient.fetch(query, params);
}

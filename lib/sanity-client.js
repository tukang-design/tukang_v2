
import { createClient } from '@sanity/client';

const projectId = '330f0le5';
const dataset = 'production';
console.log('Sanity project:', projectId, dataset);

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2023-08-31',
  useCdn: true,
});

export async function fetchSanity(query, params = {}) {
  return sanityClient.fetch(query, params);
}

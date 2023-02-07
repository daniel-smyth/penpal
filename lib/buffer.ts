import { Readable } from "stream";

/**
 * Takes a readable stream and concatenates its chunks into a single buffer
 */
export async function buffer(readable: Readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

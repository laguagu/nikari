import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {
    const blob = await req.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());

    const resizedImage = await sharp(buffer)
      .resize({
        width: 1280,
        height: 720,
        withoutEnlargement: true,
        fit: "inside",
      })
      .jpeg({ quality: 90 })
      .toBuffer();

    const base64Image = `data:image/jpeg;base64,${resizedImage.toString("base64")}`;
    return new NextResponse(base64Image, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error processing image:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 },
    );
  }
}

//   // Koodi parhaaseen mahdolliseen skaalaamiseen ja tulokseen
//   export async function POST(req: NextRequest) {
//     try {
//       const blob = await req.blob();
//       const buffer = Buffer.from(await blob.arrayBuffer());
//       const image = sharp(buffer);
//       const metadata = await image.metadata();

//       // Define target sizes and maximum allowed dimensions
//       const maxDimension = 2048;  // Maximum size for high detail mode
//       const minDimension = 768;   // Minimum size for high detail mode

//       let { width, height } = metadata;

//       // Scale down if either dimension exceeds the maximum allowed size
//       if (width > maxDimension || height > maxDimension) {
//           const scalingFactor = Math.min(maxDimension / width, maxDimension / height);
//           width = Math.round(width * scalingFactor);
//           height = Math.round(height * scalingFactor);
//       }

//       // Ensure the smallest dimension is at least the minimum required for high detail
//       if (Math.min(width, height) < minDimension) {
//           const resizeFactor = minDimension / Math.min(width, height);
//           width = Math.round(width * resizeFactor);
//           height = Math.round(height * resizeFactor);
//       }

//       const resizedImage = await sharp(buffer)
//         .resize(width, height, {
//           fit: 'inside',
//           withoutEnlargement: true
//         })
//         .jpeg({ quality: 90 })
//         .toBuffer();

//       const base64Image = `data:image/jpeg;base64,${resizedImage.toString('base64')}`;
//       return new NextResponse(base64Image, {
//         status: 200,
//         headers: { 'Content-Type': 'text/plain' }
//       });
//     } catch (error) {
//       console.error('Error processing image:', error);
//       return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
//     }
// }

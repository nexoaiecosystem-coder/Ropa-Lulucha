import { NextRequest } from "next/server";

function luminance(hex: string) {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function escapeXml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function wrapLines(text: string, maxChars: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ bg: string; label: string }> }
) {
  const { bg, label } = await params;
  const bgHex = /^[0-9a-fA-F]{6}$/.test(bg) ? `#${bg}` : "#171717";
  const fg = luminance(bgHex.replace("#", "")) > 0.5 ? "#171717" : "#f5f5f4";
  const text = decodeURIComponent(label).toUpperCase();
  const lines = wrapLines(text, 14).slice(0, 3);
  const lineHeight = 46;
  const startY = 500 - ((lines.length - 1) * lineHeight) / 2;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
    <rect width="800" height="1000" fill="${bgHex}"/>
    <rect x="24" y="24" width="752" height="952" fill="none" stroke="${fg}" stroke-opacity="0.25" stroke-width="2"/>
    <text x="400" y="60" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" letter-spacing="6" fill="${fg}" fill-opacity="0.55">LULUCHA</text>
    ${lines
      .map(
        (line, i) =>
          `<text x="400" y="${startY + i * lineHeight}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="34" letter-spacing="1" fill="${fg}">${escapeXml(
            line
          )}</text>`
      )
      .join("\n")}
  </svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

import languageShortNames from "./LanguageShortNames";

export function generateSVG(
  totalTime: number,
  languageStats: Record<string, number>
) {
  const langs = Object.entries(languageStats).sort((a, b) => b[1] - a[1]);
  const padding = 28;
  const gapX = 18;
  const gapY = 14;
  const pillHeight = 48;
  const pillPaddingX = 14;
  const fontSize = 14;
  // Title sizing and vertical layout
  const titleFontSize = 52;
  const titleY = padding + titleFontSize; // place title just below padding
  // keep pills close to the title baseline — small vertical gap
  const pillsStartY = titleY + 16; // 16px below the title baseline
  const svgWidth = 500;
  const maxPillsPerRow = 1;

  const langColors: Record<string, string> = {
    JS: "#f1e05a",
    JSX: "#f1e05a",
    TS: "#3178c6",
    TSX: "#3178c6",
    PYTHON: "#3572A5",
    JAVA: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    GO: "#00ADD8",
    RUST: "#dea584",
    RB: "#701516",
    PHP: "#4F5D95",
    SWIFT: "#F05138",
    KT: "#A97BFF",
    "C#": "#178600",
    HTML: "#e34c26",
    CSS: "#563d7c",
    SCSS: "#c6538c",
    JSON: "#353535",
    MD: "#083fa1",
    SHELL: "#89e051",
    BASH: "#89e051",
    SQL: "#e38c00",
    YAML: "#cb171e",
    PRISMA: "#2d3748",
    DART: "#00B4AB",
    SCALA: "#c22d40",
    LUA: "#000080",
    PS: "#012456",
    HS: "#5e5086",
    default: "#8b949e",
  };

  function formatTime(minutes: number): string {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = Math.round(minutes % 60);
      return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
    } else {
      return `${Math.round(minutes)}m`;
    }
  }

  function textWidth(text: string): number {
    return text.length * (fontSize * 0.58);
  }

  function getShortName(langName: string): string {
    const normalized = langName.toLowerCase();
    return (
      (languageShortNames as Record<string, string>)[normalized] ||
      langName.toUpperCase()
    );
  }

  function getColor(shortName: string): string {
    return langColors[shortName] || langColors["default"];
  }

  const totalMinutes =
    Object.values(languageStats).reduce((a, b) => a + b, 0) || 1;

  let x = padding;
  let y = pillsStartY;
  let pillsInRow = 0;
  const pills: string[] = [];

  const columnWidth = svgWidth - padding * 2;

  langs.forEach(([lang, time], idx) => {
    const shortName = getShortName(lang);
    const timeText = formatTime(time);
    const percent = Math.round((time / totalMinutes) * 100);
    const color = getColor(shortName);

    if (pillsInRow >= maxPillsPerRow) {
      pillsInRow = 0;
      x = padding;
      y += pillHeight + gapY;
    }

    const pillWidth = columnWidth;

    const nameWidth = Math.max(40, textWidth(shortName));
    const timeTextWidth = Math.max(40, textWidth(`${timeText} (${percent}%)`));
    const barX = pillPaddingX + nameWidth + 12;
    const availableForBar = Math.max(
      80,
      pillWidth - barX - pillPaddingX - timeTextWidth - 12
    );
    const innerBarWidth = availableForBar;
    const filledWidth = Math.round((percent / 100) * innerBarWidth);

    pills.push(`
      <g class="pill-group" transform="translate(${x}, ${y})">
    <!-- language name (pill text, weight 400) -->
    <text x="${pillPaddingX}" y="${
      pillHeight / 2 + 6
    }" font-size="${fontSize}" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif" font-weight="400" class="pill-lang">${shortName}</text>

  <!-- progress bar background (use #282828) and filled portion in language color -->
  <rect x="${barX}" y="${
      pillHeight / 2 - 7
    }" width="${innerBarWidth}" height="14" rx="7" fill="#282828" />
  <rect x="${barX}" y="${
      pillHeight / 2 - 7
    }" width="${filledWidth}" height="14" rx="7" fill="${color}" />

  <!-- percent/time text (pill time) - show time and percent in brackets -->
  <text x="${pillWidth - pillPaddingX}" y="${
      pillHeight / 2 + 6
    }" font-size="${fontSize}" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif" font-weight="400" text-anchor="end" class="pill-time">${timeText} (${percent}%)</text>
      </g>
    `);

    x += pillWidth + gapX;
    pillsInRow++;
  });

  const cardHeight = y + pillHeight + padding;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${cardHeight}" viewBox="0 0 ${svgWidth} ${cardHeight}">
      <defs>
        <!-- mesh-like gradient: overlay of linear + radial gradients -->
        <linearGradient id="mesh-linear" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#000000" stop-opacity="1" />
          <stop offset="50%" stop-color="#0b0b0b" stop-opacity="1" />
          <stop offset="100%" stop-color="#000000" stop-opacity="1" />
        </linearGradient>

        <radialGradient id="mesh-radial" cx="30%" cy="20%" r="80%">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.95" />
          <stop offset="50%" stop-color="#060606" stop-opacity="0.85" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0.8" />
        </radialGradient>

      </defs>

    <!-- solid card background as requested -->
  <rect width="100%" height="100%" fill="#181818" />

      <!-- Title and totals (non-pill text should be weight 500 and white) -->
      <text x="${padding}" y="${titleY}" font-size="${titleFontSize}" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif" font-weight="600">${formatTime(
    totalTime
  )}</text>

      <!-- Pills -->
      ${pills.join("")}
    </svg>
  `;
}

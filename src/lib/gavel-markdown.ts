/**
 * Renders the supplied Gavel Live markdown as HTML.
 * Text is escaped. The files are contract data, not page instructions.
 */

const DOC_LINKS: Record<string, string> = {
  "rest-reference.md": "/gavel-live/rest-api/",
  "mcp-quickstart.md": "/gavel-live/mcp/",
  "auth-security.md": "/gavel-live/authentication/",
  "image-upload.md": "/gavel-live/image-upload/",
  "examples.md": "/gavel-live/examples/",
  "realtime-events.md": "/gavel-live/realtime/",
  "openapi.yaml": "/gavel-live/openapi.yaml",
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderInline(raw: string): string {
  const pattern = /(`[^`]+`)|(\[[^\]]+\]\([^)\s]+\))/g;
  let html = "";
  let last = 0;
  for (const match of raw.matchAll(pattern)) {
    const index = match.index ?? 0;
    html += escapeHtml(raw.slice(last, index));
    const token = match[0];
    if (token.startsWith("`")) {
      html += `<code>${escapeHtml(token.slice(1, -1))}</code>`;
    } else {
      const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(token);
      const label = link?.[1] ?? token;
      const href = link?.[2] ?? "";
      const mapped = DOC_LINKS[href];
      if (mapped) {
        html += `<a href="${escapeHtml(mapped)}">${escapeHtml(label)}</a>`;
      } else {
        html += escapeHtml(token);
      }
    }
    last = index + token.length;
  }
  html += escapeHtml(raw.slice(last));
  return html;
}

function isTableRow(line: string): boolean {
  return line.trim().startsWith("|") && line.trim().endsWith("|");
}

function splitRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return trimmed.split("|").map((cell) => cell.trim());
}

function isSeparator(cells: string[]): boolean {
  return cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function renderTable(rows: string[]): string {
  const parsed = rows.map(splitRow);
  const head = parsed[0] ?? [];
  const start = parsed[1] && isSeparator(parsed[1]) ? 2 : 1;
  const body = parsed.slice(start);
  const headHtml = head.map((cell) => `<th scope="col">${renderInline(cell)}</th>`).join("");
  const bodyHtml = body
    .map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join("")}</tr>`)
    .join("");
  return `<div class="wiki-table"><table><thead><tr>${headHtml}</tr></thead><tbody>${bodyHtml}</tbody></table></div>`;
}

export function renderGavelMarkdown(markdown: string): string {
  const lines = markdown.replaceAll("\r\n", "\n").replace(/^\uFEFF/, "").split("\n");
  if (lines[0]?.startsWith("# ")) lines.splice(0, 1);
  if (lines[0] === "") lines.shift();

  const blocks: string[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index] ?? "";

    if (line.startsWith("```")) {
      const language = line.slice(3).trim();
      const safeLanguage = /^[a-z0-9-]+$/i.test(language) ? language : "";
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        code.push(lines[index] ?? "");
        index += 1;
      }
      if (index >= lines.length) throw new Error("Unclosed code fence in Gavel Live markdown");
      index += 1;
      const className = safeLanguage ? ` class="language-${escapeHtml(safeLanguage)}"` : "";
      blocks.push(`<pre><code${className}>${escapeHtml(code.join("\n"))}</code></pre>`);
      continue;
    }

    if (isTableRow(line)) {
      const rows: string[] = [];
      while (index < lines.length && isTableRow(lines[index] ?? "")) {
        rows.push(lines[index] ?? "");
        index += 1;
      }
      blocks.push(renderTable(rows));
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push(`<h2>${renderInline(line.slice(3).trim())}</h2>`);
      index += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (index < lines.length && (lines[index] ?? "").startsWith("- ")) {
        items.push(`<li>${renderInline((lines[index] ?? "").slice(2).trim())}</li>`);
        index += 1;
      }
      blocks.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    if (line.trim() === "") {
      index += 1;
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length) {
      const current = lines[index] ?? "";
      if (
        current.trim() === "" ||
        current.startsWith("```") ||
        current.startsWith("## ") ||
        current.startsWith("- ") ||
        isTableRow(current)
      ) {
        break;
      }
      paragraph.push(current.trim());
      index += 1;
    }
    blocks.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
  }

  return blocks.join("\n");
}

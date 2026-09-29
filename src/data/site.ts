/**
 * Site copy and contact details.
 *
 * Name, phone, and email are confirmed. Service area and address stay null
 * until provided — null fields render as bracketed placeholders.
 * Do not invent a street address or professional designation.
 *
 * `renderVcard()` is the contact file linked from the card. Astro rewrites
 * `public/luke-jaroszewski.vcf` from it on startup.
 */

export const site = {
  name: "LJ Auctions",
  domain: "ljauctions.com",
  url: "https://ljauctions.com",
  positioning: "Auctioneer for estates, equipment, and personal property.",
  description:
    "LJ Auctions conducts auctions for estates, equipment, and personal property.",
} as const;

export const contact = {
  businessName: site.name,
  role: "Auctioneer",
  contactName: "Luke Jaroszewski",
  givenName: "Luke",
  familyName: "Jaroszewski",
  /** Shown on the card. */
  phoneDisplay: "(830) 743-1180",
  /** E.164 number used by tel: links and the vCard. */
  phoneTel: "+18307431180",
  email: "luke.jaroszewski@gmail.com",
  /** TODO: counties or region served. */
  serviceArea: null as string | null,
  /** TODO: mailing or office address. Use line breaks for a multi-line address. */
  address: null as string | null,
};

export const vcardFile = {
  href: "/luke-jaroszewski.vcf",
  filename: "luke-jaroszewski.vcf",
} as const;

export type ContactField = {
  id: string;
  label: string;
  text: string;
  placeholder: boolean;
  href?: string;
};

export const contactPlaceholders = {
  contactName: "[Contact name]",
  phone: "[Business phone]",
  email: "[Business email]",
  serviceArea: "[Service area]",
  address: "[Business address]",
} as const;

export function contactFields(): ContactField[] {
  const name = display(contact.contactName, contactPlaceholders.contactName);
  const phone = display(contact.phoneDisplay, contactPlaceholders.phone);
  const email = display(contact.email, contactPlaceholders.email);
  const serviceArea = display(contact.serviceArea, contactPlaceholders.serviceArea);
  const address = display(contact.address, contactPlaceholders.address);

  return [
    { id: "name", label: "Name", ...name },
    {
      id: "phone",
      label: "Phone",
      ...phone,
      href: phone.placeholder ? undefined : `tel:${contact.phoneTel}`,
    },
    {
      id: "email",
      label: "Email",
      ...email,
      href: email.placeholder ? undefined : `mailto:${email.text}`,
    },
    { id: "service-area", label: "Service area", ...serviceArea },
    { id: "address", label: "Address", ...address },
  ];
}

export function emailMailto(): string {
  return `mailto:${contact.email}`;
}

/** VCF 3.0, CRLF line endings, suitable for iOS and Android contact import. */
export function renderVcard(): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${vcardEscape(contact.familyName)};${vcardEscape(contact.givenName)};;;`,
    `FN:${vcardEscape(contact.contactName)}`,
    `ORG:${vcardEscape(contact.businessName)}`,
    `TITLE:${vcardEscape(contact.role)}`,
    `TEL;TYPE=WORK,VOICE:${contact.phoneTel}`,
    `EMAIL;TYPE=INTERNET:${contact.email}`,
    "END:VCARD",
  ];
  return `${lines.join("\r\n")}\r\n`;
}

/**
 * Texas auctioneer license number (TDLR). The only place this number is stored.
 * An empty string hides the license line on the contact card, in the footer, and on About.
 */
export const texasAuctioneerLicense = "18590";

export function texasAuctioneerLicenseLine(): string | null {
  const number = texasAuctioneerLicense.trim();
  if (!number) return null;
  return `Texas Auctioneer License #${number}`;
}

/** Confirmed nonprofit work. The home strip uses `stat`; About and Services use `sentence`. */
export const nonprofitWork = {
  label: "Nonprofits",
  stat: "Trusted by 100+ nonprofits",
  sentence:
    "I've helped more than 100 nonprofits raise money, including benefit and charity auctions.",
} as const;

/** Confirmed credentials only. Null stays a placeholder — do not invent designations. */
export const credentials = {
  designations: null as string | null,
  years: null as string | null,
};

export type DisplayValue = {
  label: string;
  text: string;
  placeholder: boolean;
};

export function credibilityItems(): DisplayValue[] {
  return [
    {
      label: nonprofitWork.label,
      text: nonprofitWork.stat,
      placeholder: false,
    },
    {
      label: "Designations",
      ...display(credentials.designations, "[Professional designations]"),
    },
    {
      label: "Years",
      ...display(credentials.years, "[Years calling auctions]"),
    },
    {
      label: "Service area",
      ...display(contact.serviceArea, contactPlaceholders.serviceArea),
    },
  ];
}

export const auctionCategories = [
  {
    title: "Estates & personal property",
    text: "Household goods, collections, and the contents of a home, offered in a published order of sale.",
  },
  {
    title: "Farm & equipment",
    text: "Machinery, tools, and ranch property described so bidders know the lot before they bid.",
  },
  {
    title: "Business dispersals",
    text: "Inventory, fixtures, and equipment when a business closes, moves, or reduces stock.",
  },
  {
    title: "Specialty sales",
    text: "Single-owner collections and benefit auctions arranged with the seller in advance.",
  },
] as const;

export const services = [
  {
    title: "The call",
    text: "Live bid calling for an on-site sale. Increments stay intelligible, terms are posted before the first lot, and the winning bid is stated clearly.",
  },
  {
    title: "Estates and personal property",
    text: "Household contents and personal collections grouped into lots a bidder can follow from the sale bill to the table.",
  },
  {
    title: "Equipment",
    text: "Farm, shop, and commercial equipment sold with the condition notes the seller is prepared to stand behind.",
  },
  {
    title: "Business and inventory",
    text: "Closing stock, fixtures, and surplus offered in one sale or a short series, with a lot order set before the date.",
  },
  {
    title: "Benefit and charity auctions",
    text: nonprofitWork.sentence,
  },
  {
    title: "Sale preparation",
    text: "Grouping, sequence, and a sale bill that states what is offered. How the sale is advertised is agreed with the seller before a date is announced.",
  },
] as const;

export const approach = [
  {
    title: "Look at the property",
    text: "A sale starts with what is actually there. Lots are grouped so a bidder can tell one item from the next.",
  },
  {
    title: "Publish the terms",
    text: "Payment, removal, and any buyer's premium are written down before the first bid. Nothing important is left to the chant.",
  },
  {
    title: "Call a clear sale",
    text: "The pace serves the room. Increments are intelligible, and the winning bid is stated so the clerk and the bidder hear the same number.",
  },
] as const;

/** Biography and credentials still to be confirmed. Rendered on the About page. */
export const credentialTodos = [
  { label: "Full name and role", placeholder: "[Full name and role]" },
  { label: "Biography", placeholder: "[Short biography]" },
  { label: "Professional designations", placeholder: "[Professional designations]" },
  { label: "Years calling auctions", placeholder: "[Years calling auctions]" },
  { label: "Markets served", placeholder: "[Markets served]" },
] as const;

export type Auction = {
  id: string;
  title: string;
  /** Calendar date, YYYY-MM-DD. */
  date: string;
  time?: string;
  location: string;
  summary: string;
};

/**
 * Upcoming sales. An empty list renders the "None scheduled" state.
 *
 * Example:
 * {
 *   id: "spring-estate-2026",
 *   title: "Spring estate auction",
 *   date: "2026-04-18",
 *   time: "10:00 a.m.",
 *   location: "[Sale location]",
 *   summary: "Household goods and shop tools.",
 * }
 */
export const upcomingAuctions: Auction[] = [];

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/auctions", label: "Auctions" },
  { href: "/contact", label: "Contact" },
] as const;

export function isCurrentPath(pathname: string, href: string): boolean {
  const current =
    pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  return current === href;
}

export function upcomingFrom(auctions: readonly Auction[], now = new Date()): Auction[] {
  const today = now.toISOString().slice(0, 10);
  return auctions
    .filter((auction) => auction.date >= today)
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title));
}

export function formatAuctionDate(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return isoDate;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function display(value: string | null, placeholder: string): { text: string; placeholder: boolean } {
  const text = value?.trim();
  if (text) return { text, placeholder: false };
  return { text: placeholder, placeholder: true };
}

function vcardEscape(value: string): string {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll("\r\n", "\\n")
    .replaceAll("\n", "\\n")
    .replaceAll(",", "\\,")
    .replaceAll(";", "\\;");
}

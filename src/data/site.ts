/**
 * Site copy and contact details.
 *
 * Leave a contact field null until Luke confirms it. Null fields render as
 * bracketed placeholders. Do not invent a phone number, inbox, street address,
 * or professional designation.
 *
 * Set `contact.email` to the real inbox and the "Email us" control becomes a
 * mailto link.
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
  /** TODO: public name to print on the card. */
  contactName: null as string | null,
  /** TODO: business phone. */
  phone: null as string | null,
  /** TODO: business inbox. */
  email: null as string | null,
  /** TODO: counties or region served. */
  serviceArea: null as string | null,
  /** TODO: mailing or office address. Use line breaks for a multi-line address. */
  address: null as string | null,
};

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
  const phone = display(contact.phone, contactPlaceholders.phone);
  const email = display(contact.email, contactPlaceholders.email);
  const serviceArea = display(contact.serviceArea, contactPlaceholders.serviceArea);
  const address = display(contact.address, contactPlaceholders.address);

  return [
    { id: "name", label: "Name", ...name },
    {
      id: "phone",
      label: "Phone",
      ...phone,
      href: phone.placeholder ? undefined : phoneHref(phone.text),
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

export function emailMailto(): string | null {
  const email = contact.email?.trim();
  return email ? `mailto:${email}` : null;
}

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

function phoneHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  return `tel:${digits}`;
}

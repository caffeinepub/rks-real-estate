/**
 * Format a price in INR paise/rupees to a human-readable format.
 * Prices are stored as full INR values (not paise).
 */
export function formatINR(price: bigint): string {
  const n = Number(price);
  if (n >= 10_000_000) {
    const crore = n / 10_000_000;
    return `₹${crore % 1 === 0 ? crore.toFixed(0) : crore.toFixed(2)} Cr`;
  }
  if (n >= 100_000) {
    const lakh = n / 100_000;
    return `₹${lakh % 1 === 0 ? lakh.toFixed(0) : lakh.toFixed(2)} L`;
  }
  return `₹${n.toLocaleString("en-IN")}`;
}

export function formatArea(area: bigint): string {
  return `${Number(area).toLocaleString("en-IN")} sqft`;
}

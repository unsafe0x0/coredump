export function generateRandomUsername(name?: string): string {
	const base = (name || "dev").toLowerCase().trim();
	const clean = base.replace(/[^a-z0-9]/g, "").slice(0, 12) || "dev";
	const suffix = Math.random().toString(36).slice(2, 8);
	const prefix = /^[a-z]/.test(clean) ? "" : "u";
	return `${prefix}${clean}_${suffix}`;
}

export default generateRandomUsername;

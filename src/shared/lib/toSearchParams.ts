export function toSearchParams(
	obj: Record<string, unknown>,
): Record<string, string | number> {
	return Object.fromEntries(
		Object.entries(obj)
			.filter(([, v]) => v !== undefined && v !== null && v !== '')
			.map(([k, v]) => [k, v as string | number]),
	)
}

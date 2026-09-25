// Thin wrapper over the Express API in /server. Vite proxies /api in development.
const BASE = import.meta.env.VITE_API_URL ?? "";

export async function submitLoanApplication(data: Record<string, string>): Promise<{ ok: true; id: string }> {
  const res = await fetch(`${BASE}/api/loan-application`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((body as { error?: string }).error || "Request failed");
  return body as { ok: true; id: string };
}

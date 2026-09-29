export function statusColor(status: string): string {
  if (status === "online") return " bg-online";
  if (status === "idle") return " bg-idle";
  if (status === "dnd") return " bg-dnd";
  if (status === "offline") return " bg-offline";
  return " bg-online";
}

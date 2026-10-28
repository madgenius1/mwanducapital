// Replace the placeholders with real names, roles and (optionally) a short bio, link and photo.
// Photos go in /public (e.g. photo: "/team/name.jpg"). No stock headshots, no invented bios.
// Rendered only when SHOW_TEAM=true.
export type Member = { name: string; role: string; bio?: string; link?: string; photo?: string; placeholder?: boolean }
export const team: Member[] = [
  { name: "Name to be supplied", role: "Role to be supplied", placeholder: true },
  { name: "Name to be supplied", role: "Role to be supplied", placeholder: true },
  { name: "Name to be supplied", role: "Role to be supplied", placeholder: true },
]

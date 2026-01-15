export const ADMIN_EMAILS = ["certifiedmail2837349@gmail.com"]

export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false
  return ADMIN_EMAILS.includes(email.toLowerCase())
}

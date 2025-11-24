export function isAllowedDevice(): boolean {
  // Allow everything that has enough usable width
  if (window.innerWidth >= 450) return true;

  // Block only extremely small screens
  return false;
}

export function isSelected(pathname: string, href: string) {
  return new RegExp(href).test(pathname) ? 'selected' : 'default';
}

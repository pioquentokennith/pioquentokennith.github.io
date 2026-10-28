export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
export const scrollBehavior = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

export async function copyText(value) {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(value);
  } catch (error) {
    const previousFocus = document.activeElement;
    const input = document.createElement('textarea');
    input.value = value;
    input.readOnly = true;
    input.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(input);
    input.select();
    try {
      if (!document.execCommand('copy')) throw error;
    } finally {
      input.remove();
      previousFocus?.focus({ preventScroll: true });
    }
  }
}

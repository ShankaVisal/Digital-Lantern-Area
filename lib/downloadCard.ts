export async function downloadElementAsImage(element: HTMLElement, filename: string) {
  const { default: html2canvas } = await import('html2canvas');
  const canvas = await html2canvas(element, {
    backgroundColor: '#070816',
    scale: 2,
    useCORS: true,
    removeContainer: true,
    logging: false
  });

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) {
    throw new Error('Failed to generate the lantern card image.');
  }

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
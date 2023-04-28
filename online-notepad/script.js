// Initialize Quill editor
const quill = new Quill('#editor', {
  modules: { toolbar: '#toolbar' },
  theme: 'snow',
  placeholder: '여기에 메모를 작성하세요...',
});

// Download as jpg
document
  .getElementById('downloadJpgBtn')
  .addEventListener('click', function () {
    const lineHeight = 25;
    const maxLineWidth = 400;
    const extraHeight = 20;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = maxLineWidth;
    context.font = '16px Arial';

    const deltas = quill.getContents().ops;
    let styledTexts = [];

    deltas.forEach((delta) => {
      if (delta.insert) {
        const text = delta.insert;
        const attributes = delta.attributes || {};
        styledTexts.push({ text, attributes });
      }
    });

    let lines = [];
    styledTexts.forEach((styledText) => {
      const { text, attributes } = styledText;
      const wrappedLines = wrapText(context, text, maxLineWidth);
      lines = lines.concat(wrappedLines.map((line) => ({ line, attributes })));
    });

    canvas.height = lines.length * lineHeight + extraHeight;

    const backgroundImage = new Image();
    backgroundImage.src = 'craft-paper.jpg'; // Ensure the correct path to the image
    backgroundImage.onload = function () {
      context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

      for (let i = 0; i < lines.length; i++) {
        const { line, attributes } = lines[i];
        context.font = getFontStyle(attributes);
        context.fillStyle = attributes.color || '#333';
        context.fillText(line, 10, 30 + i * lineHeight);
      }

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/jpeg');
      link.download = 'memo.jpg';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  });

function getFontStyle(attributes) {
  const bold = attributes.bold ? 'bold ' : '';
  const italic = attributes.italic ? 'italic ' : '';
  const underline = attributes.underline ? 'underline ' : '';
  const strike = attributes.strike ? 'strike ' : '';
  return `${bold}${italic}${underline}${strike}16px Arial`;
}

function wrapText(context, text, maxWidth) {
  const lines = [];
  let line = '';

  for (let n = 0; n < text.length; n++) {
    const testLine = line + text[n];
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth - 10 && n > 0) {
      // Subtract 10 from maxWidth
      lines.push(line);
      line = text[n];
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  return lines;
}

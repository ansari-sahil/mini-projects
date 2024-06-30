function formatText(command) {
    const editor = document.getElementById('editor');
    const selection = window.getSelection();
  
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      const span = document.createElement('span');
  
      switch (command) {
        case 'bold':
          span.style.fontWeight = 'bold';
          break;
        case 'italic':
          span.style.fontStyle = 'italic';
          break;
        case 'underline':
          span.style.textDecoration = 'underline';
          break;
      }
  
      span.textContent = selectedText;
      range.deleteContents();
      range.insertNode(span);
    }
  }
  
  function alignText(align) {
    const editor = document.getElementById('editor');
    editor.style.textAlign = align;
  }
  
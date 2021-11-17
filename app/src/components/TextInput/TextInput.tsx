import { useState, KeyboardEvent, ClipboardEvent, CSSProperties } from 'react';
import './TextInput.scss';

/*
Similar to <input type="text" /> element except 
the text field expands based on the content provided inside it;
multiline content is not allowed
*/

interface Props {
  placeholder?: string,
  className?: string,
  isEditable?: boolean,
}

function TextInput(props: Props) {
  const [text, setText] = useState('');
  const { isEditable = true } = props
  const styles = {
    "--placeholder": `'${props.placeholder}'`,
  } as CSSProperties;

  // ignore new lines
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") e.preventDefault();
    else setText(e.currentTarget.textContent || '');
  };

  // prevents pasting HTML content; pastes only text
  const handlePaste = (e: ClipboardEvent) => {
    const text = e.clipboardData.getData('text/plain');
    const selection = window.getSelection();

    if (!selection?.rangeCount) return;
    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(text));
    e.preventDefault();
  };

  return (
    <span className="TextInput__wrapper">
      <span
        className={`TextInput ${props.className || ''}`} 
        style={styles}
        onKeyPress={handleKeyPress} 
        onPaste={handlePaste}
        contentEditable={isEditable}
      ></span>
    </span>
  );
}

export default TextInput;

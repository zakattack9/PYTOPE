import { useRef, KeyboardEvent, ClipboardEvent, CSSProperties, FormEvent } from 'react';
import './TextInput.scss';

/*
Similar to <input type="text" /> element except 
the text field expands based on the content provided inside it;
multiline content is not allowed
*/

interface Props {
  defaultValue: string,
  onChange: (value: string) => void,
  placeholder?: string,
  className?: string,
  isEditable?: boolean,
}

function TextInput(props: Props) {
  // useRef instead of useState to prevent re-renders onInput; caret position is lost on render for contenteditable
  const defaultValue = useRef(props.defaultValue || '');
  const { isEditable = true } = props
  const styles = {
    "--placeholder": `'${props.placeholder}'`,
  } as CSSProperties;

  // ignore new lines
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") e.preventDefault();
  };
  
  const handleInput = (e: FormEvent) => {
    props.onChange(e.currentTarget.textContent || '');
  }

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
        className={`TextInput${!isEditable ? '--disabled' : ''} ${props.className || ''}`} 
        style={styles}
        onKeyPress={handleKeyPress} 
        onInput={handleInput}
        onPaste={handlePaste}
        contentEditable={isEditable}
        dangerouslySetInnerHTML={{ __html: defaultValue.current }} // potential XSS (need to sanitize input)
      ></span>
    </span>
  );
}

export default TextInput;

import { useState, FormEvent } from 'react';
import './TextareaInput.scss';

interface Props {
  className?: string;
  onChange: (input: string) => void,
}

function TextareaInput(props: Props) {
  const [value, setValue] = useState('');

  const handleChange = (e: FormEvent<HTMLTextAreaElement>) => {
    const text = e.currentTarget.value;
    setValue(text);
    props.onChange(text);
  }

  return (
    <textarea 
      className={`TextareaInput ${props.className || ''}`} 
      onChange={handleChange}
      value={value}
    >
    </textarea>
  );
}

export default TextareaInput;

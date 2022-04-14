import { useState, FormEvent } from 'react';
import './Input.scss';

interface Props {
  className?: string,
  placeholder?: string,
  defaultValue?: string,
  onChange: (input: string) => void,
}

function Input(props: Props) {
  const [value, setValue] = useState(props.defaultValue || '');
  
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    setValue(input);
    props.onChange(input);
  }

  return (
    <input 
      className={`Input ${props.className || ''}`}
      type="text"
      placeholder={props.placeholder || ''}
      onChange={handleChange}
      value={value}
    />
  );
}

export default Input;

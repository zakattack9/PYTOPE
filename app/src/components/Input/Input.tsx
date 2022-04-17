import { useState, FormEvent } from 'react';
import './Input.scss';

interface Props {
  className?: string,
  placeholder?: string,
  defaultValue?: string,
  hasError?: boolean,
  onChange: (input: string) => void,
}

function Input(props: Props) {
  const { defaultValue, hasError, placeholder } = props
  const [value, setValue] = useState(defaultValue || '');
  const className = `Input${hasError ? '--error' : ''} ${props.className || ''}`;
  
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    setValue(input);
    props.onChange(input);
  }

  return (
    <input 
      className={className}
      type="text"
      placeholder={placeholder || ''}
      onChange={handleChange}
      value={value}
    />
  );
}

export default Input;

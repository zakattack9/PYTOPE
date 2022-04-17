import { useState, FormEvent } from 'react';
import './TitleInput.scss';

interface Props {
  placeholder: string,
  className?: string,
  readOnly?: boolean, // makes input readonly; sets value to placeholder
  hasError?: boolean,
  onChange: (input: string) => void,
}

function TitleInput (props: Props) {
  const DEFAULT_VALUE = props.readOnly ? props.placeholder : '';
  const className = `TitleInput${props.hasError ? '--error' : ''} ${props.className || ''}`;
  const [value, setValue] = useState(DEFAULT_VALUE);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const title = e.currentTarget.value;
    setValue(title);
    props.onChange(title);
  }

  return (
    <input 
      className={className} 
      type="text" 
      placeholder={props.placeholder}
      onChange={handleChange}
      value={value}
      readOnly={props.readOnly}
    />
  );
}

export default TitleInput;

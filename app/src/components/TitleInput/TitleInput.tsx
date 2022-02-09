import { useState, FormEvent } from 'react';
import './TitleInput.scss';

interface Props {
  placeholder: string,
  className?: string,
  onChange: (input: string) => void,
}

function TitleInput (props: Props) {
  const [value, setValue] = useState('');

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const title = e.currentTarget.value;
    setValue(title);
    props.onChange(title);
  }

  return (
    <input 
      className={`TitleInput ${props.className || ''}`} 
      type="text" 
      placeholder={props.placeholder}
      onChange={handleChange}
      value={value}
    />
  );
}

export default TitleInput;

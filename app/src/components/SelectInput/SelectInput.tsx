import { useState, useEffect, ChangeEvent } from 'react';
import './SelectInput.scss';

interface Props {
  options: string[], 
  className?: string,
  hasError?: boolean,
  value?: string,
  onChange: (option: string) => void;
}

function SelectInput(props: Props) {
  const { options, hasError } = props;
  const [value, setValue] = useState(options[0] || '');
  const isDisabled = !options.length;
  let modifier = '';
  if (isDisabled && hasError) modifier = '--disabledError';
  else if (isDisabled) modifier = '--disabled';
  else if (hasError) modifier = '--error';
  const className = `SelectInput${modifier} ${props.className || ''}`;
  
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    setValue(option); 
    props.onChange(option);
  }

  useEffect(() => {
    props.onChange(value); // sends parent component initial value on mount
  }, []);

  useEffect(() => {
    if (props.value) setValue(props.value);
  }, [props.value]);

  const Options = options.length > 0 ? options.map(option => (
    <option value={option} key={option}>{option}</option>
  )) : (
    <option value='default' key='default'>No options available</option>
  );

  return (
    <div className={className}>
      <select onChange={handleChange} value={value} disabled={isDisabled}>
        {Options}
      </select>
    </div>
  );
}

export default SelectInput;

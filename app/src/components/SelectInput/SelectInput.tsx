import { useState, ChangeEvent } from 'react';
import './SelectInput.scss';

interface Props {
  options: string[], 
  className?: string,
  onChange: (option: string) => void;
}

function SelectInput(props: Props) {
  const { options } = props;
  const [value, setValue] = useState(options[0] || '');
  const isDisabled = !options.length;
  console.log(isDisabled);
  const className = `SelectInput${isDisabled ? '--disabled' : ''} ${props.className || ''}`;
  
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    setValue(option); 
    props.onChange(option);
  }

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

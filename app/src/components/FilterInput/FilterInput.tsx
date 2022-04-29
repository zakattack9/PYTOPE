import { useState, useEffect, FormEvent, MouseEvent } from 'react';
import { SearchIcon, CancelIcon } from '../../utils/svg';
import './FilterInput.scss';

interface Props {
  onChange: (input: string) => void,
  className?: string,
}

function FilterInput(props: Props) {
  const [value, setValue] = useState('');
  const [isEmpty, setIsEmpty] = useState(true);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const filter = e.currentTarget.value;
    setValue(filter);
    props.onChange(filter);
  }

  const handleCancel = (e: MouseEvent<HTMLSpanElement>) => {
    setValue('');
    props.onChange('');
  }

  useEffect(() => {
    if (value === '') setIsEmpty(true);
    else setIsEmpty(false);
  }, [value]);

  const hideCancelIcon = isEmpty ? '--hide' : '';

  return (
    <div className={`FilterInput ${props.className || ''}`}>
      <SearchIcon className="FilterInput__searchIcon" />
      <input 
        className="FilterInput__textInput" 
        type="text" 
        placeholder="Filter" 
        onChange={handleChange} 
        value={value}
      />
      <span className="FilterInput__cancelIconWrapper" onClick={handleCancel}>
        <CancelIcon className={`FilterInput__cancelIcon${hideCancelIcon}`} />
      </span>
    </div>
  );
}

export default FilterInput;

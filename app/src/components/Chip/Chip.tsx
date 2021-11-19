import { useState, MouseEvent } from 'react';
import { ChipType } from '../../utils/enums';
import TextInput from '../TextInput/TextInput';
import { getValuePath } from '../../utils/package-mapper';
import './Chip.scss';

export interface Props {
  name: string,
  className?: string,
  placeholder?: string,
  path?: string,
  type?: ChipType,
  isEditable?: boolean,
  isSelected?: boolean,
  onClick?: (path: string) => void,
}

// uses localStorage to store chip values
function Chip(props: Props) {
  const { isEditable = true } = props;
  const VALUE_PATH = getValuePath(props.path);
  const defaultValue = isEditable ? localStorage.getItem(VALUE_PATH) || '' : '';
  const [value, setValue] = useState(defaultValue);
  // default ARG types with no placeholder (flag) to regular chip
  const hasModifier = props.type !== ChipType.ARG || props.placeholder; 
  const selectedClassName = props.isSelected ? 'SelectedChip' : '';
  const className = `Chip${props.type && hasModifier ? `--${props.type}` : ''} ${props.className || ''} ${selectedClassName}`;

  const onClick = (e: MouseEvent) => {
    if (props.onClick) {
      props.onClick(props.path || '');
      if (props.isSelected) localStorage.removeItem(VALUE_PATH);
    }
  }

  const handleChange = (value: string) => {
    setValue(value);
    if (VALUE_PATH) localStorage.setItem(VALUE_PATH, value);
  }

  let chipContents;
  if (props.type === ChipType.ARG && props.placeholder) {
    chipContents = (
      <>
        {props.name}
        <TextInput 
          className="Chip__argument" 
          placeholder={props.placeholder} 
          isEditable={isEditable} 
          defaultValue={value} 
          onChange={handleChange} 
        />
      </>
    );
  } else if (props.type === ChipType.VALUE) {
    chipContents = (
      <>
        <TextInput 
          className="Chip__value" 
          placeholder={props.placeholder} 
          isEditable={isEditable} 
          defaultValue={value} 
          onChange={handleChange} 
        />
      </>
    );
  } else {
    chipContents = props.name;
  }

  return (
    <div className={className} onClick={onClick}>
      {chipContents}
    </div>
  );
}

export default Chip;

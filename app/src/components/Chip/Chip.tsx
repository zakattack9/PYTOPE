import { MouseEvent } from 'react';
import { ChipType } from '../../utils/enums';
import TextInput from '../TextInput/TextInput';
import './Chip.scss';

export interface Props {
  name: string,
  className?: string,
  placeholder?: string,
  path?: string,
  type?: ChipType,
  isEditable?: boolean,
  isSelected?: boolean,
  handleClick?: (name: string, path: string) => void,
}

function Chip(props: Props) {
  const { isEditable = true } = props;
  const selectedClassName = props.isSelected ? 'SelectedChip' : '';
  const className = `Chip${props.type ? `--${props.type}` : ''} ${props.className || ''} ${selectedClassName}`;

  const handleClick = (e: MouseEvent) => {
    if (props.handleClick) {
      const name = props.name;
      const path = props.path || '';
      props.handleClick(name, path);
    }
  }

  let chipContents;
  if (props.type === ChipType.ARG) {
    chipContents = (
      <>
        {props.name}
        <TextInput className="Chip__argument" placeholder={props.placeholder} isEditable={isEditable} />
      </>
    );
  } else if (props.type === ChipType.VALUE) {
    chipContents = (
      <>
        <TextInput className="Chip__value" placeholder={props.placeholder} isEditable={isEditable} />
      </>
    );
  } else {
    chipContents = props.name;
  }

  return (
    <div className={className} onClick={handleClick}>
      {chipContents}
    </div>
  );
}

export default Chip;

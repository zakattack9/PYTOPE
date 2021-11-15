import { ChipType } from '../../utils/enums';
import TextInput from '../TextInput/TextInput';
import './Chip.scss';

interface Props {
  name: string,
  type?: ChipType,
  className?: string,
  placeholder?: string,
  isEditable?: boolean,
}

function Chip(props: Props) {
  const { isEditable = true } = props;
  const className = `Chip${props.type ? `--${props.type}` : ''} ${props.className || ''}`;

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
    <div className={className}>
      {chipContents}
    </div>
  );
}

export default Chip;

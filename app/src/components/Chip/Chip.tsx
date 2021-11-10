import { ChipType } from '../../utils/enums';
import TextInput from '../TextInput/TextInput';
import './Chip.scss';

interface Props {
  name: string,
  type?: ChipType,
  className?: string,
  placeholder?: string,
}

function Chip(props: Props) {
  const className = `Chip${props.type ? `--${props.type}` : ''} ${props.className || ''}`;

  let chipContents;
  if (props.type === ChipType.ARG) {
    chipContents = (
      <>
        {props.name}
        <TextInput className="Chip__argument" placeholder={props.placeholder} />
      </>
    );
  } else if (props.type === ChipType.VALUE) {
    chipContents = (
      <>
        <TextInput className="Chip__value" placeholder={props.placeholder} />
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

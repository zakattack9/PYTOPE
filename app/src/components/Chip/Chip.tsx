import { ChipType } from '../../utils/enums';
import './Chip.scss';

interface Props {
  name: string,
  type?: ChipType,
  className?: string,
  placeholder?: string,
}

function Chip(props: Props) {
  const className = `Chip${props.type ? `--${props.type}` : ''} ${props.className || ''}`;

  // const chipValue = props.type === ChipType.ARG ? (
    
  // ) : null;

  
  let chipContents;
  if (props.type === ChipType.ARG) {
    chipContents = (
      <>
        {props.name}
        <input className="Chip__argument" type="text" placeholder={props.placeholder} />
      </>
    );
  } else if (props.type === ChipType.VALUE) {
    chipContents = (
      <>
        <input className="Chip__value" type="text" placeholder={props.placeholder} />
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

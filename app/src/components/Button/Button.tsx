import { FormEvent } from 'react';
import './Button.scss';

interface Props {
  name: string,
  className?: string,
  onClick: (e: FormEvent) => void,
}

function Button(props: Props) {
  return (
    <div className={`Button ${props.className || ''}`} onClick={props.onClick}>
      {props.name}
    </div>
  );
}

export default Button;

import { FormEvent } from 'react';
import './Button.scss';

interface Props {
  name: string,
  className?: string,
  invert?: boolean,
  onClick: (e: FormEvent) => void,
}

function Button(props: Props) {
  const { invert } = props;
  const className = `Button${invert ? '--invert' : ''} ${props.className || ''}`;

  return (
    <div className={className} onClick={props.onClick}>
      {props.name}
    </div>
  );
}

export default Button;

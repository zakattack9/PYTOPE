import { FormEvent } from 'react';
import './Button.scss';

interface Props {
  name: string,
  className?: string,
  inverse?: boolean,
  onClick: (e: FormEvent) => void,
}

function Button(props: Props) {
  const { inverse } = props;
  const className = `Button${inverse ? '--inverse' : ''} ${props.className || ''}`;

  return (
    <div className={className} onClick={props.onClick}>
      {props.name}
    </div>
  );
}

export default Button;

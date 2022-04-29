import { FormEvent } from 'react';
import Button from '../Button/Button';
import './AddButton.scss';

interface Props {
  className?: string,
  onClick: (e: FormEvent) => void,
}

function AddButton(props: Props) {
  return (
    <Button 
      className={`AddButton ${props.className || ''}`} 
      name="+" 
      onClick={props.onClick} 
      invert
    />
  )
}

export default AddButton;

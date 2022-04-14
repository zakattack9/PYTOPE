import { MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { CancelIcon } from '../../utils/svg';
import './BackButton.scss';

interface Props {
  text?: string,
  className?: string,
}

function BackButton (props: Props) {
  const history = useHistory();
  const BackButtonText = props.text || 'Back'

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    history.goBack();
  }

  return (
    <div className={`BackButton ${props.className || ''}`} onClick={handleClick}>
      <CancelIcon className='BackButton__backIcon' />
      {BackButtonText}
    </div>
  );
}

export default BackButton;

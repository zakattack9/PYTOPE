import { useAppSelector, useAppDispatch } from '../../hooks/react-redux';
import { closeOverlay } from '../../slices/overlaySlice';
import { CancelIcon } from '../../utils/svg';
import './Overlay.scss';

interface Props {

}

function Overlay(props: Props) {
  const dispatch = useAppDispatch();
  const overlayState = useAppSelector(state => state.overlay);
  const { isOpen } = overlayState;
  const className = `Overlay${!isOpen ? '--hidden' : ''}`;

  return (
    <div className={className}>
      <div className="Overlay__cancel" onClick={() => dispatch(closeOverlay())}>
        <CancelIcon className='Overlay__cancelIcon' />
        Cancel
      </div>
    </div>
  );
}

export default Overlay;

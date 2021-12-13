import { openOverlay } from '../../slices/overlaySlice';
import { useAppDispatch } from '../../hooks/react-redux';
import './TestDesigner.scss';

function TestDesigner() {
  const dispatch = useAppDispatch();

  return (
    <div className='TestDesigner'>
      <button onClick={() => dispatch(openOverlay())}>OPEN OVERLAY</button>
    </div>
  );
}

export default TestDesigner;

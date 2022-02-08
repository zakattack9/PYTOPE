import { openOverlay } from '../../slices/overlaySlice';
import { useAppDispatch } from '../../hooks/react-redux';
import { Link } from 'react-router-dom';
import './TestRunner.scss';

function TestRunner() {
  const dispatch = useAppDispatch();

  return (
    <div className='TestRunner'>
      <button onClick={() => dispatch(openOverlay())}>OPEN OVERLAY</button>
      <Link to='/new/docker'>New DOCKER</Link>
      <Link to='/new/test'>New TEST</Link>
      <Link to='/new/command'>New COMMAND</Link>
    </div>
  );
}

export default TestRunner;

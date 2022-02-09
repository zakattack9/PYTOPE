import { openOverlay } from '../../slices/overlaySlice';
import { useAppDispatch } from '../../hooks/react-redux';
import { Link } from 'react-router-dom';
import './TestRunner.scss';

function TestRunner() {
  const dispatch = useAppDispatch();

  return (
    <div className='TestRunner'>
      <button onClick={() => dispatch(openOverlay())}>OPEN OVERLAY</button>
      <Link to='/new/docker'><button>New DOCKER</button></Link>
      <Link to='/new/test'><button>New TEST</button></Link>
      <Link to='/new/command'><button>New COMMAND</button></Link>
    </div>
  );
}

export default TestRunner;

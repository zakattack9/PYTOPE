import { Link } from 'react-router-dom';
import './TestRunner.scss';

function TestRunner() {
  return (
    <div className='TestRunner'>
      <Link to='/new/image'><button>New DOCKER</button></Link>
      <Link to='/new/test'><button>New TEST</button></Link>
      <Link to='/new/command'><button>New COMMAND</button></Link>
    </div>
  );
}

export default TestRunner;

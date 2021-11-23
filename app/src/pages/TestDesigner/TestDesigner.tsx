import ImageBlock from '../../components/ImageBlock/ImageBlock';
import './TestDesigner.scss';

function TestDesigner() {
  return (
    <div className='TestDesigner'>
      <div className='TestDesigner__ImageBlock1'>
        <ImageBlock/>
        
      </div>
      <div className='TestDesigner__ImageBlock2'>
        <ImageBlock/>
        </div>
    </div>
  );
}

export default TestDesigner;

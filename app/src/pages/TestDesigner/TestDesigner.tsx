import ImageBlock from '../../components/ImageBlock/ImageBlock';
import { useAppSelector } from '../../hooks/react-redux';
import './TestDesigner.scss';

function TestDesigner() {
  const testDesignerState = useAppSelector(state => state.testDesigner);
  const currBlocks = testDesignerState;
  console.log(testDesignerState);
  
const imageBlock =  currBlocks.currBlocks?.docker_images;
const imageBlockTest = currBlocks.currBlocks?.tests;
const dockerImageBlock = imageBlock && imageBlockTest ? (
  <ImageBlock dockerImage = {imageBlock} Tests = {imageBlockTest}/>
) : null

  return (
    <div className='TestDesigner'>
      <div className='TestDesigner__ImageBlock1'>
       {dockerImageBlock}
      </div>
    </div>
  );
}

export default TestDesigner;

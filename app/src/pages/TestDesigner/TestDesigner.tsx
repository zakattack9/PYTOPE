import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import ImageBlock from '../../components/ImageBlock/ImageBlock';
import { useAppSelector, useAppDispatch } from '../../hooks/react-redux';
import { reorderImageBlocks, reorderRunBlocks, reorderTestBlocks } from '../../slices/testDesignerSlice';
import './TestDesigner.scss';

function TestDesigner() {
  const dispatch = useAppDispatch();
  const testDesignerState = useAppSelector(state => state.testDesigner);
  const { currBlocks } = testDesignerState;

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination?.index;
    const sourceDroppableId = result.source.droppableId;
    const destinationDroppableId = result.destination.droppableId;

    if (result.type === "imageBlockItem") {
      const reorderImageFormat = {
        oldIndex: sourceIndex,
        newIndex: destinationIndex
      };
      dispatch(reorderImageBlocks(reorderImageFormat));
    }
    else if (result.type === "testBlockItem") {
      console.log(result);
      const reorderTestFormat = {
        oldDockerImageName: sourceDroppableId.split("/")[0],
        newDockerImageName: destinationDroppableId.split("/")[0],
        oldIndex: sourceIndex,
        newIndex: destinationIndex
      };
      dispatch(reorderTestBlocks(reorderTestFormat));
    }
    else if(result.type === "runBlockItem"){
      console.log(result);
      const reorderRunFormat = {
        oldTestName: sourceDroppableId.split("/")[0],
        newTestName: destinationDroppableId.split("/")[0],
        oldIndex: sourceIndex,
        newIndex: destinationIndex
      };
      dispatch(reorderRunBlocks(reorderRunFormat));
    }
  }

  const imageBlocks = currBlocks?.docker_images;
  const testDesigns = currBlocks?.test_designs;
  const dockerImageBlock = imageBlocks && testDesigns ? testDesigns.map((imageName, index) =>
    <ImageBlock
      dockerImageName={imageName}
      dockerImage={imageBlocks[imageName]}
      dockerImageIndex={index}
    />
  ) : null


  return (
    <div className='TestDesigner'>
      <DragDropContext onDragEnd={onDragEnd}>
        {dockerImageBlock}
      </DragDropContext>
    </div>
  );
}

export default TestDesigner;

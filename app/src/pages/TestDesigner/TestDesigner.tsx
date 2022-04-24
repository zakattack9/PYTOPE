import ImageBlock from '../../components/ImageBlock/ImageBlock';
import Button from '../../components/Button/Button';
import { FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useAppSelector, useAppDispatch } from '../../hooks/react-redux';
import { reorderImageBlocks, reorderRunBlocks, reorderTestBlocks } from '../../slices/testDesignerSlice';
import './TestDesigner.scss';

function TestDesigner() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const testDesignerState = useAppSelector(state => state.testDesigner);
  const { currBlocks } = testDesignerState;

  const handleNewImage = (e: FormEvent) => {
    const location = {
      pathname: '/new/image',
    }
    history.push(location);
  }

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
      const reorderTestFormat = {
        oldDockerImageName: sourceDroppableId.split("/")[0],
        newDockerImageName: destinationDroppableId.split("/")[0],
        oldIndex: sourceIndex,
        newIndex: destinationIndex
      };
      dispatch(reorderTestBlocks(reorderTestFormat));
    }
    else if(result.type === "runBlockItem"){
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
  ) : null;

  return (
    <div className="TestDesigner">
      <DragDropContext onDragEnd={onDragEnd}>
        {dockerImageBlock}
      </DragDropContext>
      <Button className="TestDesigner__newImageBtn" name="New Docker Image" onClick={handleNewImage} />
    </div>
  );
}

export default TestDesigner;

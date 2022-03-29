import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import ImageBlock from '../../components/ImageBlock/ImageBlock';
import { useAppSelector, useAppDispatch } from '../../hooks/react-redux';
import { reorderImageBlocks, reorderTestBlocks } from '../../slices/testDesignerSlice';
import './TestDesigner.scss';

function TestDesigner() {
  const dispatch = useAppDispatch();
  const testDesignerState = useAppSelector(state => state.testDesigner);
  const {currBlocks} = testDesignerState;
  console.log(testDesignerState);

  const onDragEnd = (result: DropResult) => {
    // console.log(result);
    if (!result.destination) return;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination?.index;
    const sourceDroppableId = result.source.droppableId;
    const destinationDroppableId = result.destination.droppableId;

    if (result.type === "imageBlockItem") {
        const reorderImageFormat = {
          oldIndex:sourceIndex, 
          newIndex:destinationIndex
        };
        dispatch(reorderImageBlocks(reorderImageFormat));
    }
    else if (result.type === "testBlockItem") {
        console.log(result);
        const reorderTestFormat = {
          oldDockerImageName:sourceDroppableId,
          newDockerImageName:destinationDroppableId,
          oldIndex:sourceIndex, 
          newIndex:destinationIndex
        };
        dispatch(reorderTestBlocks(reorderTestFormat));
        
        //const itemSubItemMap = imageBlockItems.reduce((acc, item) => acc[item.docker_Image_id] = item.tests, 0);
        // const imageSubItems: IImageBlockSubItems = {};
        // const itemSubItemMap = imageBlockItems.reduce(function (acc, item) {
        //     acc[item.docker_Image_id] = item.tests;
        //     return acc;
        // }, imageSubItems);
        // console.log(itemSubItemMap);
        
        // const sourceParentId = parseInt(result.source.droppableId);
        // const destParentId = parseInt(result.destination?.droppableId!);
        // console.log(sourceParentId);
        // console.log(destParentId);
        // const sourceSubItems = itemSubItemMap[sourceParentId];
        // const destSubItems = itemSubItemMap[destParentId];
        // console.log(sourceSubItems);
        // console.log(destSubItems);
        // let newItems = [...imageBlockItems];

        // if (sourceParentId === destParentId) {
        //     const items = Array.from(sourceSubItems);
        //     const [newOrder] = items.splice(sourceIndex, 1)
        //     items.splice(destinationIndex!, 0, newOrder)
        //     var reorderedSubItems = items;
        //     newItems = newItems.map(item => {
        //         if (item.docker_Image_id === sourceParentId) {
        //             item.tests = reorderedSubItems;
        //         }
        //         return item;
        //     });
        //     setImageBlockItems(newItems);
        //     // dispatch for changing the store
        // }
        // else {
        //     let newSourceSubItems = [...sourceSubItems];
        //     //let newSourceSubItemsArr = Array.from(newSourceSubItems);
        //     const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);

        //     let newDestSubItems = [...destSubItems];
        //     //let newDestSubItemsArr = Array.from(newDestSubItems);
        //     newDestSubItems.splice(destinationIndex!, 0, draggedItem);

        //     newItems = newItems.map(item => {
        //         if (item.docker_Image_id === sourceParentId) {
        //             item.tests = newSourceSubItems;
        //         }
        //         else if (item.docker_Image_id === destParentId) {
        //             item.tests = newDestSubItems;
        //         }
        //         return item;
        //     });
        //     setImageBlockItems(newItems);
        }
    }



  const imageBlocks = currBlocks?.docker_images;
  const testDesigns = currBlocks?.test_designs;
  const dockerImageBlock = imageBlocks && testDesigns ? testDesigns.map((imageName,index) => 
    <ImageBlock 
      dockerImageName = {imageName} 
      dockerImage={imageBlocks[imageName]} 
      dockerImageIndex = {index}
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

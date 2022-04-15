import TestBlock from '../TestBlock/TestBlock';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { DockerImage } from '../../utils/test-designer';
import './ImageBlock.scss';

interface Props {
  dockerImage: DockerImage,
  dockerImageName: string,
  dockerImageIndex: number,
}

function ImageBlock(props: Props) {
  const { dockerImageName, dockerImage, dockerImageIndex } = props;
  const tests = dockerImage.tests;

  const TestBlocks = tests?.length ? tests.map((testName, index) =>
    <TestBlock
      testName={testName}
      testIndex={index}
      parentImage={dockerImageName}
    />
  ) : (
    <TestBlock
      testName={'default'}
      testIndex={0}
      parentImage={dockerImageName}
      isDefault
    />
  );

  const ImageBlockDraggable = (
    <Draggable key={dockerImage.docker_image_id} draggableId={`draggable_${dockerImageName}`} index={dockerImageIndex}>
      {({draggableProps, dragHandleProps, innerRef}) => (
        <div className="ImageBlock" ref={innerRef} {...draggableProps} {...dragHandleProps}>
          {dockerImageName}
          {TestBlocks}
        </div>
      )}
    </Draggable>
  );

  return (
    <Droppable droppableId={dockerImageName} type="imageBlockItem">
      {({droppableProps, innerRef, placeholder}) => (
        <div {...droppableProps} ref={innerRef}>
          {ImageBlockDraggable}
          {placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default ImageBlock;

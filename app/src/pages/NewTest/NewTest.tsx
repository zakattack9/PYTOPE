import { FormEvent, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/react-redux';
import { addTestBlock } from '../../slices/testDesignerSlice';
import BackButton from '../../components/BackButton/BackButton';
import TitleInput from '../../components/TitleInput/TitleInput';
import SelectInput from '../../components/SelectInput/SelectInput';
import Button from '../../components/Button/Button';
import AddButton from '../../components/AddButton/AddButton';
import './NewTest.scss';

interface NewTestState {
  title: string,
  dockerImage: string,
  titleError: boolean,
  imageError: boolean,
}

interface NewTestURLParams {
  testName: string,
}

function NewTest() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { testName: testNameUrlParam } = useParams<NewTestURLParams>();
  const { currBlocks } = useAppSelector(state => state.testDesigner);
  const [state, setState] = useState<NewTestState>({
    title: '',
    dockerImage: '',
    titleError: false,
    imageError: false,
  });
  const IMAGE_OPTIONS = currBlocks ? Object.keys(currBlocks.docker_images) : [];

  const handleTitleChange = (title: string) => {
    setState({ ...state, title });
  }

  const handleImageSelect = (dockerImage: string) => {
    setState({ ...state, dockerImage });
  }

  const handleNewImage = (e: FormEvent) => {
    const location = {
      pathname: '/new/image',
    }
    history.push(location);
  }

  const handleNewBlock = (e: FormEvent) => {
    const location = {
      pathname: '/new/command',
    }
    history.push(location);
  }

  const handleSave = (e: FormEvent) => {
    const ERRORS = {
      titleError: !state.title,
      imageError: !state.dockerImage,
    }
    const hasError = Object.values(ERRORS).some(err => err);

    if (hasError) setState({ ...state, ...ERRORS });
    else {
      const newImagePayload = {
        imageName: state.dockerImage,
        testName: state.title,
      }
      dispatch(addTestBlock(newImagePayload));
      history.goBack();
    }
  }

  const handleDelete = (e: FormEvent) => {

  }

  const Blocks = testNameUrlParam ? (
    <>
      <div className="NewTest__blocksLabel">Test Blocks</div>
      <div className="NewTest__blocks">

      </div>
      <AddButton className="NewTest__newBlockBtn" onClick={handleNewBlock} />
    </>
  ) : null;

  return (
    <div className={`NewTest${!testNameUrlParam ? '--new' : ''}`}>
      <BackButton className="NewTest__cancel" text="Cancel" />
      <TitleInput className="NewTest__titleInput" placeholder="Enter Test Name" onChange={handleTitleChange} hasError={state.titleError} />

      <div className="NewTest__imageLabel">Docker Image</div>
      <div className="NewTest__imageWrapper">
        <SelectInput className="NewTest__image" options={IMAGE_OPTIONS} onChange={handleImageSelect} hasError={state.imageError} />
        <Button className="NewTest__newImageBtn" name="New" onClick={handleNewImage} />
      </div>

      {Blocks}

      <div className="NewTest__btnWrapper">
        <Button className="NewTest__saveBtn" name="Save" onClick={handleSave} />
        <Button className="NewTest__deleteBtn" name="Delete" onClick={handleDelete} invert />
      </div>
    </div>
  );
}

export default NewTest;

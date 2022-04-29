import { useState, FormEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/react-redux';
import { addImageBlock } from '../../slices/testDesignerSlice';
import BackButton from '../../components/BackButton/BackButton';
import TitleInput from '../../components/TitleInput/TitleInput';
import TextareaInput from '../../components/TextareaInput/TextareaInput';
import SelectInput from '../../components/SelectInput/SelectInput';
import TestDetails from '../../components/TestDetails/TestDetails';
import UploadButton from '../../components/UploadButton/UploadButton';
import AddButton from '../../components/AddButton/AddButton';
import Button from '../../components/Button/Button';
import './NewImage.scss';

interface NewImageState {
  title: string,
  filename: string,
  description: string,
  titleError: boolean,
  filenameError: boolean,
}

interface NewImageURLParams {
  imageName: string,
}

function NewImage() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { imageName: imgNameUrlParam } = useParams<NewImageURLParams>();
  const [state, setState] = useState<NewImageState>({
    title: '',
    filename: '',
    description: '',
    titleError: false,
    filenameError: false,
  });

  const OPTIONS = ['test', 'test1', 'test2', 'test3'];

  const handleTitleChange = (title: string) => {
    setState({ ...state, title });
  }

  const handleFileSelect = (filename: string) => {
    setState({ ...state, filename });
  }

  const handleFileUpload = (file: File) => {

  }

  const handleDescChange = (description: string) => {
    setState({ ...state, description });
  }

  const handleNewTest = (e: FormEvent) => {
    const location = {
      pathname: '/new/test',
    }
    history.push(location);
  }

  const handleSave = (e: FormEvent) => {
    const ERRORS = {
      titleError: !state.title,
      filenameError: !state.filename,
    }
    const hasError = Object.values(ERRORS).some(err => err);

    if (hasError) setState({ ...state, ...ERRORS });
    else {
      const newImagePayload = {
        imageName: state.title,
        description: state.description,
      }
      dispatch(addImageBlock(newImagePayload));
      history.goBack();
    }
  }

  const handleDelete = (e: FormEvent) => {

  }

  const Tests = imgNameUrlParam ? (
    <>
      <div className="NewImage__testsLabel">Tests</div>
      <div className="NewImage__tests">
        <TestDetails name="Test git submodule" numBlocks={3} />
        <TestDetails name="Test git push" numBlocks={5} />
        <TestDetails name="Test git submodule" numBlocks={3} />
        <TestDetails name="Test git push" numBlocks={5} />
        <TestDetails name="Test git submodule" numBlocks={3} />
        <TestDetails name="Test git push" numBlocks={5} />
        <TestDetails name="Test git submodule" numBlocks={3} />
        {/* <TestDetails name="Test git push" numBlocks={5} /> */}
        {/* <TestDetails name="Test git submodule" numBlocks={3} /> */}
        {/* <TestDetails name="Test git push" numBlocks={5} /> */}
        {/* <TestDetails name="Test git submodule" numBlocks={3} /> */}
        {/* <TestDetails name="Test git push" numBlocks={5} /> */}
      </div>
      <AddButton className="NewImage__newTestBtn" onClick={handleNewTest} />
    </>
  ) : null;

  return (
    <div className={`NewImage${!imgNameUrlParam ? '--new' : ''}`}>
      <BackButton className="NewImage__cancel" text="Cancel" />
      <TitleInput className="NewImage__titleInput" placeholder="Enter Docker Image Name" onChange={handleTitleChange} hasError={state.titleError} />

      <div className="NewImage__fileLabel">Dockerfile</div>
      <div className="NewImage__fileWrapper">
        <SelectInput className="NewImage__file" options={OPTIONS} onChange={handleFileSelect} hasError={state.filenameError} />
        <UploadButton className="NewImage__uploadBtn" onChange={handleFileUpload} />
      </div>

      <div className="NewImage__descLabel">Description</div>
      <TextareaInput className="NewImage__desc" onChange={handleDescChange} />

      {Tests}

      <div className="NewImage__btnWrapper">
        <Button className="NewImage__saveBtn" name="Save" onClick={handleSave} />
        <Button className="NewImage__deleteBtn" name="Delete" onClick={handleDelete} invert />
      </div>
    </div>
  );
}

export default NewImage;

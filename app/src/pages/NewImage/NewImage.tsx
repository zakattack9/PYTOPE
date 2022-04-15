import { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
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
}

function NewImage() {
  const history = useHistory();
  const [state, setState] = useState<NewImageState>({
    title: '',
    filename: '',
    description: '',
  });

  const OPTIONS = ['test', 'test1', 'test2', 'test3'];

  const handleTitleChange = (title: string) => {
    setState({ ...state, title });
  }

  const handleFileSelect = (filename: string) => {
    setState({ ...state, filename });
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

  }

  const handleDelete = (e: FormEvent) => {

  }

  return (
    <div className="NewImage">
      <BackButton className="NewImage__cancel" text="Cancel" />
      <TitleInput className="NewImage__titleInput" onChange={handleTitleChange} placeholder="Enter Docker Image Name" />

      <div className="NewImage__fileLabel">Dockerfile</div>
      <div className="NewImage__fileWrapper">
        <SelectInput className="NewImage__file" options={OPTIONS} onChange={handleFileSelect} />
        <UploadButton className="NewImage__uploadBtn" />
      </div>

      <div className="NewImage__descLabel">Description</div>
      <TextareaInput className="NewImage__desc" onChange={handleDescChange} />

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

      <div className="NewImage__btnWrapper">
        <Button className="NewImage__saveBtn" name="Save" onClick={handleSave} />
        <Button className="NewImage__deleteBtn" name="Delete" onClick={handleDelete} invert />
      </div>
    </div>
  );
}

export default NewImage;

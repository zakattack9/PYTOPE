import { useState, useEffect, FormEvent } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import TitleInput from '../../components/TitleInput/TitleInput';
import TextareaInput from '../../components/TextareaInput/TextareaInput';
import SelectInput from '../../components/SelectInput/SelectInput';
import Button from '../../components/Button/Button';
import './NewDocker.scss';

interface NewDockerState {
  title: string,
  filename: string,
  description: string,
}

function NewDocker() {
  const [state, setState] = useState<NewDockerState>({
    title: '',
    filename: '',
    description: '',
  });

  const handleTitleChange = (title: string) => {
    setState({ ...state, title });
  }

  const handleDescChange = (description: string) => {
    setState({ ...state, description });
  }

  const handleSave = (e: FormEvent) => {

  }

  const handleDelete = (e: FormEvent) => {

  }

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className="NewDocker">
      <BackButton className="NewDocker__cancel" text="Cancel" />
      <TitleInput className="NewDocker__titleInput" onChange={handleTitleChange} placeholder="Enter Docker Image Name" />

      <div className="NewDocker__fileLabel">File</div>
      <SelectInput className="NewDocker__file" />

      <div className="NewDocker__descLabel">Description</div>
      <TextareaInput className="NewDocker__desc" onChange={handleDescChange} />

      <div className="NewDocker__testsLabel">Tests</div>
      <div className="NewDocker__tests"></div>

      <div className="NewDocker__btnWrapper">
        <Button className="NewDocker__saveBtn" name="Save" onClick={handleSave} />
        <Button className="NewDocker__deleteBtn" name="Delete" onClick={handleDelete} inverse />
      </div>
    </div>
  );
}

export default NewDocker;

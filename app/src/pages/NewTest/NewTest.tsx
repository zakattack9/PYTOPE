import { FormEvent, useState } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import TitleInput from '../../components/TitleInput/TitleInput';
import SelectInput from '../../components/SelectInput/SelectInput';
import Button from '../../components/Button/Button';
import AddButton from '../../components/AddButton/AddButton';
import './NewTest.scss';

interface NewTestState {
  title: string,
  dockerImage: string,
}

function NewTest() {
  const [state, setState] = useState<NewTestState>({
    title: '',
    dockerImage: '',
  });

  const handleTitleChange = (title: string) => {
    setState({ ...state, title });
  }

  const handleNewImage = (e: FormEvent) => {

  }

  const handleNewBlock = (e: FormEvent) => {

  }

  const handleSave = (e: FormEvent) => {

  }

  const handleDelete = (e: FormEvent) => {

  }

  return (
    <div className="NewTest">
      <BackButton className="NewTest__cancel" text="Cancel" />
      <TitleInput className="NewTest__titleInput" onChange={handleTitleChange} placeholder="Enter Test Name" />

      <div className="NewTest__imageLabel">Docker Image</div>
      <div className="NewTest__imageWrapper">
        <SelectInput className="NewTest__image" />
        <Button className="NewTest__newImageBtn" name="New" onClick={handleNewImage} />
      </div>

      <div className="NewTest__blocksLabel">Test Blocks</div>
      <div className="NewTest__blocks">

      </div>
      <AddButton className="NewTest__newBlockBtn" onClick={handleNewBlock} />

      <div className="NewTest__btnWrapper">
        <Button className="NewDocker__saveBtn" name="Save" onClick={handleSave} />
        <Button className="NewDocker__deleteBtn" name="Delete" onClick={handleDelete} invert />
      </div>
    </div>
  );
}

export default NewTest;

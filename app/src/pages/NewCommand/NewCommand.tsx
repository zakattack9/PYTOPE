import { FormEvent, useState } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import TitleInput from '../../components/TitleInput/TitleInput';
import SelectInput from '../../components/SelectInput/SelectInput';
import Button from '../../components/Button/Button';
import AddButton from '../../components/AddButton/AddButton';
import Input from '../../components/Input/Input';
import './NewCommand.scss';

interface NewCommandState {
  command: string,
  assertion: string,
  regex?: string,
}

function NewCommand() {
  const [state, setState] = useState<NewCommandState>({
    command: '',
    assertion: '',
  });

  const handleTitleChange = (command: string) => {
    setState({ ...state, command });
  }

  return (
    <div className="NewCommand">
      <BackButton className="NewTest__cancel" text="Cancel" />
      <TitleInput className="NewTest__titleInput" onChange={handleTitleChange} placeholder="New Run Command" readOnly/>
    </div>
  );
}

export default NewCommand;

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

  const handleTitleChange = (command: string) => {} // never called since title is readonly

  const handleCommandChange = (command: string) => {
    setState({ ...state, command });
  }

  const handleRegexChange = (regex: string) => {
    setState({ ...state, regex });
  }

  const handlePackageMapper = (e: FormEvent) => {

  }

  const handleSave = (e: FormEvent) => {

  }

  const handleDelete = (e: FormEvent) => {

  }

  return (
    <div className="NewCommand">
      <BackButton className="NewCommand__cancel" text="Cancel" />
      <TitleInput className="NewCommand__titleInput" onChange={handleTitleChange} placeholder="New Run Command" readOnly/>
      
      <div className="NewCommand__commandLabel">Command</div>
      <Input className="NewCommand__command" onChange={handleCommandChange} />
      <Button className="NewCommand__pkgMapperBtn" name="Package Mapper" onClick={handlePackageMapper} />

      <div className="NewCommand__assertionLabel">Output Assertion</div>
      <SelectInput className="NewCommand__assertion" />

      <div className="NewCommand__regexLabel">Regex</div>
      <Input className="NewCommand__regex" onChange={handleRegexChange} />

      <div className="NewCommand__btnWrapper">
        <Button className="NewCommand__saveBtn" name="Save" onClick={handleSave} />
        <Button className="NewCommand__deleteBtn" name="Delete" onClick={handleDelete} invert />
      </div>
    </div>
  );
}

export default NewCommand;

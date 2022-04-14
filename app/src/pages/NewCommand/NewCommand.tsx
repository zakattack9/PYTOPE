import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';
import TitleInput from '../../components/TitleInput/TitleInput';
import SelectInput from '../../components/SelectInput/SelectInput';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import './NewCommand.scss';

interface NewCommandState {
  test: string,
  command: string,
  assertion: string,
  regex?: string,
}

function NewCommand() {
  const history = useHistory();
  const [state, setState] = useState<NewCommandState>({
    test: '',
    command: '',
    assertion: '',
  });

  const IS_REGEX = state.assertion === 'Regex';

  const TESTS: string[] = [];
  const OPTIONS = ['Ignore Output', 'Regex', 'Is Empty'];

  const handleTitleChange = (command: string) => {} // never called since title is readonly

  const handleTestSelect = (test: string) => {
    setState({ ...state, test });
  }

  const handleNewTest = (e: FormEvent) => {
    const location = {
      pathname: '/new/test',
    }
    history.push(location);
  }

  const handleCommandChange = (command: string) => {
    setState({ ...state, command });
  }

  const handleAssertionSelect = (assertion: string) => {
    setState({ ...state, assertion });
  }

  const handleRegexChange = (regex: string) => {
    setState({ ...state, regex });
  }

  const handlePackageMapper = (e: FormEvent) => {
    const location = {
      pathname: '/pytope/mapper',
    }
    history.push(location);
  }

  const handleSave = (e: FormEvent) => {

  }

  const handleDelete = (e: FormEvent) => {

  }

  const Regex = IS_REGEX ? ([
    <div className="NewCommand__regexLabel">Regex</div>,
    <Input className="NewCommand__regex" onChange={handleRegexChange} />
  ]) : null;

  return (
    <div className={`NewCommand${IS_REGEX ? '--regex' : ''}`}>
      <BackButton className="NewCommand__cancel" text="Cancel" />
      <TitleInput className="NewCommand__titleInput" onChange={handleTitleChange} placeholder="Run Command" readOnly/>
      
      <div className="NewCommand__testLabel">Test</div>
      <div className="NewCommand__testWrapper">
        <SelectInput className="NewCommand__test" options={TESTS} onChange={handleTestSelect} />
        <Button className="NewCommand__newTestBtn" name="New" onClick={handleNewTest} />
      </div>

      <div className="NewCommand__commandLabel">Command</div>
      <Input className="NewCommand__command" defaultValue={state.command} onChange={handleCommandChange} />
      <Button className="NewCommand__pkgMapperBtn" name="Package Mapper" onClick={handlePackageMapper} />

      <div className="NewCommand__assertionLabel">Output Assertion</div>
      <SelectInput className="NewCommand__assertion" options={OPTIONS} onChange={handleAssertionSelect} />

      {Regex}

      <div className="NewCommand__btnWrapper">
        <Button className="NewCommand__saveBtn" name="Save" onClick={handleSave} />
        <Button className="NewCommand__deleteBtn" name="Delete" onClick={handleDelete} invert />
      </div>
    </div>
  );
}

export default NewCommand;

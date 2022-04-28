import { FormEvent, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { CommandOutputAssertionType } from '../../utils/test-designer';
import { useAppSelector, useAppDispatch } from '../../hooks/react-redux';
import { addRunBlock } from '../../slices/testDesignerSlice';
import BackButton from '../../components/BackButton/BackButton';
import TitleInput from '../../components/TitleInput/TitleInput';
import SelectInput from '../../components/SelectInput/SelectInput';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import './NewCommand.scss';

interface NewCommandState {
  test: string,
  command: string,
  regex: string,
  testError: boolean,
  commandError: boolean,
  regexError: boolean,
}

interface AssertEnumMap {
  [key: string]: CommandOutputAssertionType,
  'Ignore Output': CommandOutputAssertionType,
  'Regex': CommandOutputAssertionType,
  'Is Empty': CommandOutputAssertionType,
}

interface LocationState {
  command: string,
}

const ASSERT_ENUM_MAP: AssertEnumMap = {
  'Ignore Output': CommandOutputAssertionType.NO_VERIFY,
  'Regex': CommandOutputAssertionType.VERIFY_REGEX,
  'Is Empty': CommandOutputAssertionType.VERIFY_EMPTY,
}

function NewCommand() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation<LocationState>();
  const defaultCommand = location.state?.command || '';
  const { currBlocks } = useAppSelector(state => state.testDesigner);
  const [state, setState] = useState<NewCommandState>({
    test: '',
    command: defaultCommand,
    regex: '',
    testError: false,
    commandError: false,
    regexError: false,
  });
  const [assertion, setAssertion] = useState(CommandOutputAssertionType.NO_VERIFY);
  const IS_REGEX = assertion === CommandOutputAssertionType.VERIFY_REGEX;
  const ASSERT_OPTIONS = Object.keys(ASSERT_ENUM_MAP);
  const TEST_OPTIONS = currBlocks ? Object.keys(currBlocks.tests) : [];

  // wipe location.state without rerendering
  if (location.state) window.history.replaceState(null, '');

  // never called since title is readonly
  const handleTitleChange = (command: string) => {} 

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
    const commandError = command === '';
    setState({ ...state, command, commandError });
  }

  const handleAssertionSelect = (assertion: string) => {
    setAssertion(ASSERT_ENUM_MAP[assertion]);
  }

  const handleRegexChange = (regex: string) => {
    const regexError = regex === '';
    setState({ ...state, regex, regexError });
  }

  const handlePackageMapper = (e: FormEvent) => {
    const location = {
      pathname: '/pytope/mapper',
    }
    history.push(location);
  }

  const handleSave = (e: FormEvent) => {
    console.log(state);
    const ERRORS =  {
      testError: !state.test,
      commandError: !state.command,
      regexError: assertion === CommandOutputAssertionType.VERIFY_REGEX && !state.regex,
    }
    const hasError = Object.values(ERRORS).some(err => err);

    if (hasError) setState({ ...state, ...ERRORS });
    else {
      const newRunPayload = {
        testName: state.test,
        command: state.command,
        assertion,
        regex: state.regex,
      }
      dispatch(addRunBlock(newRunPayload));
      history.push({ pathname: '/pytope/designer' });
    }
  }

  const handleDelete = (e: FormEvent) => {

  }

  const Regex = IS_REGEX ? ([
    <div className="NewCommand__regexLabel">Regex</div>,
    <Input className="NewCommand__regex" onChange={handleRegexChange} hasError={state.regexError} />
  ]) : null;

  return (
    <div className={`NewCommand${IS_REGEX ? '--regex' : ''}`}>
      <BackButton className="NewCommand__cancel" text="Cancel" />
      <TitleInput className="NewCommand__titleInput" onChange={handleTitleChange} placeholder="Run Command" readOnly/>
      
      <div className="NewCommand__testLabel">Test</div>
      <div className="NewCommand__testWrapper">
        <SelectInput className="NewCommand__test" options={TEST_OPTIONS} onChange={handleTestSelect} hasError={state.testError} />
        <Button className="NewCommand__newTestBtn" name="New" onClick={handleNewTest} />
      </div>

      <div className="NewCommand__commandLabel">Command</div>
      <Input className="NewCommand__command" defaultValue={state.command} onChange={handleCommandChange} hasError={state.commandError} />
      <Button className="NewCommand__pkgMapperBtn" name="Package Mapper" onClick={handlePackageMapper} />

      <div className="NewCommand__assertionLabel">Output Assertion</div>
      <SelectInput className="NewCommand__assertion" options={ASSERT_OPTIONS} onChange={handleAssertionSelect} />

      {Regex}

      <div className="NewCommand__btnWrapper">
        <Button className="NewCommand__saveBtn" name="Save" onClick={handleSave} />
        <Button className="NewCommand__deleteBtn" name="Delete" onClick={handleDelete} invert />
      </div>
    </div>
  );
}

export default NewCommand;

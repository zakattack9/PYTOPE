<<<<<<< HEAD
import UploadButton from "../../components/UploadButton/UploadButton";
import Button from "../../components/Button/Button";
import ChipSelector from "../../components/ChipSelector/ChipSelector";
import Chip from "../../components/Chip/Chip";
import { ChipSelectorType } from "../../utils/enums";
import { ChipType } from "../../utils/enums";
import { useAppSelector } from "../../hooks/react-redux";
import { getObject, getName, getCommand } from "../../utils/package-mapper";
import "./PackageMapper.scss";

function PackageMapper() {
  const pkgMapperState = useAppSelector((state) => state.packageMapper);
=======
import UploadButton from '../../components/UploadButton/UploadButton';
import Button from '../../components/Button/Button';
import ChipSelector from '../../components/ChipSelector/ChipSelector';
import Chip from '../../components/Chip/Chip';
import SelectInput from '../../components/SelectInput/SelectInput';
import { useHistory } from 'react-router-dom';
import { ChipSelectorType } from '../../utils/enums';
import { ChipType } from '../../utils/enums';
import { useAppSelector } from '../../hooks/react-redux';
import { getObject, getName, getCommand } from '../../utils/package-mapper';
import './PackageMapper.scss';

function PackageMapper() {
  const pkgMapperState = useAppSelector(state => state.packageMapper);
  const history = useHistory();

>>>>>>> 115-zak
  const { currPackage, command } = pkgMapperState;
  const nestedSubcommandPath = command?.paths.subcommands.slice(-1)[0] || null;

<<<<<<< HEAD
  const handleCreateTest = () => {
    const textCommand = getCommand(pkgMapperState);
    console.log(textCommand);
  };
=======
  const OPTIONS = ['Git'];

  const handleCreateCmd = () => {
    const command = getCommand(pkgMapperState);
    const location = {
      pathname: '/new/command',
      state: { command }
    }
    history.push(location);
  }

  const handleMappingSelect = (mapping: string) => {
    // change currPackage in packageMapperSlice.ts
  }
>>>>>>> 115-zak

  const BaseChip = command ? (
    <Chip name={command.baseKeyword} type={ChipType.BASE} />
  ) : null;

  let SelectedChips = null;
  if (currPackage) {
    const subcommandChips =
      command?.paths.subcommands.map((path) => {
        const name = getName(path);
        return <Chip name={name} key={path} />;
      }) || [];
    const argumentChips =
      command?.paths.arguments.map((path) => {
        const name = getName(path);
        const arg = getObject(currPackage, path);
        return (
          <Chip
            name={name}
            placeholder={arg.value}
            type={ChipType.ARG}
            path={path}
            key={path}
          />
        );
      }) || [];
    SelectedChips = [...subcommandChips, ...argumentChips];
  }

  let ValueChip = command ? (
    <Chip
      name="value"
      placeholder={command.value}
      path={command.baseKeyword}
      type={ChipType.VALUE}
    />
  ) : null;
  if (currPackage && nestedSubcommandPath) {
    const subcommand = getObject(currPackage, nestedSubcommandPath);
    if (command && subcommand.value)
      ValueChip = (
        <Chip
          name="value"
          placeholder={subcommand.value}
          path={command.baseKeyword}
          type={ChipType.VALUE}
        />
      );
  }

  const BaseSubcommands = currPackage?.subcommands ? (
    <ChipSelector
      title={currPackage.baseKeyword}
      type={ChipSelectorType.SUBCOMMANDS}
      chipData={currPackage.subcommands}
    />
  ) : null;

  let Subcommands = null;
  if (currPackage)
    Subcommands =
      command?.paths.subcommands.map((path) => {
        const name = getName(path);
        const { subcommands } = getObject(currPackage, path);
        if (subcommands && Object.keys(subcommands).length)
          return (
            <ChipSelector
              title={name}
              type={ChipSelectorType.SUBCOMMANDS}
              chipData={subcommands}
              key={path}
            />
          );
        else return null;
      }) || null;

  let Arguments = currPackage?.arguments ? (
    <ChipSelector
      title={currPackage.baseKeyword}
      type={ChipSelectorType.ARGUMENTS}
      chipData={currPackage.arguments}
      isSingleSelect={false}
    />
  ) : null;
  if (currPackage && nestedSubcommandPath) {
    const name = getName(nestedSubcommandPath);
    const { arguments: subArgs } = getObject(currPackage, nestedSubcommandPath);
    Arguments =
      subArgs && Object.keys(subArgs).length ? (
        <ChipSelector
          title={name}
          type={ChipSelectorType.ARGUMENTS}
          chipData={subArgs}
          isSingleSelect={false}
        />
      ) : null;
  }

  return (
    <div className="PackageMapper">
      <div className="PackageMapper__bar">
        <div className="PackageMapper__barUpperLeft">
<<<<<<< HEAD
          <div className="PackageMapper__uploadText">
            Current Package Loaded: <strong>Git</strong>
          </div>
          <UploadButton className="PackageMapper__uploadBtn" />
        </div>
        <div className="PackageMapper__barUpperRight">
          <Button
            className="PackageMapper__createBtn"
            name="Create Test"
            onClick={handleCreateTest}
          />
=======
          <div className="PackageMapper__uploadText">Package Mapping:</div>
          <SelectInput className="PackageMapper__pkgMapping" options={OPTIONS} onChange={handleMappingSelect} />
          <UploadButton className="PackageMapper__uploadBtn" />
        </div>
        <div className="PackageMapper__barUpperRight">
          <Button className="PackageMapper__createBtn" name="Create Command" onClick={handleCreateCmd} />
>>>>>>> 115-zak
        </div>
        <div className="PackageMapper__barLower">
          <div className="PackageMapper__chipWrapper">
            {BaseChip}
            {SelectedChips}
            {ValueChip}
          </div>
        </div>
      </div>

      <div className="PackageMapper__chipSelectors">
        <div className="PackageMapper__chipSelectorWrapper">
          {BaseSubcommands}
          {Subcommands}
          {Arguments}
        </div>
      </div>
    </div>
  );
}

export default PackageMapper;

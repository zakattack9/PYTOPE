import UploadButton from '../../components/UploadButton/UploadButton';
import Button from '../../components/Button/Button';
import ChipSelector from '../../components/ChipSelector/ChipSelector';
import Chip from '../../components/Chip/Chip';
import { ChipSelectorType } from '../../utils/enums';
import { ChipType } from '../../utils/enums';
import { useAppSelector } from '../../hooks/react-redux';
import { getObject, getPathName } from '../../utils/package-mapper';
import './PackageMapper.scss';

function PackageMapper() {
  const pkgMapperState = useAppSelector(state => state.packageMapper);
  const { currPackage, command } = pkgMapperState;
  const nestedSubcommandPath = command?.paths.subcommands.slice(-1)[0] || null;
  // console.log(pkgMapperState);

  const BaseChip = command ? (
    <Chip name={command.baseKeyword} type={ChipType.BASE} />
  ) : null;

  let SelectedChips = null;
  if (currPackage) {
    const subcommandChips = command?.paths.subcommands.map(path => {
      const name = getPathName(path);
      return <Chip name={name} key={path} />;
    }) || [];
    const argumentChips = command?.paths.arguments.map(path => {
      const name = getPathName(path);
      const arg = getObject(currPackage, path);
      return <Chip name={name} placeholder={arg.value} type={ChipType.ARG} key={path} />;
    }) || [];
    SelectedChips = [...subcommandChips, ...argumentChips];
  }

  let ValueChip = command ? (
    <Chip name="value" placeholder={command.value} type={ChipType.VALUE} />
  ) : null;
  if (currPackage && nestedSubcommandPath) {
    const subcommand = getObject(currPackage, nestedSubcommandPath);
    if (subcommand.value)
      ValueChip = <Chip name="value" placeholder={subcommand.value} type={ChipType.VALUE} />;
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
    Subcommands = command?.paths.subcommands.map(path => {
      const name = getPathName(path);
      const subcommand = getObject(currPackage, path);
      if (subcommand.subcommands) 
        return (
          <ChipSelector 
            title={name} 
            type={ChipSelectorType.SUBCOMMANDS} 
            chipData={subcommand.subcommands} 
            key={path}
          />);
      else 
        return null;
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
    const name = getPathName(nestedSubcommandPath);
    const subcommand = getObject(currPackage, nestedSubcommandPath);
    if (subcommand.arguments)
      Arguments = (
        <ChipSelector 
          title={name} 
          type={ChipSelectorType.ARGUMENTS} 
          chipData={subcommand.arguments} 
          isSingleSelect={false}
        />);
  }

  return (
    <div className='PackageMapper'>
      <div className="PackageMapper__bar">
        <div className="PackageMapper__barUpperLeft">
          <div className="PackageMapper__uploadText">Current Package Loaded:</div>
          <UploadButton className="PackageMapper__uploadBtn" />
        </div>
        <div className="PackageMapper__barUpperRight">
          <Button className="PackageMapper__createBtn" name="Create Test" />
        </div>
        <div className="PackageMapper__barLower">
          <div className="PackageMapper__chipWrapper">
            {BaseChip}
            {SelectedChips}
            {ValueChip}
          </div>
        </div>
      </div>

      <div className="PackageMapper__subcommands">
        {BaseSubcommands}
        {Subcommands}
      </div>

      <div className="PackageMapper__arguments">
        {Arguments}
      </div>
    </div>
  );
}

export default PackageMapper;

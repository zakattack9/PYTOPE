import UploadButton from '../../components/UploadButton/UploadButton';
import Button from '../../components/Button/Button';
import ChipSelector from '../../components/ChipSelector/ChipSelector';
import Chip from '../../components/Chip/Chip';
import { ChipSelectorType } from '../../utils/enums';
import { ChipType } from '../../utils/enums';
import { useAppSelector, useAppDispatch } from '../../hooks/react-redux';
import './PackageMapper.scss';

function PackageMapper() {
  const pkgMapperState = useAppSelector(state => state.packageMapper);
  const { command, currPackage } = pkgMapperState;
  const dispatch = useAppDispatch();
  console.log(pkgMapperState);

  const SelectedChips = pkgMapperState;

  const BaseChip = command ? (
    <Chip name={command.baseKeyword} type={ChipType.BASE} />
  ) : null;

  const ValueChip = command ? (
    <Chip name="value" placeholder={command.value} type={ChipType.VALUE} />
  ) : null;

  const BaseSubcommands = currPackage?.subcommands ? (
    <ChipSelector 
      title={currPackage.baseKeyword} 
      type={ChipSelectorType.SUBCOMMANDS} 
      chipData={currPackage.subcommands} 
    />
  ) : null;

  const BaseArguments = currPackage?.arguments ? (
    <ChipSelector 
      title={currPackage.baseKeyword} 
      type={ChipSelectorType.ARGUMENTS} 
      chipData={currPackage.arguments} 
    />
  ) : null;

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
            <Chip name="submodule" />
            <Chip name="--branch" placeholder="<branch>" type={ChipType.ARG} />
            {ValueChip}
          </div>
        </div>
      </div>

      <div className="PackageMapper__subcommands">
        {BaseSubcommands}
      </div>

      <div className="PackageMapper__arguments">
        {BaseArguments}
      </div>
    </div>
  );
}

export default PackageMapper;

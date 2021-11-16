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
  const dispatch = useAppDispatch();
  console.log(pkgMapperState);

  const SelectedChips = pkgMapperState;

  const BaseChip = pkgMapperState.command ? (
    <Chip name={pkgMapperState.command.baseKeyword} type={ChipType.BASE} />
  ) : null;

  const ValueChip = pkgMapperState.command ? (
    <Chip name="value" placeholder={pkgMapperState.command.value} type={ChipType.VALUE} />
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
        <ChipSelector title="git" type={ChipSelectorType.SUBCOMMANDS} chips={["fetch", "init", "commit", "push", "pull"]} />
      </div>

      <div className="PackageMapper__arguments">
        <ChipSelector title="git" type={ChipSelectorType.ARGUMENTS} chips={["fetch", "init", "commit", "push", "pull"]} />
      </div>
    </div>
  );
}

export default PackageMapper;

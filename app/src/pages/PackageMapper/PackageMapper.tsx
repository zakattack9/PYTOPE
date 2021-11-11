import UploadButton from '../../components/UploadButton/UploadButton';
import Button from '../../components/Button/Button';
import Chip from '../../components/Chip/Chip';
import { ChipType } from '../../utils/enums';
import './PackageMapper.scss';

function PackageMapper() {
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
            <Chip name="git" type={ChipType.BASE} />
            <Chip name="submodule" />
            <Chip name="--branch" placeholder="<branch>" type={ChipType.ARG} />
            <Chip name="./a_branch" placeholder="<folder>" type={ChipType.VALUE} />
          </div>
        </div>
      </div>

      <div className="PackageMapper__subcommands">
        
      </div>

      <div className="PackageMapper__arguments">
        
      </div>
    </div>
  );
}

export default PackageMapper;

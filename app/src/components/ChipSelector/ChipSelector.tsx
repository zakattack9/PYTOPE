import { useState } from 'react';
import FilterInput from '../FilterInput/FilterInput';
import Chip from '../Chip/Chip';
import { ChipSelectorType } from '../../utils/enums';
import { ChipType } from '../../utils/enums';
import { Arguments, Subcommands } from '../../utils/package-mapper';
import { Props as ChipProps } from '../Chip/Chip';
import { commandAdd, commandRemove } from '../../slices/packageMapperSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/react-redux';
import { getPathType, getPathPrefix } from '../../utils/package-mapper';
import './ChipSelector.scss';

interface Props {
  title: string,
  type: ChipSelectorType,
  chipData: Subcommands | Arguments,
  isSingleSelect?: boolean,
}

function ChipSelector(props: Props) {
  const command = useAppSelector(state => state.packageMapper.command);
  const dispatch = useAppDispatch();
  const { isSingleSelect = true } = props;
  const [filter, setFilter] = useState('');

  const handleChange = (input: string) => setFilter(input);

  const singleSelect = (path: string) => {
    if (!path) return; // ignore chips that don't have a path
    const pathType = getPathType(path);
    const pathPrefix = getPathPrefix(path);
    // relies on paths being sorted (alternative is to track based off # of "/")
    const currPath = command?.paths[pathType].find(path => path.startsWith(pathPrefix)); 
    if (currPath) dispatch(commandRemove(currPath));
    if (!command?.paths[pathType].includes(path))
      dispatch(commandAdd(path));
  }

  const multiSelect = (path: string) => {
    if (!path) return; // ignore chips that don't have a path
    const pathType = getPathType(path);
    if (command?.paths[pathType].includes(path))
      dispatch(commandRemove(path));
    else
      dispatch(commandAdd(path));
  }

  const handleChipClick = (path: string) => {
    if (isSingleSelect) singleSelect(path);
    else multiSelect(path);
  }

  const sortedChips = Object.entries(props.chipData).sort(
    (a, b) => a[0].localeCompare(b[0]));
  const Chips = sortedChips.map(([name, obj]) => {
    const isArgument = props.type === ChipSelectorType.ARGUMENTS;
    const isSelected = obj.path && command?.paths[getPathType(obj.path)].includes(obj.path);
    const chipProps: ChipProps = {
      name,
      path: obj.path,
      onClick: handleChipClick,
      ...(isArgument && { 
        type: ChipType.ARG,
        placeholder: obj.value,
        isEditable: false,
      }),
      className:'Chip--hover',
      isSelected: isSelected || false,
    };
    return name.includes(filter) ? (
      <Chip {...chipProps} key={obj.path} />
    ) : null;
  });

  return (
    <div className="ChipSelector">
      <div className="ChipSelector__title">{props.title}</div>
      <div className="ChipSelector__type">{props.type}</div>
      <FilterInput className="ChipSelector__filterInput" onChange={handleChange} />
      <div className="ChipSelector__chips">
        <div className="ChipSelector__chipWrapper">
          {Chips}
        </div>
      </div>
    </div>
  );
}

export default ChipSelector;

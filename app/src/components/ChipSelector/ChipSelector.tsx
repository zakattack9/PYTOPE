import { useState, useEffect } from 'react';
import FilterInput from '../FilterInput/FilterInput';
import Chip from '../Chip/Chip';
import { ChipSelectorType } from '../../utils/enums';
import { ChipType } from '../../utils/enums';
import { Arguments, Subcommands } from '../../utils/package-mapper';
import { Props as ChipProps } from '../Chip/Chip';
import { commandAdd, commandRemove } from '../../slices/packageMapperSlice';
import { useAppDispatch } from '../../hooks/react-redux';
import './ChipSelector.scss';

interface Props {
  title: string,
  type: ChipSelectorType,
  chipData: Subcommands | Arguments,
}

interface Chip {
  name: string,
  type?: ChipType,
  placeholder?: string,
  path: Array<string>
}

function ChipSelector(props: Props) {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState('');
  const [selectedChip, setSelectedChip] = useState({ name: '', path: '' });

  const handleChange = (input: string) => setFilter(input);

  const handleChipClick = (name: string, path: string) => {
    const { name: currName, path: currPath } = selectedChip;
    if (!path) return; // ignore chips that don't have a path
    if (currPath) dispatch(commandRemove(currPath));
    if (name === currName) {
      setSelectedChip({ name: '', path: '' });
    } else {
      dispatch(commandAdd(path));
      setSelectedChip({ name , path });
    }
  }

  const Chips = Object.entries(props.chipData).map(([name, obj]) => {
    const isArgument = props.type === ChipSelectorType.ARGUMENTS;
    const isSelected = name === selectedChip.name;
    const chipProps: ChipProps = {
      name,
      path: obj.path,
      handleClick: handleChipClick,
      ...(isArgument && obj.value && { 
        type: ChipType.ARG,
        placeholder: obj.value,
        isEditable: false,
      }),
      ...(isSelected && { 
        isSelected
      }),
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

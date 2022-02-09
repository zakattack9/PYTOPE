import { useState, useEffect } from 'react';
import TitleInput from '../TitleInput/TitleInput';
import BackButton from '../BackButton/BackButton';
import TextareaInput from '../TextareaInput/TextareaInput';
import './NewDocker.scss';

interface NewDockerState {
  title: string,
  filename: string,
  description: string,
}

function NewDocker() {
  const [state, setState] = useState<NewDockerState>({
    title: '',
    filename: '',
    description: '',
  });

  const handleTitleChange = (title: string) => {
    setState({ ...state, title });
  }

  const handleDescChange = (description: string) => {
    setState({ ...state, description });
  }

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className='NewDocker'>
      <BackButton className='NewDocker__cancel' text='Cancel' />
      <TitleInput className='NewDocker__titleInput' onChange={handleTitleChange} placeholder='Enter Docker Image Name' />

      <div className="NewDocker__descLabel">Description</div>
      <TextareaInput className='NewDocker__desc' onChange={handleDescChange} />
    </div>
  );
}

export default NewDocker;

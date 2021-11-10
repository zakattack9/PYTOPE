import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './PageBarItem.scss';

interface Props {
  name: string,
  link: string
}

function PageBarItem(props: Props) {
  const CLASS_NAME = 'PageBarItem'
  const [className, setClassName] = useState(CLASS_NAME)
  const { pathname } = useLocation();
  
  useEffect(() => {
    if (pathname.includes(props.link))
      setClassName(`${CLASS_NAME}--active`)
    else
      setClassName(CLASS_NAME)
  }, [pathname, props.link]);

  return (
    <Link to={props.link} className={className}>
      {props.name}
    </Link>
  );
}

export default PageBarItem;

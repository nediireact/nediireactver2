import React, {
  FormEvent,
  useRef,
  useState
} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'src/modules/nav-search-box/nav-search-box.scss';

const iconFile = '/assets/iconmonstr-magnifier-3.svg';

const NavSearchBox = (props: any): React.ReactElement => {
  const system = useSelector((state: any) => state.system);
  const prefix = system.platform.prefix;
  const iconURL = `${prefix}${iconFile}`;
  const formRef: any = useRef(null);
  const [query, setQuery] = useState(null);
  const navigate = useNavigate();

  const updateQuery = (e: FormEvent) => {
    e.preventDefault();
    formRef.current.reset();
    if ( props.updateQuery ) props.updateQuery(query);
    return navigate(`/buscador?q=${query}`);
  };

  return (
    <form
      className='input-field NavSearchBox'
      onSubmit={updateQuery}
      ref={formRef}>
      <input
        onChange={( e: any ) => setQuery(e.target.value)}
        placeholder='Buscar'
        type='text'
        className='validate grey lighten-4'
        style={{
          backgroundImage: `url('${iconURL}')`
        }} />
    </form>
  );
};

export default NavSearchBox;

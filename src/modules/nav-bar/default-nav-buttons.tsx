import React, {
  useEffect
} from 'react';

const DefaultNavButtons = (props: any): React.ReactElement => {
  useEffect(() => {
    const menu: any[] = [];
    menu.push({
      to: '/',
      text: 'Inicio',
      rightLine: true
    });
    menu.push({
      to: '/expos',
      text: 'Expos',
      rightLine: true
    });
    menu.push({
      to: '/categorias',
      text: 'Categorías'
    });
    props.setSectionMenu(menu);
  }, [props.setSectionMenu]);
  return (<></>);
};

export default DefaultNavButtons;


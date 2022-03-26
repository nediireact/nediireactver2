import React from 'react';
import { Link } from 'react-router-dom';
import 'src/modules/stand-options-menu-grid/stand-options-menu-grid.scss';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import StrongText from 'src/modules/strong-text/strong-text';
import SubTitle from 'src/modules/sub-title/sub-title';
import data from 'src/modules/stand-options-menu-grid/options-menu.json';

interface StandOptionMenuGridInterface {
  standSlug: string;
}

const StandOptionMenuGrid = (props: StandOptionMenuGridInterface): React.ReactElement => {
  const options = data.options;

  return (
    <div className='StandOptionMenuGrid'>
      <SubTitle text='Menú de opciones' />
      <HorizontalSpace size='small' />
      <div className='row'>
        {
          options.map((i, index: number) => {
            return (
              <Link key={index}
                to={`/empresa/${props.standSlug}/${i.href}`}
                className='col s6 m4 StandOptionMenuGrid__items' >
                <i className={`material-icons z-depth-3 white-text ${i.color}`}>{i.icon}</i>
                <StrongText text={i.text} fullWidth={true} />
              </Link>
            );
          })
        }
      </div>
    </div>
  );
};

export default StandOptionMenuGrid;

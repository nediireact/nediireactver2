import React from 'react';
import { Link } from 'react-router-dom';
import 'src/modules/title/title.scss';

type TitleInterface = {
  text: string;
  fullWidth?: boolean;
  link?: string;
  color?: string;
  align?: string;
  shadow?: boolean;
}

const Title = (props: TitleInterface): React.ReactElement => {
  return (
    <div className={`Title ${ props.fullWidth ? '' : 'row'}`}>
      {
        props.fullWidth ? null : <em className='col m2 l1 hide-on-small-only Title__space'></em>
      }
      {
        props.link ?
          <Link
            to={props.link}
            className={`${ props.fullWidth ? '' : 'col s12 m8 l10'} Title__text`}
            style={{
              color: props.color,
              textAlign: props.align === 'right' ? 'right' :
                props.align === 'left' ? 'left' : 'center',
              textShadow: props.shadow ? '0px 0px 2px rgba(0, 0, 0, 0.6)' : ''
            }}>
            {props.text}
          </Link> : <div
            className={`${ props.fullWidth ? '' : 'col s12 m8 l10'} Title__text`}
            style={{
              color: props.color,
              textAlign: props.align === 'right' ? 'right' :
                props.align === 'left' ? 'left' : 'center',
              textShadow: props.shadow ? '0px 0px 2px rgba(0, 0, 0, 0.6)' : ''
            }}>
            {props.text}
          </div>
      }
      {
        props.fullWidth ? null : <em className='col m2 l1 hide-on-small-only Title__space'></em>
      }
    </div>
  );
};

export default Title;

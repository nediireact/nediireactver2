import React from 'react';
import { Link } from 'react-router-dom';
import * as M from 'materialize-css';
import { LoadingIndicator } from 'rrmc';
import SystemValues from 'src/constants/SystemValues';
import SystemCheck from 'src/components/_core/system-check';
import GlobalAlertDialog from 'src/components/_core/global-alert-dialog';
import SystemConfigurationsLoader from 'src/components/_core/system-configuration-loader';
import './footer.scss';

const Footer = (): React.ReactElement => {
  const systemValues = SystemValues.getInstance();
  const system = systemValues.system;
  const isLoading = system.isLoading.length ? true : false;
  const isMobileApp = systemValues.isMobileApp;

  return (
    <>
    <div className='Footer__flex-filler'></div>
    <footer className={`page-footer ${systemValues.primaryColorName} darken-2 Footer`}>
      <div className='footer-copyright Footer__copyright'>
        <div className='container Footer__info'>
          <div className='Footer__version'>
            <span onClick={() => {
              M.toast({
                html: `(${system.platform.os} - ${systemValues.branchName})`,
                classes: 'rounded'
              });
            }}>V {systemValues.version}&nbsp;</span>
            { !isMobileApp && systemValues.appEnabled ?
              <a
                href='/static/app.apk'
                className='white-text Footer__app'>
                <span>-&nbsp;</span>
                <i className='material-icons'>android</i>
              </a> : null
            }
            &nbsp;-&nbsp;
            {
              systemValues.changelogEnabled ?
                <Link
                  to='/changelog'
                  className='white-text Footer__app'>
                  <i className='material-icons'>access_time</i>
                </Link> : null
            }
          </div>
          <span className='white-text'>With ♥ by&nbsp;
            <a href='https://github.com/GMR027'
              className='white-text'
              target='_blank'
              rel='noreferrer'>
              Edgar
            </a>
            &nbsp;&&nbsp;
            <a href='https://github.com/christopherigm'
              className='white-text'
              target='_blank'
              rel='noreferrer'>
              Chris
            </a>
            &nbsp;G.
          </span>
        </div>
      </div>
    </footer>
    <LoadingIndicator isLoading={isLoading} />
    <SystemConfigurationsLoader />
    <SystemCheck />
    <GlobalAlertDialog />
    </>
  );
};

export default Footer;

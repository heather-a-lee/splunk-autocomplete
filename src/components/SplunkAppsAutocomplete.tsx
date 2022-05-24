import { useEffect, useState } from 'react';
import SplunkBaseApi from '../api/splunkBase';
import { SplunkApp } from '../types';
import Autocomplete from './Autocomplete/Autocomplete';
import WaitSpinner from '@splunk/react-ui/WaitSpinner';
import Menu from '@splunk/react-ui/Menu';

const splunkBaseApi = new SplunkBaseApi();

const SplunkAppsAutocomplete = () => {
  const [appData, setAppData] = useState<SplunkApp[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    splunkBaseApi.getAllData('/api/v2/apps').then(
      (result) => {
        setAppData(result);
        setLoaded(true);
      },
      (error) => {
        setError(error);
      },
    );
  }, []);

  if (error) return <div data-testid="autocomplete-error">Error: {error.message}</div>;
  if (!loaded) return <WaitSpinner data-testid="wait-spinner" size="large" />;

  const renderSuggestion = (option: SplunkApp) => {
    return (
      <Menu.Item key={option.app_name}>
        <a href={option.app_url}>{option.app_name}</a>
      </Menu.Item>
    );
  };

  return <Autocomplete options={appData} keyName="app_name" renderSuggestion={renderSuggestion} />;
};

export default SplunkAppsAutocomplete;

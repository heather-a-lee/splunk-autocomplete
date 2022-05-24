import { ReactNode, useCallback, useMemo, useState } from 'react';
import Text from '@splunk/react-ui/Text';
import { debounce } from 'lodash';
import Suggestions from './Suggestions';
import { Option } from '../../types';

export type AutocompleteProps = {
  options: Option[];
  keyName: string;
  renderSuggestion: (suggestion: Option) => ReactNode;
};

const Autocomplete: React.FC<AutocompleteProps> = ({ options = [], keyName, renderSuggestion }) => {
  const [userInput, setUserInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const debouncedHandleSuggestions = useMemo(() => {
    const handleSuggestions = (currentValue: string) => {
      if (!currentValue) {
        setSuggestions([]);
        setUserInput('');
        return; // no need to calculate suggestions if input is cleared
      }
      const matches = options.filter((o) => {
        return String(o[keyName]).toLowerCase().indexOf(currentValue.toLowerCase()) > -1;
      });
      if (matches) setSuggestions(matches);
      return matches;
    };

    return debounce(handleSuggestions, 300);
  }, [keyName, options]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const currentValue = e.target.value || '';
      setUserInput(currentValue);
      debouncedHandleSuggestions(currentValue);
    },
    [debouncedHandleSuggestions],
  );

  return (
    <div className="autocomplete-container" data-testid="autocomplete-container">
      <Text
        appearance="search"
        onChange={handleChange}
        value={userInput}
        aria-label="autocomplete-input"
      />
      <Suggestions suggestions={suggestions} renderSuggestion={renderSuggestion} />
    </div>
  );
};

export default Autocomplete;

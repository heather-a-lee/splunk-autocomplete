// import Menu from '@splunk/react-ui/Menu';

import { ReactNode } from 'react';
import { Option } from '../../types';
import Menu from '@splunk/react-ui/Menu';

export type SuggestionProps = {
  suggestions: Option[];
  renderSuggestion: (suggestion: Option) => ReactNode;
};

const Suggestions: React.FC<SuggestionProps> = ({ suggestions, renderSuggestion }) => {
  // slicing suggestions for performance reasons once we exceed 100 suggestions
  return (
    <Menu stopScrollPropagation={false} className="suggestions" retainFocus={false}>
      {suggestions && suggestions.slice(0, 100).map((suggestion) => renderSuggestion(suggestion))}
    </Menu>
  );
};

export default Suggestions;

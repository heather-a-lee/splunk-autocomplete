import Menu from '@splunk/react-ui/Menu';

const Suggestions = ({ suggestions, renderSuggestion }) => {
  // slicing suggestions for performance reasons once we exceed 100 suggestions
  return (
    <Menu className="suggestions" retainFocus={false}>
      {suggestions && suggestions.slice(0, 100).map(suggestion => renderSuggestion(suggestion))}
    </Menu>
  );
};

export default Suggestions;
import SplunkAppsAutocomplete from "../components/SplunkAppsAutocomplete";
import SplunkBaseApi from "../api/splunkBase";
import { render, screen, waitFor, fireEvent, act } from "@testing-library/react";

jest.useFakeTimers();

it('should handle error gracefully from API', async () => {
  jest.spyOn(SplunkBaseApi.prototype, 'getAllData').mockImplementation(async () => {
    throw new Error("Error getting data from Splunkbase");
  });
  render(<SplunkAppsAutocomplete />);
  await waitFor(() => {
    expect(screen.getByTestId('autocomplete-error')).toBeInTheDocument();
  });
}); 

it('should render text input', async () => {
  jest.spyOn(SplunkBaseApi.prototype, 'getAllData').mockImplementation(async () => {
    return [];
  });
  render(<SplunkAppsAutocomplete />);
  await waitFor(() => {
    expect(screen.getByTestId('autocomplete-container')).toBeInTheDocument();
  });
});

it('should show options based on input', async () => {
  jest.spyOn(SplunkBaseApi.prototype, 'getAllData').mockImplementation(async () => {
    return [{
      app_name: 'Test app #1', 
      app_url: "http://google.com",
    }, {
      app_name: 'Test app #2',
      app_url: "http://google.com",
    }];
  });
  render(<SplunkAppsAutocomplete />);
  await waitFor(() => {
    expect(screen.getByTestId('autocomplete-container')).toBeInTheDocument();
  });
  const input = screen.getByLabelText('autocomplete-input');
  fireEvent.change(input, { target: { value: 'test' } });
  act(() => {
    jest.runAllTimers();
  });
  const items = screen.getAllByRole('menuitem');
  expect(items).toHaveLength(2);
  fireEvent.change(input, { target: { value: '#1' } });
  act(() => {
    jest.runAllTimers();
  });
  const singleItem = screen.getAllByRole('menuitem');
  expect(singleItem).toHaveLength(1);
});
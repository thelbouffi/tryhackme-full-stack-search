import { ChangeEvent } from "react";

interface SearchInputProps {
  inputValue: string;
  showClearBtn: boolean;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

const SearchInput = ({ inputValue, showClearBtn, onInputChange, onClear }: SearchInputProps) => {
  return (
    <div className="form">
      <i className="fa fa-search"></i>
      <input
        id="search-accommodation"
        type="text"
        className="form-control form-input"
        placeholder="Search accommodation..."
        value={inputValue}
        onChange={onInputChange}
        name="search-field"
        maxLength={100}
      />
      {showClearBtn && (
        <span className="left-pan" role="button" onClick={onClear}>
          <i className="fa fa-close"></i>
        </span>
      )}
    </div>
  );
};

export default SearchInput;

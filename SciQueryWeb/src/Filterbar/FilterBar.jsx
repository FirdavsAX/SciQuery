import React, { useState } from "react";
import "./FilterBar.css";

// Main FilterBar Component
const FilterBar = ({ onApplyFilter }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [sortBy, setSortBy] = useState("MostVoted");
  const [filterOptions, setFilterOptions] = useState({
    noAnswers: false,
    noAcceptedAnswer: false,
    hasBounty: false,
    isFavorite: false, // New filter option
    isResolved: false, // New filter option
  });
  const [searchTags, setSearchTags] = useState("");

  const handleSortByChange = (value) => {
    setSortBy(value);
  };

  const handleFilterOptionsChange = (option, value) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [option]: value,
    }));
  };

  const handleSearchTagsChange = (e) => {
    setSearchTags(e.target.value);
  };

  const handleApplyFilter = () => {
    onApplyFilter({ sortBy, ...filterOptions, tags: searchTags });
  };

  return (
    <div className="d-flex justify-content-end align-items-start">
      {isVisible && (
        <div className="filter-bar">
          <div className="filter-options">
            <Dropdown
              label="Tartiblash"
              value={sortBy}
              options={[
                { label: "Eng yangilari", value: "MostNew" },
                { label : "Eng faol", value: "MostRecently" },
                { label : "Eng ko'p baholangan",value :"MostVoted" },
              ]}
              onChange={handleSortByChange}
            />
            <CheckboxGroup
              label="Saralash"
              options={[
                { label: "Javob berilmagan", value: "noAnswers" },
                { label: "Birorta javob qabul qilinmagan", value: "noAcceptedAnswer" },
                { label: "Yechilgan", value: "isResolved" }, // New filter option
              ]}
              values={filterOptions}
              onChange={handleFilterOptionsChange}
            />
            <TextInput
              label="Teglar bilan :"
              value={searchTags}
              onChange={handleSearchTagsChange}
              placeholder="e.g. matematika yoki fizika"
            />
          </div>
          <div className="filter-actions">
            <button className="apply-filter" onClick={handleApplyFilter}>
              Apply filter
            </button>
          </div>
        </div>
      )}{" "}
      <button
        className="toggle-filter"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "Berkitish" : "Filter"}
      </button>
    </div>
  );
};

// Dropdown Component
const Dropdown = ({ label, value, options, onChange }) => {
  return (
    <div className="dropdown">
      <label>{label}</label>
      <br />
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// CheckboxGroup Component
const CheckboxGroup = ({ label, options, values, onChange }) => {
  return (
    <div className="checkbox-group">
      <label>{label}</label>
      {options.map((option) => (
        <div key={option.value}>
          <input
            type="checkbox"
            id={option.value}
            checked={values[option.value] || false}
            onChange={(e) => onChange(option.value, e.target.checked)}
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </div>
  );
};

// TextInput Component
const TextInput = ({ label, value, onChange, placeholder }) => {
  return (
    <div className="text-input">
      <label>{label}</label><div></div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FilterBar;

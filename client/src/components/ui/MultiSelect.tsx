import { useState, useRef, useEffect } from 'react';
import { FiX, FiChevronDown } from 'react-icons/fi';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  placeholder?: string;
}

export const MultiSelect = ({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select...'
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleRemoveTag = (tagValue: string) => {
    onChange(value.filter(v => v !== tagValue));
  };

  const handleSelectOption = (optionValue: string) => {
    if (!value.includes(optionValue)) {
      onChange([...value, optionValue]);
    }
    setSearch('');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full" ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <div 
          className="min-h-[42px] p-1.5 border rounded-lg shadow-sm bg-white cursor-text"
          onClick={() => setIsOpen(true)}
        >
          <div className="flex flex-wrap gap-1.5">
            {value.map(v => {
              const option = options.find(o => o.value === v);
              return (
                <span
                  key={v}
                  className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
                >
                  {option?.label}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveTag(v);
                    }}
                    className="ml-1 hover:text-purple-900"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              );
            })}
            <input
              type="text"
              className="flex-1 outline-none min-w-[60px] text-sm"
              placeholder={value.length === 0 ? placeholder : ''}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsOpen(true)}
            />
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredOptions.length === 0 ? (
              <div className="p-2 text-sm text-gray-500">No options found</div>
            ) : (
              filteredOptions.map(option => (
                <div
                  key={option.value}
                  className={`p-2 text-sm cursor-pointer hover:bg-gray-100 ${
                    value.includes(option.value) ? 'bg-purple-50' : ''
                  }`}
                  onClick={() => handleSelectOption(option.value)}
                >
                  {option.label}
                </div>
              ))
            )}
          </div>
        )}
        
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <FiChevronDown />
        </div>
      </div>
    </div>
  );
};
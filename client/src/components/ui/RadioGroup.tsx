interface Option {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  horizontal?: boolean;
}

export const RadioGroup = ({
  options,
  value,
  onChange,
  label,
  horizontal = false
}: RadioGroupProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className={`flex gap-4 ${horizontal ? 'flex-row' : 'flex-col'}`}>
        {options.map(option => (
          <label
            key={option.value}
            className="inline-flex items-center cursor-pointer"
          >
            <input
              type="radio"
              className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span className="ml-2 text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
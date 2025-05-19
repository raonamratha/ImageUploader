import { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CountryOption {
  value: string;
  label: string;
  flag: string;
}

const countries: CountryOption[] = [
  { value: "india", label: "India", flag: "🇮🇳" },
  { value: "usa", label: "USA", flag: "🇺🇸" },
  { value: "uk", label: "UK", flag: "🇬🇧" },
  { value: "canada", label: "Canada", flag: "🇨🇦" },
  { value: "australia", label: "Australia", flag: "🇦🇺" },
  { value: "germany", label: "Germany", flag: "🇩🇪" },
  { value: "france", label: "France", flag: "🇫🇷" },
  { value: "japan", label: "Japan", flag: "🇯🇵" },
  { value: "china", label: "China", flag: "🇨🇳" },
  { value: "brazil", label: "Brazil", flag: "🇧🇷" },
];

interface CountrySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CountrySelector({ value, onChange }: CountrySelectorProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>(value || "india");

  const handleCountryChange = (newValue: string) => {
    setSelectedCountry(newValue);
    onChange(newValue);
  };

  const getCurrentFlag = () => {
    const country = countries.find((c) => c.value === selectedCountry);
    return country ? country.flag : countries[0].flag;
  };

  return (
    <Select value={selectedCountry} onValueChange={handleCountryChange}>
      <SelectTrigger className="bg-white border border-gray-300 rounded-md h-10">
        <div className="flex items-center">
          <span className="mr-2 text-lg">{getCurrentFlag()}</span>
          <SelectValue placeholder="Select country" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem key={country.value} value={country.value}>
            <div className="flex items-center">
              <span className="mr-2 text-lg">{country.flag}</span>
              <span>{country.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

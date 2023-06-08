import { useState } from "react";

type ItemSelectorProps = {
    selectOptions: string[];
    selectFor: string;
    name: string;
    onSelect: (value: string) => void;
}

export const ItemSelector = ({selectOptions, selectFor, name, onSelect}: ItemSelectorProps) => {
    const [selectedValue, setSelectedValue] = useState("");

    selectOptions.sort((a, b) => a.localeCompare(b));

	return (
		<div className={`${selectFor}-selector`}>
			<label htmlFor={selectFor}>{name}</label>
			<select
                key={selectFor}
				id={selectFor}
				value={selectedValue}
				onChange={(e) => {
                    setSelectedValue(e.target.value);
					onSelect(e.target.value);
				}}>
                {!selectedValue && <option key={`place${selectFor}`} value={""}>All possible values are here</option>}
				{selectOptions.map((o, index) => (
					<option key={`${o}-${selectFor}-${index}`} value={o}>{o}</option>
				))}
			</select>
		</div>
	);
};

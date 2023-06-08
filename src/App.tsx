import "./App.scss";
import React, { useEffect, useState } from "react";
import defaultJsonData from "../src/sample.json";
import { JsonDataStructure } from "./interfaces/JsonDataStructure";
import { Items } from "./interfaces/Items";
import { Variants } from "./interfaces/Variants";
import { ItemSelector } from "./components/ItemSelector";
import { isValidJsonDataStructure } from "./validation/dataStructureValidation";
import { ItemVariations } from "./helperFunctions/ItemVariations";
import { ProductCodeAssembly } from "./helperFunctions/ProductCodeAssembly";

function App() {
	const [resetFlag, setResetFlag] = useState(false);
	const [selectedFile, setSelectedFile] = useState<string>("sample.json");
	const [jsonData, setJsonData] = useState<JsonDataStructure>(defaultJsonData);
	const [selectedItem, setSelectedItem] = useState<Items>();
	const [possibleVariations, setPossibleVariations] = useState<Variants[]>();
	const [productCode, setProductCode] = useState<{ [key: string]: string }>({});

	useEffect(() => {
		if (resetFlag) {
			setProductCode({});
			setSelectedItem(undefined);
			setPossibleVariations([]);
			setResetFlag(false);
		}
	}, [resetFlag]);

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				try {
					const fileData = JSON.parse(
						event.target?.result as string
					) as JsonDataStructure;

					if (!isValidJsonDataStructure(fileData)) {
						throw new Error("Invalid JSON data structure");
					} else {
						setJsonData(fileData);
						setSelectedFile(file.name);
					}
				} catch (error) {
					console.log("Error parsing JSON", error);
					alert("The chosen file does not have a valid data structure!");
					setResetFlag(true);
				}
			};
			reader.readAsText(file);
			setResetFlag(true);
		}
	};

	const CodeBuilder = (codePart: string, code: string) => {
		setProductCode((prevProductCode) => ({
			...prevProductCode,
			[codePart]: code,
		}));
	};

	return (
		<div className="App">
			Product Code Generator
			<div className="data-file">
				<div
					className="current-data-file"
					key="data-from">
					Using data from:
					{jsonData && <div>{selectedFile}</div>}
				</div>
				<div
					className="change-data-file"
					key="data-uploading">
					Change data source
					<input
						type="file"
						onChange={handleFileUpload}
					/>
				</div>
			</div>
			{!resetFlag && (
				<>
					<div
						className="item-selector"
						key="item-selecting">
						<ItemSelector
							selectFor={`item-select-${selectedItem?.code}`}
							name="Choose item:"
							selectOptions={jsonData.items.map((item) => item.description)}
							onSelect={(option) => {
								var newItem = jsonData.items.find(
									(item) => item.description === option
								);
								setProductCode({});
								newItem?.code && CodeBuilder("item", newItem?.code);
								setSelectedItem(newItem);
								setPossibleVariations(
									ItemVariations(newItem, jsonData.varieties)
								);
							}}
						/>
						{possibleVariations &&
							possibleVariations?.map((variant, index) => {
								return (
									<ItemSelector
										key={`${index}-${selectedItem?.code}-${variant.code}`}
										selectFor={variant.code}
										name={`${variant.description}:`}
										selectOptions={variant.options.map(
											(option) => option.description
										)}
										onSelect={(option) => {
											var selectedOption = variant.options.find(
												(o) => o.description === option
											);
											selectedOption?.code &&
												CodeBuilder(variant.code, selectedOption?.code);
										}}
									/>
								);
							})}
					</div>
					{possibleVariations &&
						Object.keys(productCode).length ===
							possibleVariations?.length + 1 && (
							<div className="product-code">
								Product code:
								<p>{ProductCodeAssembly(productCode)}</p>
								<button
									onClick={() => {
										setResetFlag(true);
									}}>
									Reset
								</button>
							</div>
						)}
				</>
			)}
		</div>
	);
}

export default App;

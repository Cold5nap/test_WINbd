import NewsForm from "@features/NewsForm";
import { Flex } from "antd";
import React from "react";

function App() {
	return (
		<>
			<div style={{ height: 100 }}></div>
			<Flex justify="center">
				{/* hello */}
				<div>
				<NewsForm></NewsForm></div>
			</Flex>
		</>
	);
}

export default App;

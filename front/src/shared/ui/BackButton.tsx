import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
	path?: string;
}

const BackButton: FunctionComponent<BackButtonProps> = ({ path }) => {
	const navigate = useNavigate();
	return (
		<Button icon={<ArrowLeftOutlined />} onClick={() => navigate(path || "/")}>
			Обратно
		</Button>
	);
};

export default BackButton;

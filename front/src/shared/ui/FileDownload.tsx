import { Upload, Button, UploadProps } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import React, { FC } from "react";

const handleDownload: UploadProps["onDownload"] = (file) => {
	// Custom download logic (e.g., fetch or create a Blob)
	const link = document.createElement("a");
	link.href = file.url || URL.createObjectURL(file.originFileObj!);
	link.download = file.name;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};
interface FileDownloadProps {
	url: string;
}
const FileDownload: FC<FileDownloadProps> = ({ url }) => {
	return (
		<Upload
			fileList={[
				{
					uid: url,
					name: url.replace("/uploads/", ""),
					status: "done",
					url: url,
				},
			]}
			onDownload={handleDownload}
		>
			{/* <Button icon={<DownloadOutlined />}>Download File</Button> */}
		</Upload>
	);
};
export default FileDownload;

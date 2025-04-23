import { NotificationBell } from "@features/notification";
import { Tabs } from "antd";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const items = [
	{ key: "", label: "Статьи" },
	{ key: "login", label: "Авторизация" },
].map((item) => ({ ...item, children: <Outlet /> }));

const MainLayout = () => {
	const navigate = useNavigate();
	const tabChangeHandler = (activeKey: string) => {
		navigate("/" + activeKey);
	};
	return (
		// <SocketProvider>
			<div style={{ padding: 24 }}>
				<Tabs
					tabBarExtraContent={{ left: <NotificationBell /> }}
					defaultActiveKey="1"
					items={items}
					onChange={tabChangeHandler}
				/>
			</div>
		// </SocketProvider>
	);
};
export default MainLayout;

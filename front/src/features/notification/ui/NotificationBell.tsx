// NotificationBell.tsx
import React, { useState, useEffect, FC } from "react";
import { Badge, Popover, List, Avatar, Button, Typography } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { io } from "socket.io-client";
import { Config } from "@app/config";

const { Text } = Typography;

interface Notification {
	id: number;
	type: string;
	title: string;
	message: string;
	timestamp: Date;
	read: boolean;
}

const socket = io(Config.socketUrl, {
	auth: {
		token: localStorage.getItem("token"), // Используйте ваш реальный токен
	},
});

const NotificationBell: FC = () => {
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [visible, setVisible] = useState(false);
	const [unreadCount, setUnreadCount] = useState(0);

	useEffect(() => {
		// Получаем историю уведомлений при подключении
		socket.on("notifications", (data: Notification[]) => {
			setNotifications(data);
			updateUnreadCount(data);
		});

		// Обработчик новых уведомлений
		socket.on("new_notification", (notification: Notification) => {
			setNotifications((prev) => [notification, ...prev]);
			setUnreadCount((prev) => prev + 1);
		});

		return () => {
			socket.off("notifications");
			socket.off("new_notification");
		};
	}, []);

	const updateUnreadCount = (notifs: Notification[]) => {
		const count = notifs.filter((n) => !n.read).length;
		setUnreadCount(count);
	};

	const markAsRead = (id?: number) => {
		if (id) {
			const updated = notifications.map((n) =>
				n.id === id ? { ...n, read: true } : n
			);
			setNotifications(updated);
			updateUnreadCount(updated);
		} else {
			const updated = notifications.map((n) => ({ ...n, read: true }));
			setNotifications(updated);
			setUnreadCount(0);
		}
	};

	const content = (
		<div style={{ width: 350 }}>
			<div
				style={{ display: "flex", justifyContent: "space-between", padding: 8 }}
			>
				<Text strong>Уведомления</Text>
				<Button type="link" size="small" onClick={() => markAsRead()}>
					Пометить все как прочитанные
				</Button>
			</div>
			<List
				itemLayout="horizontal"
				dataSource={notifications.slice(0, 10)}
				renderItem={(item) => (
					<List.Item
						style={{
							background: item.read ? "#fff" : "#f6ffed",
							padding: "8px 12px",
							cursor: "pointer",
						}}
						onClick={() => markAsRead(item.id)}
					>
						<List.Item.Meta
							avatar={
								<Avatar
									style={{
										backgroundColor: item.read ? "#d9d9d9" : "#52c41a",
									}}
									icon={<BellOutlined />}
								/>
							}
							title={<Text>{item.title}</Text>}
							description={
								<>
									<div>{item.message}</div>
									<Text type="secondary" style={{ fontSize: 12 }}>
										{new Date(item.timestamp).toLocaleTimeString()}
									</Text>
								</>
							}
						/>
					</List.Item>
				)}
			/>
			{notifications.length > 10 && (
				<div style={{ textAlign: "center", padding: 8 }}>
					<Button type="link">Показать все ({notifications.length})</Button>
				</div>
			)}
		</div>
	);

	return (
		<Popover
			content={content}
			trigger="click"
			visible={visible}
			onVisibleChange={setVisible}
			placement="bottomRight"
		>
			<Badge count={unreadCount}>
				<Button
					style={{margin:'0 10px'}}
					type="text"
					icon={<BellOutlined style={{ fontSize: 18 }} />}
					// shape="circle"
				>
					Уведомления
				</Button>
			</Badge>
		</Popover>
	);
};

export default NotificationBell;

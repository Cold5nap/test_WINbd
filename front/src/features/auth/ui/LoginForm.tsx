import React, { FC } from "react";
import { Form, Input, Button, Card, FormProps } from "antd";

interface LoginFormProps {
	isLoading: boolean;
	onFinish: FormProps["onFinish"];
}
const LoginForm: FC<LoginFormProps> = ({ isLoading, onFinish }) => {
	return (
		<Card title="Авторизация" style={{ maxWidth: 400, margin: "0 auto" }}>
			<Form
				name="login"
				initialValues={{ login: "Имярек", password: "пароль" }}
				onFinish={onFinish}
				layout="vertical"
			>
				<Form.Item
					label="Логин"
					name="login"
					rules={[{ required: true, message: "Введите логин" }]}
				>
					<Input />
				</Form.Item>
				{/* COPYRIGHT АНДРЕЕВ АНДРЕЙ АНДРЕЕВИЧ github:cold5nap */}
				<Form.Item
					label="Пароль"
					name="password"
					rules={[{ required: true, message: "Введите пароль" }]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" loading={isLoading} block>
						Войти
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default LoginForm;

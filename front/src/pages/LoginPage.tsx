import { LoginForm, setCredentials, useLoginMutation } from "@features/auth";
import { FormProps } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const [login, { isLoading }] = useLoginMutation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onFinish: FormProps["onFinish"] = async (values) => {
		try {
			const data = await login(values).unwrap();
			dispatch(setCredentials(data.token));
			navigate("/");
		} catch (err) {
			console.log("не авторизирован.", err);
		}
	};
	return <LoginForm isLoading={isLoading} onFinish={onFinish} />;
};
export default LoginPage;

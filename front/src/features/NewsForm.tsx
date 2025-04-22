import React, { useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import axios from 'axios';

const FormWithImages = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Обработчик загрузки файлов
//   const handleUpload = async ({ file, onSuccess, onError }) => {
//     try {
//       const formData = new FormData();
//       formData.append('image', file);

//       // Замените на ваш API-эндпоинт
//       const response = await axios.post('/api/upload', formData);

//       onSuccess(response.data, file);
//       message.success(`${file.name} успешно загружен`);
//     } catch (error) {
//       onError(error);
//       message.error(`Ошибка при загрузке ${file.name}`);
//     }
//   };

  // Ограничение перед загрузкой
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('Можно загружать только изображения!');
    }
    return isImage;
  };

  // Отправка всей формы
//   const onFinish = async (values) => {
//     setLoading(true);
//     try {
//       const response = await axios.post('/api/posts', {
//         ...values,
//         images: fileList.map(file => file.response?.url || file.originFileObj)
//       });
//       message.success('Данные сохранены!');
//       form.resetFields();
//       setFileList([]);
//     } catch (error) {
//       message.error('Ошибка при сохранении');
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <Form
      form={form}
      layout="vertical"
    //   onFinish={onFinish}
      style={{ width: 600 }}
    >
      <Form.Item
        name="title"
        label="Заголовок"
        rules={[{ required: true, message: 'Введите заголовок' }]}
      >
        <Input placeholder="Название поста" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Описание"
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label="Изображения"
        name="images"
        valuePropName="fileList"
        getValueFromEvent={(e) => e.fileList}
      >
        <Upload
          listType="picture-card"
          fileList={fileList}
          beforeUpload={beforeUpload}
        //   customRequest={handleUpload}
        //   onChange={({ fileList }) => setFileList(fileList)}
          multiple
        >
          {fileList.length >= 8 ? null : (
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Загрузить</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormWithImages;
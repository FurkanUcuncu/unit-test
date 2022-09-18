import React, {useEffect} from 'react';
import {Button, Form, Input, Modal, Row, Select} from "antd";
import {useSelector} from "react-redux";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const AddEmployeeModal = ({formValues,onFinish,onClose,modalInfo,modalVisible}) => {
    const {departments} = useSelector(state=>state?.employee)
    const [form] = Form.useForm();

    const validateMessages = {
        required: '${label} gerekli!',
        types: {
            email: '${label} adresi uygun değil!',
        },
    };

    useEffect(() => {
        form.setFieldsValue({...formValues})
    }, [formValues,form]);

    return (
        <Modal
            forceRender
            title={modalInfo?.title}
            centered
            open={modalVisible}
            footer={null}
            onCancel={onClose}
        >
            <Form {...layout} form={form} name="control-hooks" validateMessages={validateMessages} onFinish={onFinish}>
                <Form.Item
                    name="fullname"
                    label="Ad Soyad"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder="Ad Soyad" />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            type:'email',
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="maritalStatus"
                    label="Medeni Durum"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Seçiniz"
                        allowClear
                    >
                        <Select.Option value="1">Evli</Select.Option>
                        <Select.Option value="0">Bekar</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="departmentId"
                    label="Departman"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Seçiniz"
                        allowClear
                    >
                        {
                            departments.map((i)=>{
                                return(
                                    <Select.Option key={i.id} value={i.id}>{i.title}</Select.Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Row style={{justifyContent:'flex-end',gap:10}}>
                        <Button htmlType="button" onClick={onClose}>
                            İptal
                        </Button>
                        <Button type="primary" htmlType="submit">
                            {modalInfo?.buttonText}
                        </Button>
                    </Row>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default AddEmployeeModal;

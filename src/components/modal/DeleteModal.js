import React from 'react';
import {Modal} from "antd";

function DeleteModal({ modalVisible, onDeleteModalClose, handleDelete}) {
    return (
        <Modal
            forceRender
            title="Çalışan Sil"
            centered
            open={modalVisible}
            okText="Sil"
            cancelText="İptal"
            onOk={handleDelete}
            onCancel={onDeleteModalClose}
        >
            <p>Silmek İstediğinize Emin Misiniz?</p>
        </Modal>
    );
}

export default DeleteModal;

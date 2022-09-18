import React from 'react';
import { render,screen,waitFor } from '@testing-library/react';
import DeleteModal from "../../../components/modal/DeleteModal";
import '@testing-library/jest-dom';

describe('DeleteModal.js', ()=>{
    it('renders delete modal', async () => {
        const { getByText } = render(
            <DeleteModal
                modalVisible
            />
        );
        await waitFor(() => expect(getByText('Silmek İstediğinize Emin Misiniz?')).toBeInTheDocument());

        //second way to do the same way with this test
        // const deleteModalText = screen.getByText('Silmek İstediğinize Emin Misiniz?',{exact:false});
        // expect(deleteModalText).toBeInTheDocument();
    });
})

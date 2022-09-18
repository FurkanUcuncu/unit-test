import React from 'react';
import { render,screen,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddEmployeeModal from "../../../components/modal/AddEmployeeModal";
import ReduxProvider from "../../store/reduxProvider";

describe('AddEmployeeModal.js', ()=>{
    window.matchMedia = window.matchMedia || function () {
        return {
            addListener: jest.fn(),
            removeListener: jest.fn(),
        };
    };
    it('renders add employee modal', async () => {
        const state = {
            employee:{
                departments:[],
            }
        };
        const mockFn = jest.fn();
        const props = {
            modalVisible:true,
            onFinish:mockFn,
            onClose:mockFn,
            modalInfo:{isEdit:false,title:"Çalışan Ekleme",buttonText:"Ekle"}
        }
        const { getByText } = render(
            <ReduxProvider reduxState={state}>
                <AddEmployeeModal {...props} />
            </ReduxProvider>
        );
        await waitFor(() => expect(getByText('Ekle',{exact:true})).toBeInTheDocument());
    });

    it('renders edit employee modal', async () => {
        const state = {
            employee:{
                departments:[],
            }
        };
        const mockFn = jest.fn();
        const props = {
            modalVisible:true,
            onFinish:mockFn,
            onClose:mockFn,
            modalInfo:{isEdit:true,title:"Çalışan Güncelleme",buttonText:"Güncelle"}
        }
        const { getByText } = render(
            <ReduxProvider reduxState={state}>
                <AddEmployeeModal {...props} />
            </ReduxProvider>
        );
        await waitFor(() => expect(getByText('Güncelle',{exact:true})).toBeInTheDocument());
        // await waitFor(() => expect(getByText('Departman',{exact:true})).toBeInTheDocument());
    });
})

import React from 'react';
import App from '../App';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import ReduxProvider from "./store/reduxProvider";
import userEvent from "@testing-library/user-event";

describe('App.js', ()=>{
  it('renders without crashing', async () => {
    const state = {
      employee:{
        employees:[],
        departments:[],
        messageText:"",
      }
    };
    render(
        <ReduxProvider reduxState={state}>
          <App/>
        </ReduxProvider>
    )
  });

  it('renders add employee modal after clicking add button', async () => {
    const state = {
      employee:{
        employees:[],
        departments:[],
        messageText:"",
      }
    };
    await render(
        <ReduxProvider reduxState={state}>
          <App/>
        </ReduxProvider>
    );

    try{
      const addButton = await screen.getByText('Çalışan Ekle');
      fireEvent.click(addButton);

      const modalTitle = await screen.queryByText('Çalışan Ekleme');
      await expect(modalTitle).toBeInTheDocument();
    }
    catch(error){
      throw error
    }
  });

  it('renders edit employee modal after clicking edit button', async () => {
    const state = {
      employee:{
        employees:[
          {
            "id": 1,
            "fullname": "Alpay Durmaz",
            "email": "alpay.durmaz@yapikredi.com.tr",
            "maritalStatus": true,
            "departmentId": 1
          },
        ],
        departments:[],
        messageText:"",
      }
    };
    render(
        <ReduxProvider reduxState={state}>
          <App/>
        </ReduxProvider>
    );

    // try{
      const editButton = await screen.getByTestId('editBtn');
      fireEvent.click(editButton);

      const modalTitle = await screen.queryByText('Çalışan Güncelleme');
      await expect(modalTitle).toBeInTheDocument();
    // }
    // catch(err){
    //   console.log(err)
    // }
  });
})

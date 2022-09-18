import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchDepartments, fetchEmployees} from "./store/employeeSlice";
import 'antd/dist/antd.css'
import {Button, Table} from "antd";
import {employeeService} from "./service/employeeService";
import {Layout} from "antd";
import AddEmployeeModal from "./components/modal/AddEmployeeModal";
import DeleteModal from "./components/modal/DeleteModal";
import axios from "axios";

const { Content } = Layout;

function App() {
  const dispatch = useDispatch()

  const {employees,departments,messageText} = useSelector(state=>state?.employee)

  const [openModalVisible,setOpenModalVisible] = useState(false)
  const [deleteModalVisible,setDeleteModalVisible] = useState(false)

  const [modalInfo,setModalInfo] = useState(null)
  const [currentEmployee,setCurrentEmployee] = useState(null)

  const [formValues,setFormValues] = useState(null)

  const columns = [
    {
      title: 'Ad',
      dataIndex: 'fullname',
      key: 'index',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'index',
    },
    {
      title: 'Medeni Durum',
      dataIndex: 'maritalStatus',
      key: 'index',
    },
    {
      title: 'Departman',
      dataIndex: 'departmentId',
      key: 'index',
      render:(_,__,index)=><div>{departments.map((i)=> {
        if(i.id === employees[index]?.departmentId){
          return (i.title)
        }
      })}</div>
    },
    {
      title: 'İşlem',
      dataIndex: 'index',
      key: 'index',
      render: (_,__,index) => <Button data-testid="editBtn" onClick={()=>onModalOpen({index,isEdit:true})} type="primary">Güncelle</Button>,
    },
    {
      title: 'İşlem',
      dataIndex: 'index',
      key: 'index',
      render: (_,__,index) => <Button onClick={()=>onDeleteModalOpen(index)} type="danger">Sil</Button>,
    },
  ];

  const onFinish = async (values) => {
    let maritalStatus = values.maritalStatus === "1"
    if(modalInfo.isEdit){
      employeeService.updateEmployee({...values,id:currentEmployee.id,maritalStatus}).then(res=> {
        getEmployees()
        onModalClose()
      })
    }
    else{
      employeeService.addEmployee({...values,id:Math.random(),maritalStatus}).then(res=>{
        getEmployees()
        onModalClose()
      })
    }

  };

  const onDeleteModalOpen = (index) => {
    setCurrentEmployee(employees[index])
    setDeleteModalVisible(true)
  }

  const onDeleteModalClose = () => {
    setDeleteModalVisible(false)
  }

  const handleDelete = () => {
    employeeService.deleteEmployee({id:currentEmployee.id}).then(res=> {
      onDeleteModalClose()
      getEmployees()
    })

  }

  const resetForm = () => {
    setFormValues({fullname:null,email:null,maritalStatus:null,departmentId:null})
  }

  const onModalClose = () => {
    setOpenModalVisible(false)
    resetForm()
  };

  const onModalOpen = ({index, isEdit}) => {
    setOpenModalVisible(true)
    if(isEdit){
      setModalInfo({isEdit:true,title:"Çalışan Güncelleme",buttonText:"Güncelle"})
      let currEmp = employees[index]
      setCurrentEmployee(currEmp)
      setFormValues({...currEmp,maritalStatus:currEmp.maritalStatus === "Evli" ? "1" : "0"})
    }
    else{
      resetForm()
      setModalInfo({isEdit:false,title:"Çalışan Ekleme",buttonText:"Ekle"})
    }
  }

  const getEmployees = () => {
    dispatch(fetchEmployees())
  }

  useEffect(()=>{
    getEmployees()
    dispatch(fetchDepartments())
  },[dispatch])

  // useEffect(()=>{
  //     axios({
  //         method: 'get',
  //         url: 'http://localhost:3001',
  //         headers:{
  //             "Content-Type": "application/json",
  //             "Accept": "application/json",
  //         }
  //     }).then(res=>console.log(res))
  // },[employees])
  return (
      <React.Suspense fallback={<h1>LOADING...</h1>}>
        <Content style={{margin:'20px'}}>
          <Button
              onClick={onModalOpen}
              type="primary"
              style={{
                marginBottom: 16,
              }}
          >
            Çalışan Ekle
          </Button>
          {
            employees.length === 0 ?
                <div>{messageText}</div>
                :
                <Table rowKey="email" dataSource={employees} columns={columns} />
          }
          <AddEmployeeModal
              formValues={formValues}
              onClose={onModalClose}
              modalVisible={openModalVisible}
              modalInfo={modalInfo}
              onFinish={onFinish}
          />
          <DeleteModal
              modalVisible={deleteModalVisible}
              onDeleteModalClose={onDeleteModalClose}
              handleDelete={handleDelete}
          />
        </Content>
      </React.Suspense>
  );
}

export default App;

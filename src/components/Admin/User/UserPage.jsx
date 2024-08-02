import { Col, Pagination, Popconfirm, Row, Space, Table } from "antd"
import InputSearch from "./InputSearch";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { callFetchListUser } from "../../../services/api";

const UserPage = () => {

    const [dataUsers, setDataUsers] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)
    const [loadingTable, setLoadingTable] = useState(false)

    useEffect(() => {
        fetchUsers()
    }, [current, pageSize])

    const fetchUsers = async () => {

        setLoadingTable(true)
        const res = await callFetchListUser(current, pageSize)
        console.log("res user: ", res);
        if(res && res.data){
            setDataUsers(res.data.result)
            setTotal(res.data.meta.total)
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
        }
        setLoadingTable(false)
    }

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render: (_, record, index) => {
              console.log("index: ", index+1);
              return (
                <>
                  {(index+1) + (current - 1) * pageSize}
                </>
              )
            } 
        },
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: true,
            key: '_id',
            render: (_, record) => {
                return (
                <>
                    <a onClick={() => {
                    // setIsDetailOpen(true)
                    // setDataDetail(record)
                    alert(record._id)
                    }}>
                        {record._id}
                    </a>
                </>
                )
            } 
        },
        {
            title: 'Tên hiển thị',
            dataIndex: 'fullName',
            sorter: true
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'phone',
            sorter: true
        }, 
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (          
                <Space size="middle">
      
                  <EditOutlined style={{color: "orange"}} onClick={() => {
                    console.log("record update: ", record);
                    // setIsModalUpdate(true)
                    // setDataUpdate(record)
                  }} /> 
      
                <Popconfirm
                    title="Xoá user"
                    description="Bạn có chắc chắn muốn xoá?"
                    onConfirm={() => {alert("xoá")}}
                    onCancel={cancelXoa}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined style={{color: "red"}} />
                  </Popconfirm>
                  
                </Space>
              ),
        },        
      ];
      const data = [
        {
            key: '1',
            name: 'John Brown',
            chinese: 98,
            math: 60,
            english: 70,
        },
        {
            key: '2',
            name: 'AJim Green',
            chinese: 98,
            math: 66,
            english: 89,
        },
        {
            key: '3',
            name: 'GJoe Black',
            chinese: 98,
            math: 90,
            english: 70,
        },
        {
            key: '4',
            name: 'MJim Red',
            chinese: 88,
            math: 99,
            english: 89,
        },
    ];

    const cancelXoa = (e) => {
        console.log(e);
        message.error('Huỷ xoá');
      };    

    const onChangePagination = (page, pageSize) => {
        setCurrent(page);
        setPageSize(pageSize);
    };


    return (
       <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <InputSearch />
                </Col>
                <Col span={24}>
                    <Table
                        rowKey={"_id"} 
                        className='def'
                        columns={columns}
                        dataSource={dataUsers}
                        // onChange={onChange}
                        // pagination={{
                        //     current: current,
                        //     pageSize: pageSize,
                        //     showSizeChanger: true,
                        //     total: total,
                        //     showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                        // }}
                        pagination={false}  // Tắt phân trang mặc định của Table
                        loading={loadingTable}
                    />
                    <br />
                    <Pagination
                        current={current}
                        pageSize={pageSize}
                        total={total}
                        onChange={onChangePagination}  // Gọi hàm onChangePagination khi thay đổi trang
                        showSizeChanger={true}
                        showQuickJumper={true}
                        showTotal={(total, range) => (
                            <div>{range[0]}-{range[1]} trên {total} tài khoản</div>
                        )}
                    />
                </Col>
            </Row>
       </>
    )
}

export default UserPage
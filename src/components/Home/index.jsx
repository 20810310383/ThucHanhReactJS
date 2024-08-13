import { FilterTwoTone, ReloadOutlined } from "@ant-design/icons"
import { Button, Checkbox, Col, Divider, Form, InputNumber, Pagination, Rate, Row, Spin, Tabs } from "antd"
import "./home.scss"
import { useEffect, useState } from "react"
import { callFetchBook, callFetchCategory } from "../../services/bookAPI"

const Home = () => {

    const [form] = Form.useForm()
    const [listCategory, setListCategory] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [sortQuery, setSortQuery] = useState("sort=-sold");
   
    const [dataBook, setDataBook] = useState(null)
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)

    const [loadingTable, setLoadingTable] = useState(false)
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const fetchCategory = async () => {
            const res = await callFetchCategory()
            if(res && res.data){
                const d = res.data.map(item => {
                    return { label: item, value: item }
                })
                console.log("d: ", d);                
                setListCategory(d);
            }
        }
        fetchCategory()
    },[])

    useEffect(() => {
        fetchListBook()
    }, [current, pageSize, filter, sortQuery])

    // dùng khi sắp xếp 
    const fetchListBook = async () => {
        setLoadingTable(true)
        let query = `current=${current}&pageSize=${pageSize}`;
        if (filter) {
            query += `&${filter}`;
        }
        if (sortQuery) {
            query += `&${sortQuery}`;
        }

        const res = await callFetchBook(query);
        console.log("res book: ", res);
        if (res && res.data) {
            setDataBook(res.data.result);
            setTotal(res.data.meta.total)
        }
        setLoadingTable(false)
    }

    console.log("listCategory: ",listCategory);
    const onFinish = (values) => {                
    }

    const onChange = (value) => {
        setSortQuery(value)
    }

    const items = [
        {
            key: "sort=-sold",
            label: `Phổ biến`,
            children: <></>,
        },
        {
            key: 'sort=-updatedAt',
            label: `Hàng Mới`,
            children: <></>,
        },
        {
            key: 'sort=price',
            label: `Giá Thấp Đến Cao`,
            children: <></>,
        },
        {
            key: 'sort=-price',
            label: `Giá Cao Đến Thấp`,
            children: <></>,
        },
    ];

    const onChangePagination = (page, pageSize,  sorter = null) => {
        console.log('Pagination Change:', { page, pageSize, sorter });
 
        setCurrent(page);
        setPageSize(pageSize);

        if (sorter && sorter.field) {
            const q = sorter.order === 'ascend' ? `sort=${sorter.field}` : `sort=-${sorter.field}`;
            setSortQuery(q);
        }
    };

    const handleOnchangePage = (pagination) => {
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current)
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize)
            setCurrent(1);
        }

    }

    return (
        <div style={{background: '#efefef', padding: "20px 0"}}>
            <div className="homepage-container" style={{ maxWidth: 1440, margin: '0 auto' }}>
                <Row gutter={[20, 20]}>
                    <Col md={4} sm={0} xs={0}>
                        <div style={{backgroundColor: "#fff", padding: "20px", borderRadius: "5px" }}>
                            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                <span> <FilterTwoTone />
                                    <span style={{ fontWeight: 500 }}> Bộ lọc tìm kiếm</span>
                                </span>
                                <ReloadOutlined title="Reset" onClick={() => form.resetFields()} />
                            </div>
                            <Divider                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   />
                            <Form
                                form={form}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    label={"Danh mục sản phẩm"}
                                    name="category"
                                    labelCol={{ span: 24 }}
                                >   
                                    <Checkbox.Group>
                                        <Row>
                                        {listCategory ? 
                                        <>
                                            {listCategory.map((item, index) => {
                                                return (
                                                    <Col span={24} key={`index-${index}`} style={{padding: "7px 0"}}>
                                                        <Checkbox value={item.value}>
                                                            {item.label}
                                                        </Checkbox>
                                                    </Col>
                                                )
                                            })}
                                        </>
                                        : "chưa có danh mục sản phẩm"
                                        }
                                        </Row>
                                    </Checkbox.Group>
                                </Form.Item>
                                <Divider />

                                <Form.Item
                                    label={"Khoảng giá"}
                                    labelCol={{ span: 24 }}
                                >   
                                    <Row gutter={[10, 10]} style={{ width: "100%" }}>
                                        <Col xl={11} md={24}>
                                            <Form.Item name={["range", 'from']}>
                                                <InputNumber
                                                    name="from"
                                                    min={0}
                                                    placeholder="đ TỪ"
                                                    style={{
                                                        width: "100%",
                                                    }}
                                                    formatter={value => 
                                                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                    }
                                                />
                                            </Form.Item>                                            
                                        </Col>

                                        <Col xl={2} md={0}>
                                            <div > - </div>
                                        </Col>

                                        <Col xl={11} md={24}>
                                            <Form.Item name={["range", 'to']}>
                                                <InputNumber
                                                    name="to"
                                                    min={0}
                                                    placeholder="đ ĐẾN"
                                                    style={{
                                                        width: "100%",
                                                    }}
                                                    formatter={value => 
                                                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                    }
                                                />
                                            </Form.Item>                                            
                                        </Col>
                                    </Row>
                                    <div>
                                        <Button onClick={() => form.submit()}
                                            style={{ width: "100%" }} type='primary'>Áp dụng</Button>
                                    </div>
                                </Form.Item>
                                <Divider />

                                <Form.Item
                                    label="Đánh giá"
                                    labelCol={{ span: 24 }}
                                >
                                    <div>
                                        <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                        <span className="ant-rate-text"></span>
                                        {/* <Rate defaultValue={1} /> */}
                                    </div>
                                    <div>
                                        <Rate value={4} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                        <span className="ant-rate-text">trở lên</span>
                                    </div>
                                    <div>
                                        <Rate value={3} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                        <span className="ant-rate-text">trở lên</span>
                                    </div>
                                    <div>
                                        <Rate value={2} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                        <span className="ant-rate-text">trở lên</span>
                                    </div>
                                    <div>
                                        <Rate value={1} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                        <span className="ant-rate-text">trở lên</span>
                                    </div>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>

                    <Col md={20} xs={24}>
                        <Spin spinning={isLoading} tip="Loading...">
                            <div style={{backgroundColor: "#fff", borderRadius: "5px", padding: "20px"}}>
                                <Row>
                                    <Tabs defaultActiveKey="sort=-sold" items={items} onChange={onChange} style={{ overflowX: "auto" }} />;
                                </Row>   
                                <Row className='customize-row'>
                                    {dataBook ? 
                                    <>
                                        {dataBook.map((item, index) => {
                                            return (
                                                <div className="column" key={`book-${index}`}>
                                                    <div className='wrapper'>
                                                        <div className='thumbnail'>
                                                            <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.thumbnail}`} alt="thumbnail book" />
                                                        </div>
                                                        <div className='text' title={item.mainText}>{item.mainText}</div>
                                                        <div className='price' style={{color: "red", fontWeight: "bold"}}>
                                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item?.price ?? 0)}
                                                        </div>
                                                        <div className='rating'>
                                                            <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
                                                            <span>Đã bán {item.sold}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </>
                                    :
                                    "chưa có sản phẩm"
                                    }               
                                </Row>   
                                <div style={{marginTop: 30}}></div>      
                                <Row>
                                <Pagination 
                                    style={{
                                        display: "flex",
                                        justifyContent: "center"
                                    }}
                                    responsive
                                    current={current}
                                    pageSize={pageSize}
                                    total={total}
                                    onChange={(p, s) => handleOnchangePage({ current: p, pageSize: s })} // Gọi hàm onChangePagination khi thay đổi trang
                                    // onChange={(page, pageSize) => onChangePagination(page, pageSize)}  // Gọi hàm onChangePagination khi thay đổi trang
                                    showSizeChanger={true}
                                    showQuickJumper={true}
                                    showTotal={(total, range) => (
                                        <div>{range[0]}-{range[1]} trên {total} tài khoản</div>
                                    )}
                                    locale={{
                                        items_per_page: 'dòng / trang',  // Điều chỉnh "items per page"
                                        jump_to: 'Đến trang số',  // Điều chỉnh "Go to"
                                        jump_to_confirm: 'Xác nhận',  // Điều chỉnh "Go"
                                        page: '',  // Bỏ hoặc thay đổi chữ "Page" nếu cần
                                    }}
                                />
                                </Row>       
                            </div>
                        </Spin>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Home
import { Badge, Descriptions, Drawer } from "antd";
import moment from "moment";

const ViewBook = (props) => {

    const {
        openDetailBook, setOpenDetailBook, dataDetailBook, setDataDetailBook
    } = props

    console.log("dataDetailBook: ", dataDetailBook);
    const onClose = () => {
        setOpenDetailBook(false);
        setDataDetailBook(null);
    };

    return (
        <Drawer
            title={`Xem chi tiết sản phẩm book`}
            placement="left"
            size={'large'}
            onClose={onClose}
            open={openDetailBook}
        >
            {dataDetailBook ? 
                    <>
                        <Descriptions title="Chức năng xem chi tiết" bordered column={2}>
                            <Descriptions.Item label="ID">{dataDetailBook._id}</Descriptions.Item>
                            <Descriptions.Item label="Tên sách">{dataDetailBook.mainText}</Descriptions.Item>
                            <Descriptions.Item label="Tác giả">{dataDetailBook.author}</Descriptions.Item>
                            <Descriptions.Item label="Giá tiền">{dataDetailBook.price}</Descriptions.Item>                            
                            <Descriptions.Item label="Thể loại" span={2}>
                                <Badge status="processing" text={dataDetailBook.category} />
                            </Descriptions.Item>
                            <Descriptions.Item label="Ngày tạo">{moment(dataDetailBook.createdAt).format('DD-MM-YYYY hh:mm:ss')}</Descriptions.Item>
                            <Descriptions.Item label="Ngày sửa">{moment(dataDetailBook.updatedAt).format('DD-MM-YYYY hh:mm:ss')}</Descriptions.Item>
                        </Descriptions>
                    </>
                    : <p>Không có dữ liệu</p>
                }
        </Drawer>
    )
}

export default ViewBook
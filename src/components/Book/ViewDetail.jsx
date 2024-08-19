import ImageGallery from "react-image-gallery";
import './book.scss'
import { useRef, useState } from "react";
import { Col, Divider, Rate, Row } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { BsCartPlus } from "react-icons/bs";
import ModalViewImage from "./ModalViewDetail";
import BookLoader from "./BookLoader";

const ViewDetail = (props) => {

    const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const refGallery = useRef(null);

    const {dataBook} = props

    const images1 = [
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
        },
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
        },
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
        },
    ];

    console.log("dataBook: ",dataBook);
    
    const images = dataBook?.items ?? [];

    const handleOnClickImage = () => {
        //get current index onClick
        // alert(refGallery?.current?.getCurrentIndex());
        setIsOpenModalGallery(true);
        setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0)
        // refGallery?.current?.fullScreen()
    }

    const onChange = (value) => {
        console.log('changed', value);
    };


    return (
        <div style={{ background: '#efefef', padding: "20px 0" }}>
            <div className='view-detail-book' style={{ maxWidth: 1800, margin: '0 auto', backgroundColor: "white", padding: "20px", borderRadius: "10px" }}>
                {dataBook && dataBook._id ?
                    <Row gutter={[20, 20]}>
                        <Col md={10} sm={0} xs={0}>
                            <ImageGallery                       
                                ref={refGallery}
                                items={images}
                                // showPlayButton={false} //hide play button
                                // showFullscreenButton={false} //hide fullscreen button
                                renderLeftNav={() => <></>} //left arrow === <> </>
                                renderRightNav={() => <></>}//right arrow === <> </>
                                slideOnThumbnailOver={true}  //onHover => auto scroll images
                                onClick={() => handleOnClickImage()}
                            />
                        </Col>

                        <Col md={14} sm={24} xs={0}>
                            <Col md={0} sm={24} xs={24}>
                                <ImageGallery
                                    ref={refGallery}
                                    items={images}
                                    showPlayButton={false} //hide play button
                                    showFullscreenButton={false} //hide fullscreen button
                                    renderLeftNav={() => <></>} //left arrow === <> </>
                                    renderRightNav={() => <></>}//right arrow === <> </>
                                    showThumbnails={false}
                                />
                            </Col>
                            <Col span={24}>
                                <div className='author'>Tác giả: <a href='#'>{dataBook?.author}</a></div>
                                <div className='title'>{dataBook.mainText}</div>
                                <div className='rating'>
                                    <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 12 }} />
                                    <Divider type="vertical" />
                                    <span className='sold'>Đã bán {dataBook.sold}</span>
                                </div>
                                <div className='price'>
                                    <span className='currency'>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataBook?.price ?? 0)}
                                    </span>
                                </div>
                                <div className='delivery'>
                                    <div>
                                        <span className='left'>Vận chuyển</span>
                                        <span className='right'>Miễn phí vận chuyển</span>
                                    </div>
                                </div>
                                <div className='quantity'>
                                        <span className='left'>Số lượng</span>
                                        <span className='right'>
                                            <button ><MinusOutlined /></button>
                                            <input defaultValue={1} />
                                            <button><PlusOutlined /></button>
                                        </span>
                                </div>
                                <div className='buy'>
                                    <button className='cart'>
                                        <BsCartPlus className='icon-cart' />
                                        <span>Thêm vào giỏ hàng</span>
                                    </button>
                                    <button className='now'>Mua ngay</button>
                                </div>
                            </Col>
                        </Col>
                    </Row>
                    :
                    <BookLoader />
                }
                <ModalViewImage 
                    isOpen={isOpenModalGallery}
                    setIsOpen={setIsOpenModalGallery}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    items={images}
                    title={dataBook?.mainText}
                />                
            </div>
        </div>
    )
}

export default ViewDetail
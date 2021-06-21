import React, { useEffect, useState } from 'react';
import { FaCode } from 'react-icons/fa';
import Axios from 'axios';
import { Icon, Col, Card, Row, Carousel } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import { continents } from './Sections/Datas';

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState();

  useEffect(() => {
    // 더보기버튼
    let body = {
      skip: Skip,
      limit: Limit,
    };
    getProducts(body);
  }, []);

  const getProducts = (body) => {
    Axios.post('/api/product/products', body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setProducts([...Products, ...response.data.productInfo]);
        } else {
          setProducts(response.data.productInfo);
        }
        setPostSize(response.data.postSize);
      } else {
        alert('상품들을 가져오는데 실패했습니다.');
      }
    });
  };

  const loadMoreHandler = () => {
    let skip = Skip + Limit;
    //              0   +   8
    //              8   +   8 이런순서

    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };

    getProducts(body);
    setSkip(skip);
  };

  const renderCards = Products.map((product, index) => {
    return (
      // 사이즈별로 반응형으로 움직일때 이미지 크키조정
      <Col lg={6} md={8} xs={24} key={index}>
        {/* antd의 Card를 사용 이미지를 인덱스 순서대로 가져오고 가격표시해줌 */}
        <Card
          // 이미지가 들어가는 위치
          cover={<ImageSlider images={product.images} />}
        >
          <Meta title={product.title} description={`${product.price}원`} />
        </Card>
      </Col>
    );
  });

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>
          메인화면
          <Icon type="rocket" />
        </h2>
      </div>

      {/* filter */}

      {/* CheckBox */}
      <CheckBox list={continents} />

      {/* RadioBox */}

      {/* search */}

      {/* cards */}
      {/* gutter 여백 */}
      <Row gutter={[16, 16]}>{renderCards}</Row>
      <br />

      {PostSize >= Limit && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={loadMoreHandler}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;

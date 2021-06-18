import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

const { TextArea } = Input;

const Continents = [
  { key: 1, value: '분류1' },
  { key: 2, value: '분류2' },
  { key: 3, value: '분류3' },
];

function UploadProductPage(props) {
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Price, setPrice] = useState(0);
  const [Continent, setContinent] = useState(1);
  const [Images, setImages] = useState([]);

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.currentTarget.value);
  };

  const priceChangeHandler = (event) => {
    setPrice(event.currentTarget.value);
  };

  const continentChangeHandler = (event) => {
    setContinent(event.currentTarget.value);
  };

  // fileUpload 에서 Images를 받아오고 이미지 state에다 넣어줌
  const updateImages = (newImages) => {
    setImages(newImages);
  };

  //
  const submitHandler = (event) => {
    // 확인버튼을 누를때 페이지 자동리프레쉬 방지
    event.preventDefault();

    // 유효성체크 모든창을 채우지 않을때
    if (!Title || !Description || !Price || !Continent || !Images) {
      return alert('모든 항목을 입력해 주세요.');
    }

    // 서버에 모든 값들을 request로 보낸다.

    // post request를 보내니까 body 가 있어야함
    const body = {
      // 로그인된 사람의 아이디
      writer: props.user.userData._id,
      title: Title,
      description: Description,
      price: Price,
      images: Images,
      continent: Continent,
    };
    // body로 backend로 보냄
    Axios.post('/api/product', body).then((response) => {
      if (response.data.success) {
        console.log('들어가랏!');
        alert('상품 등록에 성공 했습니다.');
        // 상품업로드가 성공하면 landingpage로 감
        props.history.push('/');
      } else {
        alert('상품 등록에 실패했습니다');
      }
    });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2>상품 등록</h2>
      </div>

      <Form onSubmit={submitHandler}>
        {/* DropZone */}
        <FileUpload refreshFunction={updateImages} />

        <br />
        <br />
        <label>이름</label>
        <Input onChange={titleChangeHandler} value={Title} />
        <br />
        <br />
        <label>설명</label>
        <TextArea onChange={descriptionChangeHandler} value={Description} />
        <br />
        <br />
        <label>가격(원)</label>
        <Input type="number" onChange={priceChangeHandler} value={Price} />
        <br />
        <br />
        <select onChange={continentChangeHandler} value={Continent}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {' '}
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <button type="submit">확인</button>
      </Form>
    </div>
  );
}

export default UploadProductPage;

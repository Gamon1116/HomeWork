import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import axios from 'axios';

function FileUpload(props) {
  const [Images, setImages] = useState([]);

  const dropHandler = (files) => {
    let formData = new FormData();

    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);

    axios.post('/api/product/image', formData, config).then((response) => {
      if (response.data.success) {
        // 아래콘솔은 response.data에 파일위치 및 이름정보가들어있음 그거확인용
        // console.log(response.data);
        setImages([...Images, response.data.filePath]);
        // 아래 delete부분과 같은개념으로 이미지를 업로드하거나 삭제할때 부모컴포넌트인 uploadproductpage.js 에 refresh하여
        // setImages(newImages) 로 와서 useState의 Images안에 저장되어 자식컴포넌트인 fileupload와 같게된다
        props.refreshFunction([...Images, response.data.filePath]);
      } else {
        alert('파일을 저장하는데 실패했습니다.');
      }
    });
  };

  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image);

    // console.log('currentIndex', currentIndex);
    // state에 있는 모든 이미지들을 새롭게 복사해줌
    let newImages = [...Images];
    //        지움    시작점,  몇개를 지울지
    newImages.splice(currentIndex, 1);
    // 삭제되고난 후 적용된 newImage 상태를 setImage(state)에 적용해줌
    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: 300,
              height: 240,
              border: '1px solid lightgray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontSize: '3rem' }} />
          </div>
        )}
      </Dropzone>

      <div
        style={{
          display: 'flex',
          width: '350px',
          height: '240px',
          overflowX: 'scroll',
        }}
      >
        {Images.map((image, index) => (
          <div onClick={() => deleteHandler(image)} key={index}>
            <img
              style={{ minWidth: '300px', width: '300px', height: '240px' }}
              src={`http://localhost:5000/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default FileUpload;

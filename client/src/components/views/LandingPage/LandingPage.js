import React, { useEffect } from 'react';
import { FaCode } from 'react-icons/fa';
import Axios from 'axios';

function LandingPage() {
  useEffect(() => {
    Axios.post('/api/product/products').then((response) => {
      if (response.data.success) {
        console.log(response.data);
      } else {
        alert('상품들을 가져오는데 실패했습니다.');
      }
    });
  }, []);
  return <div style={{ width: '75%', margin: '3rem auto' }}></div>;
}

export default LandingPage;

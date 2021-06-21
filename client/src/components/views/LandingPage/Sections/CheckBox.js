import React from 'react';
import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;

function CheckBox(props) {
  const [Checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    // 누른 상품의 index를 구하고
    const currentIndex = Checked.indexOf(value);

    // 전체 check된 state에서 현재누른 checkbox가 이미 있다면 (value가 없는값이면 -1이나옴)

    // 빼주고

    // state 넣어준다
  };

  const renderCheckboxLists = () =>
    props.list &&
    props.list.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox onChange={() => handleToggle(value._id)} checked={false} />
        <span>{value.name}</span>
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={['1']}>
        <Panel header="This is panel header 1" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
      ,
    </div>
  );
}

export default CheckBox;

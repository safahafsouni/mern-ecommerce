import React from 'react';
import { useSearch } from '../../context/search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from 'antd'; // Import Ant Design components
import { SearchOutlined } from '@ant-design/icons'; // Import search icon

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate('/search');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Input
          placeholder="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          style={{ width: 200, marginRight: '10px' }}
          suffix={<SearchOutlined />} // Search icon inside the input
        />
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchInput;

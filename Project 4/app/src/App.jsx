import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchResult from './components/SearchResult/SearchResult';

export const BASE_URL = "http://localhost:9000";
const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
    setLoading(true);

    try {
      const response = await fetch(BASE_URL);

      const json = await response.json();
      setData(json);
      setFilteredData(json);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };
    fetchFoodData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;

    if (searchValue === "") {
      setFilteredData(data);
    } else {
      const filtered = data?.filter(item => 
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const filterFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter((food) => 
      food.type.toLowerCase().includes(type.toLowerCase()))

    setFilteredData(filter);
    setSelectedBtn(type);
  };

  const filterBtns = [
    { name: "All", type: "all" },
    { name: "Breakfast", type: "breakfast" },
    { name: "Lunch", type: "lunch" },
    { name: "Dinner", type: "dinner" },
  ];

  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <>
  <Container>
    <TopContainer>
      <div className="logo">
        <img src="images/logo.svg" alt="logo" />
      </div>

      <div className="search">
        <input onChange={searchFood} placeholder="Search Food" type="text" />
      </div>
    </TopContainer>

    <FilterContainer>
      {filterBtns.map((value) => (
        <Button 
          isSelected={selectedBtn === value.type}
          key={value.type} 
          onClick={() => filterFood(value.type)}
          selected={selectedBtn === value.type}
        >
          {value.name}
        </Button>
      ))}
    </FilterContainer>

  </Container>
  <SearchResult data={filteredData} />
  </>
  )
};

export default App

export const Container = styled.div`
  min-width: 1200px;
  margin: 0 auto; 
`;

const TopContainer = styled.div`
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: #fff;
      height: 40px;
      font-size: 16px;
      border-radius: 5px;
      padding: 0 10px;
      &::placeholder {
        color: #fff;
      }
    }
  }
    @media (max-width: 768px) {
      flex-direction: column;
      height: 120px;
    }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  padding-bottom: 40px;
`;

export const Button = styled.button`
    background: ${props => props.isSelected ? "red" : "#ff4343"};
    outline: 1px solid ${props => props.isSelected ? "white" : "#ff4343"};
    border-radius: 5px;
    padding: 6px 12px;
    border: none;
    color: #fff;
    cursor: pointer;
    &: hover {
      background: red;
    }
`;
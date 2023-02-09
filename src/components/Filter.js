//import './Filter.css';
import { Form } from 'react-bootstrap';

function Filter({filterData, searchData}) {
  const filters = ['all', 'chick', 'meat', 'vegan', 'spicy']
  return (
    <div id="filter" className='border p-4 warning'>
        <Form.Label htmlFor="search">Search</Form.Label>
        <Form.Control type="search" id="search" onInput={searchData} />
        <br />
        {filters.map((type, ind) => (
          <Form.Check 
            key={ind}
            inline
            name='filter1'
            defaultChecked= {type==='all' ? 'checked' : ''}
            label={type.toLocaleUpperCase()}
            type='radio'
            onChange={() => {filterData(type)}}
          />))}
    </div>
  );
}

export default Filter;
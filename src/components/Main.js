//import './Main.css';
import { Container } from 'react-bootstrap';
import Filter from './Filter';
import Pizzas from './Pizzas';

function Main({data, addToOrder, filterData,searchData}) {
  return (
    <main className='py-4'>
      <Container>
        <Filter filterData={filterData} searchData={searchData} />
        <Pizzas data={data} addToOrder={addToOrder}/>
      </Container>
    </main>
  );
}

export default Main;
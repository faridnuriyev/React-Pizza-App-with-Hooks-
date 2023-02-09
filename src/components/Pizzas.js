//import './Pizzas.css';
import { Row } from 'react-bootstrap';
import Pizza from './Pizza';

function Pizzas({data,addToOrder}) {
  return (
    <div id="pizzas" className='py-4'>
        <Row xs={1} md={2} xl={4} className="g-4">
            {data?.map( pizza => (
                <Pizza pizza={pizza} key={pizza.id} addToOrder={addToOrder}/>
            ))}
        </Row>
    </div>
  );
}

export default Pizzas;
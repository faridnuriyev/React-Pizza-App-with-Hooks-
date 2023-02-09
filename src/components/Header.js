import './Header.css';
import { Badge, Button, Container } from 'react-bootstrap';
import { FaShoppingBasket } from 'react-icons/fa';

function Header({handleShow, order}) {
  return (
    <header className='bg-warning py-4 text-white'>
      <Container className='d-flex justify-content-between'>
        <h1>Little Nero's</h1>
        <Button variant="secondary" onClick={handleShow}>
          <FaShoppingBasket />
          <Badge pill bg="white text-dark align-top">{order.length}</Badge>
        </Button>
      </Container>
    </header>
  );
}

export default Header;
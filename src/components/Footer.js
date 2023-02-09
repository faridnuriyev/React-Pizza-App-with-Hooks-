import './Footer.css';
import { } from 'react-bootstrap';

function Footer() {
  let d = new Date();
  return (
    <footer className='bg-dark py-2 text-light'>
      <div className='text-center'>Copyright &copy; {d.getFullYear()} </div>
    </footer>
  );
}

export default Footer;
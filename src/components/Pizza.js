import './Pizza.css';
import { Button, Card, Col, Form } from 'react-bootstrap';
import { useState } from 'react';

function Pizza(props) {
    
        const [size,setSize] = useState({size: Object.keys(props.pizza.size)[0]})
    

    function sizeChange(e) {
        setSize( { size: e.target.value  } )  
    }   
        const {id,img, name, desc, size: sizeObj, price} = props.pizza;
        const path = 'assets/img/';
        return (
            <Col>
                <Card className='h-100'>
                    <Card.Img variant="top" src={path + img} />
                    <Card.Body className='simple__card'>
                      <div className='simple__text'>
                            <Card.Title>{name}</Card.Title>
                            <Card.Text>{desc}</Card.Text>
                      </div>
                        <div className='d-flex py-3'>
                        
                        <Form.Select onChange={sizeChange} aria-label="Default select example">
                            {Object.keys(sizeObj).map( key => (
                                <option key={key} value={key}>{sizeObj[key]}</option>
                            ) )}
                        </Form.Select>
                        <span className='w-50 text-end fs-3'>{price[size.size]}₼</span>                        
                        </div>
                    
                        <div className='text-center'>
                            <Button variant="warning" onClick={() => props.addToOrder(id,size,1)}>Sifariş et</Button>
                        </div>
                      
                    </Card.Body>
                </Card>
            </Col>
        );
    
}

export default Pizza;





// import './Pizza.css';
// import { Button, Card, Col, Form } from 'react-bootstrap';
// import { Component } from 'react';

// class Pizza extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             size: Object.keys(this.props.pizza.size)[0],
//         }
//         this.sizeChange = this.sizeChange.bind(this)
//     }

//     sizeChange(e) {
//         this.setState( { size: e.target.value  } )      
//     }


//     render(){
//         const {id,img, name, desc, size: sizeObj, price} = this.props.pizza;
//         const {size} = this.state;
//         const path = 'assets/img/';
//         return (
//             <Col>
//                 <Card>
//                     <Card.Img variant="top" src={path + img} />
//                     <Card.Body>
//                         <Card.Title>{name}</Card.Title>
//                         <Card.Text>{desc}</Card.Text>
//                         <div className='d-flex py-3'>
//                             <Form.Select onChange={this.sizeChange} aria-label="Default select example">
//                             {Object.keys(sizeObj).map( key => (
//                                 <option key={key} value={key}>{sizeObj[key]}</option>
//                             ) )}
//                             </Form.Select>
//                             <span className='w-50 text-end fs-3'>{price[size]}₼</span>
//                         </div>
//                         <div className='text-center'>
//                             <Button variant="warning" onClick={() => this.props.addToOrder(id,size,1)}>Sifariş et</Button>
//                         </div>
//                     </Card.Body>
//                 </Card>
//             </Col>
//         );
//     }
// }

// export default Pizza;
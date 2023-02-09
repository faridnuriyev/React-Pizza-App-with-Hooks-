import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Cart from './Cart';

function App() {
    const [data,setData] = useState(null)
    const [cs,setCs] = useState(false)
    const [order,setOrder] = useState([])
    const [newdata,setNewdata] = useState(data)
    
    useEffect(() => {
      fetch("pizza.json")
      .then(res => res.json())
      .then(result => setData(result.data));
    },[])
  
    useEffect(() => {
      setNewdata(data)
    }, [data])

  function searchData(e){
    setNewdata(data.filter(p => p.name.toLowerCase().includes(e.target.value.toLowerCase()))) 
  }

  function filterData(type){
    setNewdata(type === 'all' ? data : data?.filter(p => p[type])) 
  }


  function deleteOrder(id) {
    setOrder(order.filter(pizza => pizza.id !== id))
    
  }


function quantChange(id, quant){
      let newOrder = order.map(o => {
        if(o.id === id) o.quant = quant;
        return o;
      })
      setOrder(newOrder)
}


function addToOrder(id, size, quant) {
    let neworder = {
      id: id,
      size: size,
      quant: quant
    }
    const hasSameProduct = order.find((s) => s.id === id && s.size === size);
    if (hasSameProduct) {
      setOrder((prev) => {
        return prev.map((item) => {
          if (item.id === hasSameProduct.id) {
            return {
              ...item,
              quant: item.quant + 1,
            };
          }
          return item;
        });
      });
    } else {
      setOrder([...order, neworder]);
    }
  }

  function cartShow(par) {
    setCs(par)
  }

  const handleClose = () => cartShow(false);
  const handleShow = () => cartShow(true);

    
    return (
      <div id="App">
        <Header handleShow={handleShow} order={order} />
        <Main data={newdata} addToOrder={addToOrder} filterData={filterData} searchData={searchData} />
        <Footer />
        <Cart quantChange={quantChange} deleteOrder={deleteOrder} order={order} data={data} show={cs} handleClose={handleClose} />
      </div>
    );

}

export default App;

// import { useEffect, useState } from "react";
// import "./App.css";
// import Header from "./Header";
// import Main from "./Main";
// import Footer from "./Footer";
// import Cart from "./Cart";

// // const data = [
// //   { id: 1, name: 'Qril Çiken Parmezan', img: 'Grill-chicken-parmesan.png', size: { xs: 'mini, 15sm', sm: 'kichik, 23sm', md: 'orta, 30sm', lg: 'boyuk, 35sm' }, price: { xs: 5.5, sm: 11, md: 17, lg: 21 }, desc: 'Sarımsaqlı Parmezan sousu, Qril Toyuğu, Vetçina, Pomidor, Mozzarella Pendiri, Halapeno Bibəri', chick: true, meat: true, vegan: false, spicy: false },
// //   { id: 2, name: 'Amerikan Hot', img: 'american-hot.png', size: { xs: 'mini, 15sm', sm: 'kichik, 23sm', md: 'orta, 30sm', lg: 'boyuk, 35sm' }, price: { xs: 5.5, sm: 9, md: 14, lg: 19 }, desc: 'Pizza Sous, Mozzarella pendiri, Pepperoni və Halapenyo Bibəri', chick: false, meat: false, vegan: true, spicy: true  },
// //   { id: 3, name: 'Acılı Çiken Ranç', img: 'Spicy-chicken-ranch.png', size: { xs: 'mini, 15sm', sm: 'kichik, 23sm', md: 'orta, 30sm', lg: 'boyuk, 35sm' }, price: { xs: 5.5, sm: 11, md: 16, lg: 22 }, desc: 'Ranch Sousu, Toyuq Əti, Göbələklər,  Halapenyo Bibəri, Təzə Doğranmış Pomidorlar və Mozzarella Pendiri', chick: true, meat: false, vegan: false, spicy: true },
// //   { id: 4, name: 'Çiken Ranç', img: 'chicken_ranch.jpeg', size: { xs: 'mini, 15sm', sm: 'kichik, 23sm', md: 'orta, 30sm', lg: 'boyuk, 35sm' }, price: { xs: 5.5, sm: 10, md: 16, lg: 21 }, desc: 'Qril Toyuq, Pomidor, Ranç Sousu, Mozzarella Pendiri', chick: true, meat: false, vegan: false, spicy: false },
// //   { id: 5, name: 'Acılı Vegetarian', img: 'vegetarian-acili.png', size: { xs: 'mini, 15sm', sm: 'kichik, 23sm', md: 'orta, 30sm', lg: 'boyuk, 35sm' }, price: { xs: 5.5, sm: 9, md: 13, lg: 18 }, desc: 'Halapenyo Bibəri, Pomidor, Göbələk, Qara Zeytun, Yaşıl Bibər və Mozzarella Pendiri', chick: false, meat: false, vegan: true, spicy: true },
// //   { id: 6, name: 'Cheddar Dabl Burger', img: 'Cheddar-Dabl-Burger.png', size: { sm: 'kichik, 23sm', md: 'orta, 30sm', lg: 'boyuk, 35sm' }, price: { sm: 12, md: 20, lg: 25 }, desc: '1000 ada sousu, Mal əti, Pomidor, Mozzarella, Cheddar', chick: false, meat: true, vegan: false, spicy: true },
// //   { id: 7, name: 'Papa Miks', img: 'papamiks-sayt.png', size: { lg: 'boyuk, 35sm' }, price: { lg: 20 }, desc: 'Çiken BBQ, Hot&Spaysi, Marqarita, Klassik Pepperoni', chick: true, meat: false, vegan: false, spicy: true },
// //   { id: 8, name: 'Çiken Barbekyu', img: 'chicken_barbekyu.jpeg', size: { xs: 'mini, 15sm', sm: 'kichik, 23sm', md: 'orta, 30sm', lg: 'boyuk, 35sm' }, price: { xs: 5.5, sm: 10, md: 16, lg: 22 }, desc: 'Qril Toyuq, Göbələk, Barbekyu Sousu, Mozzarella Pendiri', chick: true, meat: false, vegan: false, spicy: true },
// //   { id: 9, name: 'Cheddar Çiken Club', img: 'Cheddar-Çiken-Club.png', size: { sm: 'kichik, 23sm', md: 'orta, 30sm', lg: 'boyuk, 35sm' }, price: { sm: 10, md: 16, lg: 21 }, desc: 'Qril toyuğu, Pomidor, Vetçina, Mozzarella, Cheddar, Ranç sousu', chick: true, meat: true, vegan: false, spicy: false }
// // ]

// function App() {
//   const [data, setData] = useState(null);
//   const [cs, setCs] = useState(false);
//   const [order, setOrder] = useState([]);
//   const [newdata, setNewdata] = useState(data);

//   const [pType, setPType] = useState(null);
//   const [pSearch, setPSearch] = useState(null);

//   useEffect(() => {
//     fetch("pizza.json")
//       .then((res) => res.json())
//       .then((result) => setData(result.data));
//   }, []);

//   useEffect(() => {
//     setNewdata(data);
//   }, [data]);

//   function searchData(e) {
//     const value = e.target.value;
//     setPSearch(value === "" ? null : value);
//     setNewdata(
//       data.filter((p) =>
//         (pType && p[pType]) && p.name.toLowerCase().includes(value.toLowerCase())
//       )
//     );
//   }

//   function filterData(type) {
//     setPType(type === "all" ? null : type);
//     if(pSearch) {
//       setNewdata(type === "all" ? data : data?.filter((p) => p.name.toLowerCase().includes(pSearch.toLowerCase()) && p[type]));
//     } else {
//       setNewdata(type === "all" ? data : data?.filter((p) => p[type]));
//     }
//   }

//   function deleteOrder(id) {
//     setOrder(order.filter((pizza) => pizza.id !== id));
//   }

//   function quantChange(id, quant) {
//     let newOrder = order.map((o) => {
//       if (o.id === id) o.quant = quant;
//       return o;
//     });
//     setOrder(newOrder);
//   }

//   function addToOrder(id, size, quant) {
//     let neworder = {
//       id: id,
//       size: size,
//       quant: quant,
//     };

//     const hasSameProduct = order.find((s) => s.id === id && s.size === size);
//     if (hasSameProduct) {
//       setOrder((prev) => {
//         return prev.map((item) => {
//           if (item.id === hasSameProduct.id) {
//             return {
//               ...item,
//               quant: item.quant + 1,
//             };
//           }
//           return item;
//         });
//       });
//     } else {
//       setOrder([...order, neworder]);
//     }
//   }

//   function cartShow(par) {
//     setCs(par);
//   }

//   const handleClose = () => cartShow(false);
//   const handleShow = () => cartShow(true);

//   return (
//     <div id="App">
//       <Header handleShow={handleShow} order={order} />
//       <Main
//         data={newdata}
//         addToOrder={addToOrder}
//         filterData={filterData}
//         searchData={searchData}
//       />
//       <Footer />
//       <Cart
//         quantChange={quantChange}
//         deleteOrder={deleteOrder}
//         order={order}
//         data={data}
//         show={cs}
//         handleClose={handleClose}
//       />
//     </div>
//   );
// }

// export default App;




// import { Component } from 'react';
// import './App.css';
// import Header from './Header';
// import Main from './Main';
// import Footer from './Footer';
// import Cart from './Cart';

// const data = [
//   { id: 1, name: 'Qril Çiken Parmezan', img: 'Grill-chicken-parmesan.png', size: { xs: 'mini, 15sm', sm: 'kichik, 23sm', md: 'orta, 30sm', lg: 'boyuk, 35sm' }, price: { xs: 5.5, sm: 11, md: 17, lg: 21 }, desc: 'Sarımsaqlı Parmezan sousu, Qril Toyuğu, Vetçina, Pomidor, Mozzarella Pendiri, Halapeno Bibəri', chick: true, meat: true, vegan: false, spicy: false },
//   { id: 2, name: 'Amerikan Hot', img: 'american-hot.png', size: { xs: 'mini, 15sm', sm: 'kichik, 23sm', md: 'orta, 30sm', lg: 'boyuk, 35sm' }, price: { xs: 5.5, sm: 9, md: 14, lg: 19 }, desc: 'Pizza Sous, Mozzarella pendiri, Pepperoni və Halapenyo Bibəri', chick: false, meat: false, vegan: true, spicy: true  },
//   { id: 3, name: 'Acılı Çiken Ranç', img: 'Spicy-chicken-ranch.png', size: { xs: 'mini, 15sm', sm: 'kichik, 23sm', md: 'orta, 30sm', lg: 'boyuk, 35sm' }, price: { xs: 5.5, sm: 11, md: 16, lg: 22 }, desc: 'Ranch Sousu, Toyuq Əti, Göbələklər,  Halapenyo Bibəri, Təzə Doğranmış Pomidorlar və Mozzarella Pendiri', chick: true, meat: false, vegan: false, spicy: true },
//   { id: 4, name: 'Çiken Ranç', img: 'chicken_ranch.jpeg', size: { xs: 'mini, 15sm', sm: 'kichik, 23sm', md: 'orta, 30sm', lg: 'boyuk, 35sm' }, price: { xs: 5.5, sm: 10, md: 16, lg: 21 }, desc: 'Qril Toyuq, Pomidor, Ranç Sousu, Mozzarella Pendiri', chick: true, meat: false, vegan: false, spicy: false },
//   { id: 5, name: 'Acılı Vegetarian', img: 'vegetarian-acili.png', size: { xs: 'mini, 15sm', sm: 'kichik, 23sm', md: 'orta, 30sm', lg: 'boyuk, 35sm' }, price: { xs: 5.5, sm: 9, md: 13, lg: 18 }, desc: 'Halapenyo Bibəri, Pomidor, Göbələk, Qara Zeytun, Yaşıl Bibər və Mozzarella Pendiri', chick: false, meat: false, vegan: true, spicy: true },
//   { id: 6, name: 'Cheddar Dabl Burger', img: 'Cheddar-Dabl-Burger.png', size: { sm: 'kichik, 23sm', md: 'orta, 30sm', lg: 'boyuk, 35sm' }, price: { sm: 12, md: 20, lg: 25 }, desc: '1000 ada sousu, Mal əti, Pomidor, Mozzarella, Cheddar', chick: false, meat: true, vegan: false, spicy: true },
//   { id: 7, name: 'Papa Miks', img: 'papamiks-sayt.png', size: { lg: 'boyuk, 35sm' }, price: { lg: 20 }, desc: 'Çiken BBQ, Hot&Spaysi, Marqarita, Klassik Pepperoni', chick: true, meat: false, vegan: false, spicy: true },
//   { id: 8, name: 'Çiken Barbekyu', img: 'chicken_barbekyu.jpeg', size: { xs: 'mini, 15sm', sm: 'kichik, 23sm', md: 'orta, 30sm', lg: 'boyuk, 35sm' }, price: { xs: 5.5, sm: 10, md: 16, lg: 22 }, desc: 'Qril Toyuq, Göbələk, Barbekyu Sousu, Mozzarella Pendiri', chick: true, meat: false, vegan: false, spicy: true },
//   { id: 9, name: 'Cheddar Çiken Club', img: 'Cheddar-Çiken-Club.png', size: { sm: 'kichik, 23sm', md: 'orta, 30sm', lg: 'boyuk, 35sm' }, price: { sm: 10, md: 16, lg: 21 }, desc: 'Qril toyuğu, Pomidor, Vetçina, Mozzarella, Cheddar, Ranç sousu', chick: true, meat: true, vegan: false, spicy: false }
// ]

// class App extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       cs: false,
//       order: [ ],
//       newdata: data
//     }
//     this.addToOrder = this.addToOrder.bind(this)
//     this.deleteOrder = this.deleteOrder.bind(this)
//     this.quantChange = this.quantChange.bind(this)
//     this.filterData = this.filterData.bind(this)
//     this.searchData = this.searchData.bind(this)

//     // this.incrementQty = this.incrementQty.bind(this)
//     // this.decreaseQty = this.decreaseQty.bind(this)

//   }

//   searchData(e){
//     this.setState({
//       newdata: data.filter(p => p.name.toLowerCase().includes(e.target.value.toLowerCase()))
//     })
//   }

//   filterData(type){
//     this.setState({
//       newdata : type === 'all' ? data : data.filter(p => p[type])
//     })
//   }


//   deleteOrder(id) {
//     this.setState(state => ({
//       ...state,
//       order:state.order.filter(pizza => pizza.id !== id)
        
//       })
//     )
//   }


// quantChange(id,quant){
//       let newOrder = this.state.order.map(o => {
//         if(o.id === id) o.quant = quant;
//         return o;
//       })
//       this.setState({
//         order: newOrder
//       })
// }

//   // incrementQty(id) {
//   //   this.setState(state => ({
//   //     ...state,
//   //     order: state.order.map(pizza => {
//   //       if (pizza.id === id) {
//   //         return {
//   //           ...pizza,
//   //           quant: pizza.quant + 1
//   //         }
//   //       }
//   //       return pizza;
//   //     })
//   //   }))
//   // }

//   // decreaseQty(id) {
//   //   this.setState(state => ({
//   //     ...state,
//   //     order: state.order.map(pizza => {
//   //       if (pizza.id === id && pizza.quant > 0) {
//   //         return {
//   //           ...pizza,
//   //           quant: pizza.quant - 1
//   //         }
//   //       }
//   //       return pizza;
//   //     })
//   //   }))
//   // }

//   addToOrder(id, size, quant) {
//     let neworder = {
//       id: id,
//       size: size,
//       quant: quant
//     }
//     this.setState(state => ({
//       order: [...state.order, neworder]
//     }));
//   }

//   cartShow(par) {
//     this.setState({ cs: par })
//   }

//   handleClose = () => this.cartShow(false);
//   handleShow = () => this.cartShow(true);

//   render() {
//     let {cs, order, newdata} = this.state
//     return (
//       <div id="App">
//         <Header handleShow={this.handleShow} order={order} />
//         <Main data={newdata} addToOrder={this.addToOrder} filterData={this.filterData} searchData={this.searchData} />
//         <Footer />

//         <Cart quantChange={this.quantChange} deleteOrder={this.deleteOrder} order={order} data={data} show={cs} handleClose={this.handleClose} />
//       </div>
//     );
//   }
// }

// export default App;


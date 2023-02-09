import { Button, CloseButton, Modal, Table } from "react-bootstrap";

function Cart({ order, data, show, handleClose, quantChange, deleteOrder }) {
  const path = "assets/img/";
    let total = 0;
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title>Sifariş</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table responsive="lg">
          <thead>
            <tr className="align-middle bg-warning">
              <th>№</th>
              <th>Şəkil</th>
              <th>Adı</th>
              <th>Ölçüsü</th>
              <th>Qiyməti</th>
              <th>Ədədi</th>
              <th>Yekun</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {order.map((items, ind) => {
              let { name, img, price, size } = data.find(
                (element) => element.id === items.id
              );
                total += price[items.size.size] * items.quant
              return (
                <tr className="align-middle" key={ind}>
                  <td>{ind + 1}</td>
                  <td>
                    <img className="thumb" src={path + img} alt="" />
                  </td>
                  <td>
                    <b>{name}</b>
                  </td>
                  <td>{size[items.size.size]}</td>
                  <td>{price[items.size.size]}₼</td>
                  <td>
                    <Button
                      size="sm"
                      onClick={() =>
                        quantChange(
                          items.id,
                          // items.size,
                          items.quant > 1 ? items.quant - 1 : items.quant
                        )
                      }
                      variant="outline-warning border-0"
                    >
                      ▼
                    </Button>
                    {items.quant}
                    <Button
                      size="sm"
                      onClick={() => quantChange(items.id, items.quant + 1)}
                      variant="outline-warning border-0"
                    >
                      ▲
                    </Button>
                  </td>
                  <td>
                    <b>{price[items.size.size] * items.quant}₼</b>
                  </td>
                  <td>
                    <CloseButton
                      aria-label="Delete"
                      onClick={() => deleteOrder(items.id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tbody>
          <tr className="align-middle fs-4 text-warning">
                  <td colSpan={5}></td>
                  <th>Total</th>
                  <td colSpan={2}> {total} ₼</td>
                </tr>

          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="warning" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Cart;

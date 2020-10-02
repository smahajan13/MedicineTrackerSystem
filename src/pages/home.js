import { Button, Input, Table } from 'reactstrap';
import React, { useEffect, useState } from 'react';

import AddMedicineModal from './components/addMedicineModal';
import { SearchStyle } from './style';
import { getMedicineList } from '../api/medicine';
import moment from 'moment';
import { withRouter } from "react-router-dom";

const MedicineRow = (props) => {
  const { id, fullName, brand, price, quantity, expiryDate } = props;

  const handleClick = () => {
    props.history.push(`/${fullName}/details`)
  }

  const expiry = moment(expiryDate).format("DD/MM/yyyy")
  let backgroundColor = ""
  if (quantity < 10) {
    backgroundColor = "yellow"
  }
  const expiryMoment = moment(expiryDate)
  const currentMoment = moment()
  if (expiryMoment.diff(currentMoment, 'days') < 30) {
    backgroundColor = "red"
  }
  return (
    <tr key={id} style={{ background: backgroundColor }} onClick={handleClick}>
          <th scope="row">{id}</th>
          <td>{fullName}</td>
          <td>{brand}</td>
          <td>{price}</td>
          <td>{quantity}</td>
          <td>{expiry}</td>
        </tr>
  )
}

const Home = props => {
  const [medicineList, setMedicineList] = useState([]);
  const [isOpenMedicineModal, setOpenMedicineModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getMedicineListApi()
  }, []);

  const getMedicineListApi = () => {
    getMedicineList().then(data => {
      console.log("getMedicineList data: ", data);
      setMedicineList(data.data);
    }).catch(error => {
      console.log("getMedicineList error: ", error);
    })
  }

  const closeAddMedicineModal = (isCallApi) => {
    setOpenMedicineModal(false)
    if (isCallApi)
      {
        getMedicineListApi()
      }
  }

  const openAddMedicineModal = () => {
    setOpenMedicineModal(true)
  }

  const handleTextChange = (event) => {
    setSearchText(event.target.value)
  }

  const filteredMedicineList = medicineList.filter(m => {
    const searchValue = searchText.toLowerCase()
    return m.fullName.toLowerCase().includes(searchValue)})

  return (
    <div>
       <span>
      <Button color="primary" onClick={openAddMedicineModal}>Add Medicine</Button>
      <Input style={SearchStyle} type="email" name="email" id="exampleEmail" placeholder="Search" value={searchText} onChange={handleTextChange} />
      <AddMedicineModal isOpen={isOpenMedicineModal} closeModal={closeAddMedicineModal} />
    </span>
      {filteredMedicineList.length > 0 ? <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Brand</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Expiry Date</th>
        </tr>
      </thead>
      <tbody>
        {filteredMedicineList.map(medicine => <MedicineRow {...medicine} history={props.history} />)}
      </tbody>
    </Table> : "No Data Found"}
    </div>
  );
};
export default withRouter(Home);

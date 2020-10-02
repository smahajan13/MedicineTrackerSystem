import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import React, {useState} from 'react';

import {addMedicine} from '../../api/medicine';
import moment from 'moment';

const AddMedicineModal = (props) => {
  const {isOpen, closeModal} = props;
  const [medicine, setMedicine] = useState({
    fullName: '',
  });
  const [error, setError] = useState('');

  const handleTextChange = (e) => {
    if (e.target.name) {
      const name = e.target.name;
      let value = e.target.value;

      if (name === 'expiryDate') {
        const expiryMoment = moment(value);
        const currentMoment = moment();
        if (expiryMoment.diff(currentMoment, 'days') < 15) {
          setError('Expiry Date less than 15 days is not allowed to add in the stock.');
          return;
        }
        if (expiryMoment.diff(currentMoment, 'days') < 30) {
          setError('Expiry Date is less than 30 days.');
        }
        else {
          setError("")
        }
      }

      setMedicine((prevValue) => {
        return {
          ...prevValue,
          [name]: value,
        };
      });
    }
  };

  const handleSave = () => {
    console.log('Data: ', medicine);
    if (
      medicine.fullName &&
      medicine.brand &&
      medicine.quantity &&
      medicine.price &&
      medicine.expiryDate
    ) {
      const expiryMoment = moment(medicine.expiryDate);
        const currentMoment = moment();
        if (expiryMoment.diff(currentMoment, 'days') < 15) {
          setError('Expiry Date less than 15 days is not allowed to add in the stock.');
          return;
        }
      console.log('Success');
      addMedicine({...medicine, quantity: Number(medicine.quantity)})
        .then((result) => {
          closeModal(true);
        })
        .catch((err) => {
          console.log('add medicine error: ', err);
        });
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen}>
        <ModalHeader toggle={closeModal}>Add Medicine</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="medicineName">Name</Label>
              <Input
                type="name"
                name="fullName"
                value={medicine.fullName}
                id="medicineName"
                placeholder="Name"
                onChange={handleTextChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="medicineBrand">Brand</Label>
              <Input
                type="name"
                name="brand"
                id="medicineBrand"
                placeholder="Brand"
                onChange={handleTextChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="medicinePrice">Price</Label>
              <Input
                type="number"
                name="price"
                id="medicinePrice"
                placeholder="Price"
                onChange={handleTextChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="medicineQuantity">Quantity</Label>
              <Input
                type="number"
                name="quantity"
                id="medicineQuantity"
                placeholder="Quantity"
                onChange={handleTextChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="medicineDate">Expiry Date</Label>
              <Input
                type="date"
                name="expiryDate"
                id="medicineDate"
                placeholder="Expiry Date"
                onChange={handleTextChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <p style={{color: 'red'}}>{error}</p>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>{' '}
          <Button color="secondary" onClick={closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddMedicineModal;

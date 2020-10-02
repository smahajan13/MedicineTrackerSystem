import React, { useEffect, useState } from 'react';

import { Button } from 'reactstrap';
import { getMedicineDetail } from '../api/medicine';
import moment from 'moment';
import { withRouter } from "react-router-dom";

const Details = props => {
  const [medicineData, setMedicineData] = useState(null);

  const fullName = props.match.params.id || "";

  useEffect(() => {
    getMedicineDetail(fullName).then(data => {
      console.log("getMedicineList data: ", data);
      setMedicineData(data.data)
    }).catch(error => {
      console.log("getMedicineList error: ", error);
    })
  }, []);

  const handleGoBack = () => {
    props.history.push("/")
  }

  return (
    <div>
       <span>
      <Button color="primary" onClick={handleGoBack}>Back</Button>
    </span>
    {medicineData && 
    <div>
      <p>{`Id: ${medicineData.id}`}</p>
      <p>{`Name: ${medicineData.fullName}`}</p>
      <p>{`Brand: ${medicineData.brand}`}</p>
      <p>{`Price: ${medicineData.price}`}</p>
      <p>{`Quantity: ${medicineData.quantity}`}</p>
      <p>{`Expiry Date: ${moment(medicineData.expiryDate).format("DD/MM/yyyy")}`}</p>
    </div>
    }
    </div>
  );
};
export default withRouter(Details);

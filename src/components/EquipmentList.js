import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import EquipmentService from "../services/equipment_service";

const EquipmentList = () => {
    const [equipment, setEquipment] = useState([]);

    useEffect( () => {
        getEquipmentList();
    })

    const getEquipmentList = async () => {
        const equipmentData = await EquipmentService.getAllEquipment();
        console.log('equipmentData:', equipmentData.docs);
        setEquipment(equipmentData.docs.map((doc) => ({...doc.data, id: doc.id})))
    }

    return (
        <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Muscle Groups</th>
            <th>Count</th>
          </tr>

        </thead>
        <tbody>
          {equipment.map((doc, idx) => {
            return (
                <tr key = {doc.id}>
                    <td>{doc.id}</td>
                    <td>{/*todo: add muscle groups*/}</td>
                    <td>{doc.count}</td>
                </tr>
            )
          })}
        </tbody>
      </Table>

    )
}
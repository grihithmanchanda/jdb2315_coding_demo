import React, { useEffect, useState } from "react";
import { Text, View } from 'react-native';
// import { Table } from "react-bootstrap"; // no longer using react-bootstrap
import EquipmentService from "../services/equipment_service";
import { collection } from "firebase/firestore"
import {firestoredb } from "../../firebase-config"
import {FlatList} from "react-native";

const EquipmentList = (props) => {
    const [equipment, setEquipment] = useState({'bar':'test'});
    const equipmentCollectionRef = collection(firestoredb, "equipment");

    useEffect( () => {
        getEquipmentList();
    }, []);

    // const renderItem = ({ item, index}) => {
    //     // <EquipmentList item = {item}/>
    //     <View key={item.id}>
    //         <Text> {item.count} </Text>
    //     </View>
    // }

    const getEquipmentList = async () => {
        console.log('getting equipment...');
        const equipmentQuery = await EquipmentService.getAllEquipment();
        if (equipmentQuery !== null) {
            equipmentData = equipmentQuery.docs.map((doc) => ({...doc.data(), id: doc.id}))
            setEquipment(equipmentData)  
            console.log('equipmentData', equipment);
        }
    }

    return (
        // <Table responsive striped bordered hover>
        //     <thead>
        //     <tr>
        //         <th>Name</th>
        //         <th>Muscle Groups</th>
        //         <th>Count</th>
        //     </tr>
        //     </thead>
            
        //     <tbody>
        //     {equipment.map((doc, idx) => {
        //         return (
        //             <tr key = {doc.id}>
        //                 <td>{doc.id}</td>
        //                 <td>{/*todo: add muscle groups*/}</td>
        //                 <td>{doc.count}</td>
        //             </tr>
        //         )
        //     })}
        //     </tbody>
        // </Table>

        // <FlatList style={{width: "100%"}}
        //     renderItem={renderItem}
        //     data={equipment}
        //     keyExtractor={item => item.id}
        //     keyboardShouldPersistTaps="handled"
        // />

        <></>

    )
}

export default EquipmentList;
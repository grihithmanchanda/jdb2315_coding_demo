import React, { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
// import { Table } from "react-bootstrap"; // no longer using react-bootstrap
import EquipmentService from "../services/equipment_service";
import { collection } from "firebase/firestore"
import {firestoredb } from "../../firebase-config"

const EquipmentList = (props) => {
    const [equipment, setEquipment] = useState({'bar':'test'});
    const equipmentCollectionRef = collection(firestoredb, "equipment");

    let tableHead= ['', 'Head1', 'Head2', 'Head3']
    let tableTitle= ['Title', 'Title2', 'Title3', 'Title4']
    let tableData= [
      ['1', '2', '3'],
      ['a', 'b', 'c'],
      ['1', '2', '3'],
      ['a', 'b', 'c']
    ]

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
            equipmentData = equipmentQuery.docs.map((doc) => ({data:doc.data(), id: doc.id}))
            setEquipment(equipmentData)  
            console.log('equipmentData', equipmentData);
        }
        console.log(equipment)
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

        // <></>

        <View style={styles.container}>
            <Table borderStyle={{borderWidth: 1}}>
            <Row data={tableHead} flexArr={[1, 2, 1, 1]} style={styles.head} textStyle={styles.text}/>
            <TableWrapper style={styles.wrapper}>
                <Col data={tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
                <Rows data={tableData} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text}/>
            </TableWrapper>
            </Table>
        </View>

    )

}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: {  height: 40,  backgroundColor: '#f1f8ff'  },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: {  height: 28  },
    text: { textAlign: 'center' }
  });

export default EquipmentList;
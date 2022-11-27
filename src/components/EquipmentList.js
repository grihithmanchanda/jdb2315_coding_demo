import React, { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
// import { Table } from "react-bootstrap"; // no longer using react-bootstrap
import EquipmentService from "../services/equipment_service";
import { collection } from "firebase/firestore"
import { firestoredb } from "../../firebase-config"

const EquipmentList = (props) => {
    const [tableRows, setTableRows] = useState([['a', 'b', 'c']])
    const tableHead = ['Name', 'Quantity', 'Muscle Groups']

    useEffect(() => {
        getEquipmentList();
    }, []);

    const getEquipmentList = async () => {
        console.log('getting equipment...');
        const equipmentQuery = await EquipmentService.getAllEquipment();
        if (equipmentQuery !== null) {
            setTableRows(generateTableRows(equipmentQuery))
        }
        console.log('---------')
        console.log(tableRows)
        console.log('---------')
    }

    return (
        <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 1 }}>
                <Row data={tableHead} flexArr={[2, 1, 2]} style={styles.head} textStyle={styles.text} />
                <TableWrapper style={styles.wrapper}>
                    <Rows data={tableRows} flexArr={[2, 1, 2]} style={styles.row} textStyle={styles.text} />
                </TableWrapper>
            </Table>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 28 },
    text: { textAlign: 'center' }
});

const generateTableRows = (equipmentQuery) => {
    equipmentData = equipmentQuery.docs.map((doc) => ({ data: doc.data(), id: doc.id }))
    return equipmentData.map((eq) => [eq.id, eq.data['count'], eq.data['muscle groups'].toString()])
}

export default EquipmentList;
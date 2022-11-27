import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
// import { Table } from "react-bootstrap"; // no longer using react-bootstrap
import EquipmentService from "../services/equipment_service";
import { Modal } from "../components/Modal";
import { CheckBox } from 'react-native-elements'

const EquipmentList = (props) => {
    const [tableRows, setTableRows] = useState([['a', 'b', 'c']])
    const [modalVisible, setModalVisible] = useState(false)
    const tableHead = ['Name', 'Quantity', 'Muscle Groups']
    const [eqName, setEqName] = useState('')
    const [eqQuantity, setEqQuantity] = useState("0")
    const [biceps, setBiceps] = useState(false)
    const [triceps, setTriceps] = useState(false)
    const [back, setBack] = useState(false)
    const [chest, setChest] = useState(false)
    const [legs, setLegs] = useState(false)
    const [abs, setAbs] = useState(false)


    useEffect(() => {
        getEquipmentList();
        // addEquipmentTest();
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

    const addEquipmentTest = async() => {
        console.log('testing add equipment...');
        const equipmentQuery = await EquipmentService.addEquipment('test equipment 1', 0, ['abs', 'wrist'])
            .catch((error) => {
                console.log('adding equipment failed!')
                console.log(error)
            })
        if (equipmentQuery !== null) {
            console.log('added equipment!')
        }
    }

    return (
        <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 1 }}>
                <Row data={tableHead} flexArr={[2, 1, 2]} style={styles.head} textStyle={styles.text} />
                <TableWrapper style={styles.wrapper}>
                    <Rows data={tableRows} flexArr={[2, 1, 2]} style={styles.row} textStyle={styles.text} />
                </TableWrapper>
            </Table>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.buttonText}>Add Equipment</Text>
            </TouchableOpacity>
            <Modal isVisible={modalVisible}>
                <Modal.Container>
                <Modal.Header title="Add Equipment" />
                <Modal.Body>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => {
                            setModalVisible(false)
                            }}>
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalText}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. dumbbell"
                        keyboardType="default"
                        onChangeText={(val) => setEqName(val)}
                    />
                    <Text style={styles.modalText}>Muscle groups</Text>
                    <View style={styles.checkboxWrapper}>
                        <CheckBox
                            checked={biceps}
                            title="Biceps"
                            onPress={() => setBiceps(!biceps)}
                        />
                        <CheckBox
                            checked={triceps}
                            title="Triceps"
                            onPress={() => setTriceps(!triceps)}
                        />
                        <CheckBox
                            checked={back}
                            title="Back"
                            onPress={() => setBack(!back)}
                        />
                        <CheckBox
                            checked={chest}
                            title="Chest"
                            onPress={() => setChest(!chest)}
                        />
                        <CheckBox
                            checked={legs}
                            title="Legs"
                            onPress={() => setLegs(!legs)}
                        />
                        <CheckBox
                            checked={abs}
                            title="Abs"
                            onPress={() => setAbs(!abs)}
                        />
                    </View>
                    <Text style={styles.modalText}>Quantity</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. 5"
                        keyboardType="default"
                        onChangeText={(val) => setEqQuantity(val)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        handleAddEquipment(eqName, eqQuantity, biceps, triceps, back, chest, legs, abs)
                        setModalVisible(false)
                        getEquipmentList()
                        }}>
                        <Text style={styles.buttonText}>Add Equipment</Text>
                    </TouchableOpacity>
                </Modal.Footer>
                </Modal.Container>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 28 },
    text: { textAlign: 'center' },
    modalText : { textAlign: "center", marginTop: 20 },
    button: {
        display: 'flex',
        marginTop: 20,
        height: 60,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#2AC062',
        shadowColor: '#2AC062',
        shadowOpacity: 0.5,
        shadowOffset: { 
          height: 10, 
          width: 0 
        },
        shadowRadius: 25,
      },
    backButton: {
        display: 'flex',
        marginTop: 20,
        height: 30,
        borderRadius: 6,
        justifyContent: 'left',
        alignItems: 'left',
        width: '15%',
        backgroundColor: '#2AC062',
        shadowColor: '#2AC062',
        shadowOpacity: 0.5,
        shadowOffset: { 
          height: 10, 
          width: 0 
        },
        shadowRadius: 25,
      },
    input: {
        paddingTop: 10,
        borderColor: "grey",
        borderBottomWidth: 2,
    },
    checkboxWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        display: "flex",
        flexWrap: "wrap",
    },
});

const generateTableRows = (equipmentQuery) => {
    equipmentData = equipmentQuery.docs.map((doc) => ({ data: doc.data(), id: doc.id }))
    return equipmentData.map((eq) => [eq.id, eq.data['count'], eq.data['muscle groups'].toString()])
}

const handleAddEquipment = (eqName, eqQuantity, biceps, triceps, back, chest, legs, abs) => {
    muscleGroups = []
    if (biceps) {
        muscleGroups.push('biceps')
    }
    if (triceps) {
        muscleGroups.push('triceps')
    }
    if (back) {
        muscleGroups.push('back')
    }
    if (chest) {
        muscleGroups.push('chest')
    }
    if (legs) {
        muscleGroups.push('legs')
    }
    if (abs) {
        muscleGroups.push('abs')
    }

    EquipmentService.addEquipment(eqName, eqQuantity, muscleGroups)
}

export default EquipmentList;
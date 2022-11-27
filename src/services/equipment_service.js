import { auth, firestoredb } from "../../firebase-config"
import { collection, doc, getDocs, setDoc } from "firebase/firestore"

const equipmentCollectionRef = collection(firestoredb, "equipment");

class EquipmentService {
    getAllEquipment = async () => {
        return getDocs(equipmentCollectionRef)
    };

    addEquipment = async(equipmentName, equipmentCount, equipmentMuscleGroups) => {
        equipmentData = {
            // 'id': equipmentName,
            'count': equipmentCount,
            'muscle groups': equipmentMuscleGroups
        }
        equipmentDoc = doc(firestoredb, 'equipment', equipmentName)
        return setDoc(equipmentDoc, equipmentData);
    }
}

export default new EquipmentService();
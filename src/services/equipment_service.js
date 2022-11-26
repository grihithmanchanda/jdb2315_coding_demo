import { auth, firestoredb } from "../../firebase-config"
import { collection, getDocs } from "firebase/firestore"

const equipmentCollectionRef = firestoredb.collection("equipment");

class EquipmentService {
    getAllEquipment = async () => {
        return getDocs(equipmentCollectionRef)
    };
}

export default new EquipmentService();
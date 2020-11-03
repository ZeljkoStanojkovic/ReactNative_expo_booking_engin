import { AsyncStorage } from "react-native";
class UtilService {
  

  static async saveLocalStringData(key, strValue) {
    await AsyncStorage.setItem("@tripshop:" + key, strValue);
    return true;
  }

  static async saveLocalObjectData(key, obj) {
    await AsyncStorage.setItem("@tripshop:" + key, JSON.stringify(obj));
  }

  static async getLocalStringData(key) {
    let ret = await AsyncStorage.getItem("@tripshop:" + key);

    return ret;
  }

  static async getLocalObjectData(key) {
    let ret = await AsyncStorage.getItem("@tripshop:" + key);
    if (ret != null) {
      return JSON.parse(ret);
    } else {
      return null;
    }
  }

  static async removeLocalObjectData(key) {
    let ret = await AsyncStorage.removeItem("@tripshop:" + key);
    return true;
  }

  static async getImageRawData(filePath) {
    return await Expo.FileSystem.readAsStringAsync(filePath, {encoding:Expo.FileSystem.EncodingTypes.Base64})
  }

  static validateEmail(mail) {
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
      return (true)
    }
    return (false)
  }

  static priceFormat(price, decimal) {
    if(!price) return ''
    return price.toLocaleString('en-US', {minimumFractionDigits: (decimal||0)})
  }

  static makePaxInfo(rooms) {
    var getItems = (room) => {
      var items = []
      items.push({
        "Type": 0,
        "TypeString": "ADT",
        "Quantity": room.adults
      })

      for(var idx = 0 ; idx < room.children.length ; idx++) {
        items.push({
          "type": 1,
          "typeString": "CHD",
          "quantity": "1",
          "age":room.children[idx]
        })
      }

      return items
    }
    
    return rooms.map((room)=>{
      return {
        "Properties": {},
        "Flags": {},
        "Code": null,
        "Item": getItems(room),
        "Config": []
      } 
    })
  }
}

export default UtilService;

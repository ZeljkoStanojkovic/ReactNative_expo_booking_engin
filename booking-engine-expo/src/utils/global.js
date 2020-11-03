import cn from '@language/cn.json'
import en from '@language/en.json'

class global {
    constructor() {
      this.currentUser = null;
      this.countryCode = 'en'
      this.authToken = null
      this.basicAuthToken = null
      this.environment = {}
      this.searchToken = null
    }

    getLang(){
        switch (this.countryCode){
            case 'en':
                return en;
                break;
            case 'cn':
                return cn;
                break;
        }
        return en;
    }
}
  
export default new global();
  
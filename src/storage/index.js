// Storage 封裝
const STORAGE_KEY = "mall";

export default {
  //存儲值
  setItem(key, value, module_name) {
    if (module_name) {
      let val = this.getItem(module_name);
      val[key] = value;
      console.log(val);
      this.setItem(module_name, val);
    } else {
      let val = this.getStorage();
      val[key] = value;
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    }
  },
  // 獲取某key值下的屬性值 ex: user下的userName值
  getItem(key, module_name) {
    if (module_name) {
      let val = this.getItem(module_name);
      if (val) {
        console.log(val);
        console.log(val[key]);
        return val[key];
      }
    }
    return this.getStorage()[key];
  },
  getStorage() {
    // console.log(JSON.parse(window.sessionStorage.getItem(STORAGE_KEY)));
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || "{}");
  },
  clear(key, module_name) {
    let val = this.getStorage();
    if (module_name) {
      //選到有moduule裡的有指定的值然後把它砍掉
      delete val[module_name][key];
    } else {
      //沒有的話直接砍
      delete val[key];
    }
    //重新把值寫進去
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
  },
};

function dataForm(obj, array){
    let data = {};
    Object.entries(obj).forEach(([key, value]) => { 
      if(array.find(ind => ind == key)){
        data[key]=value;
      }
    })
    return data;
}

module.exports = dataForm;
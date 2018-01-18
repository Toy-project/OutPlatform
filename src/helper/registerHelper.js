export function getValueId(val) {
  if(val.indexOf("_btn") === -1){
    return val;
  }
  return val.substring(0, val.indexOf("_btn"));
}

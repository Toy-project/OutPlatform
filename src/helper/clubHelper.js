export function checkStatusComponent(props){
  if(props.isLoading){
    console.log('isLoading');
  } else if(props.error) {
    console.log('error');
  } else {
    return true;
  }

  return false;
}

export function checkEmptyData(data) {
  return Object.keys(data).length === 0 ? true : false;
}

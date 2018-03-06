export function isLoading(props) {
  if(props.isLoading) {
    return true;
  }

  return false;
}

export function isError(props) {
  if(props.error) {
    return true;
  }

  return false;
}

export function checkStatusComponent(props){
  if(props.isLoading){
    return false;
  } else if(props.error) {
    return false;
  } else {
    return true;
  }

  return false;
}

export function checkEmptyData(data) {
  return Object.keys(data).length === 0 ? true : false;
}


export function isNull(data) {
  if(data === null){
    return true;
  }

  return false;
}

export function isEmpty(data){
  if(data === ''){
    return true;
  }
  return false;
}

export function subStringLimitStringLength(target, max) {
  const element = document.getElementById(target);
  const limitation = document.getElementById(`${target}_limitation`);

  const length = element.value.length;
  const maxByte = max;
  let totalByte = 0;

  for(let i = 0; i < length; i++){
    let oneChar = element.value.charAt(i);
    if(escape(oneChar).length > 4){
      totalByte += 2;
    } else {
      totalByte++;
    }
  }

  if(totalByte > maxByte){
    // 허용되는 바이트까지 자르기
    return false;
  }

  limitation.innerHTML = `${totalByte}/200`;

  return true;
}

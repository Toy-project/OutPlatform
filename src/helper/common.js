export function isNull(data) {
  if(data === null){
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

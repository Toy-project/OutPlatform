import * as types from '../../actions/card/actionTypes';

const initial = [{
  img: "test",
  title: "단체명",
  contents: "저희 동아리는 광고 / 마케팅 동아리로써 다수의 공모전 입상 경험이 있습니다.",
  rating: 3,
},
{
  img: "test",
  title: "단체명",
  contents: "저희 동아리는 광고 / 마케팅 동아리로써 다수의 공모전 입상 경험이 있습니다.",
  rating: 3,
},
{
  img: "test",
  title: "단체명",
  contents: "저희 동아리는 광고 / 마케팅 동아리로써 다수의 공모전 입상 경험이 있습니다.",
  rating: 3,
},
{
  img: "test",
  title: "단체명",
  contents: "저희 동아리는 광고 / 마케팅 동아리로써 다수의 공모전 입상 경험이 있습니다.",
  rating: 3,
},
{
  img: "test",
  title: "단체명",
  contents: "저희 동아리는 광고 / 마케팅 동아리로써 다수의 공모전 입상 경험이 있습니다.",
  rating: 3,
},
{
  img: "test",
  title: "단체명",
  contents: "저희 동아리는 광고 / 마케팅 동아리로써 다수의 공모전 입상 경험이 있습니다.",
  rating: 3,
}
]

export default function Card(state = initial, action) {
  switch(action.type){
    case types.ADD_CARDS :
      return [
          ...state,
          {
            img: action.img,
            title: action.title,
            contents: action.contents,
            rating: action.rating,
          }
      ];
    default :
      return state;
  }
}

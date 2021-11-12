import { get_correct_currency } from '@utils/get_correct_currency.util.js';

export const get_user_order_html = ({ id, status, _products }) => {
  return `<div order>
<div title><p>id:${id} </p> <p>${new Date(+id.split('_')[1]).toLocaleString()}</p>  </div>
<div status>${status}</div>
<div products>${_products?.[0]?.map_join(
    (__) => `<div item><img src='${__?.image}'/> <p caption>${__?.name}</p></div> `
  )} </div>
<div total> <p caption>total</p> <p value>${get_correct_currency() + _products?.[1]}</p> </div>
</div>
`;
};

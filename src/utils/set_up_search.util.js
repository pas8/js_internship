import { use_debounce } from '@utils/use_debounce.util.js';
import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';

import closeSvg from '@svgs/close.svg';
import searchSvg from '@svgs/search.svg';

export const set_up_search = (
  [searchResultContainerNode, searchSvgContainerNode, searchInputNode],
  customSearchingMapFunc,
  addition_func
) => {
  searchInputNode.addEventListener(
    'input',
    use_debounce(
      async function () {
        searchSvgContainerNode.innerHTML = searchSvg;
        if (!this.value) return (searchResultContainerNode.style.display = 'none');
        const [res] = await use_xml_http_request(`search?${this.value}`);

        const resultsArr = JSON.parse(res).map_join(({ caption, arr }) =>
          !arr.length
            ? ''
            : `<div>
              <p>${caption}</p>
              ${
                !!customSearchingMapFunc
                  ? customSearchingMapFunc(arr, caption)
                  : arr.map_join(
                      ({ name, id, image }) =>
                        `<a href='${
                          caption.startsWith('C') ? '/pages/shop.html?category=' : '/pages/product_details.html?'
                        }${id}'>
                          ${image ? `<img src=${image} ></img>` : ''}
                          <p> ${name} </p> 
                        </a>`
                    )
              }
            </div>`
        );

        if (!resultsArr.length) return (searchResultContainerNode.style.display = 'none');
        searchSvgContainerNode.innerHTML = closeSvg;
        searchResultContainerNode.style.display = 'flex';

        searchResultContainerNode.innerHTML = resultsArr;
        addition_func && addition_func();
      },
      200,
      true
    )
  );
  searchSvgContainerNode.addEventListener('click', (e) => {
    if (!![...e.path]?.find((el) => el.classList?.[0] === 'closeSvg')) {
      searchInputNode.value = '';
      searchSvgContainerNode.innerHTML = searchSvg;
      searchResultContainerNode.style.display = 'none';

      return;
    }
    searchInputNode.focus();
  });
};

import { use_debounce } from '@utils/use_debounce.util.js';
import closeSvg from '@svgs/close.svg';
import searchSvg from '@svgs/search.svg';

export const set_up_search = (arr,[searchResultContainerNode, searchSvgContainerNode, searchInputNode]) => {
  searchInputNode.addEventListener(
    'input',
    use_debounce(
      function () {
        searchSvgContainerNode.innerHTML = searchSvg;
        if (!this.value) return (searchResultContainerNode.style.display = 'none');
        const resultsArr = arr.map_join(({ name, id, image }) => {
          return name.startsWith(this.value)
            ? `<a href='product_details.html?${id}'>
          <img src=${image} ></img>
          <p> ${name} </p> </a> `
            : '';
        });
        if (!resultsArr.length) return (searchResultContainerNode.style.display = 'none');
        searchSvgContainerNode.innerHTML = closeSvg;
        searchResultContainerNode.style.display = 'flex';

        searchResultContainerNode.innerHTML = resultsArr;
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

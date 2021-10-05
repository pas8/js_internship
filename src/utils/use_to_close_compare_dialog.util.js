export const use_to_close_compare_dialog = () => () => {
  const searchingDialogNode = document.querySelector('.compare-dialog');

  window.isCompareDialogOpen = false;
  searchingDialogNode.classList.add('compare-dialog--closed');
};
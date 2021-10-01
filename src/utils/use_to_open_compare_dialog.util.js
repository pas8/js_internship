


export const use_to_open_compare_dialog = () => () => {
  const compareDialogNode = document.querySelector('.compare-dialog');

  window.isCompareDialogOpen = true;
  compareDialogNode.classList.remove('compare-dialog--closed');
};

export const use_to_close_seacrhing_dialog = () => () => {
  const searchingDialogNode = document.querySelector('.searching-dialog');

  window.isSeacrhingDialogOpen = false;
  searchingDialogNode.classList.add('searching-dialog--closed');
};

export const use_to_open_seacrhing_dialog = () => () => {
const searchingDialogNode = document.querySelector('.searching-dialog');

  window.isSeacrhingDialogOpen = true;
  searchingDialogNode.classList.remove('searching-dialog--closed');
};

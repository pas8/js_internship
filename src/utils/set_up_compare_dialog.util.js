import { use_to_close_compare_dialog } from '@utils/use_to_close_compare_dialog.util.js';
import { use_to_open_compare_dialog } from '@utils/use_to_open_compare_dialog.util.js';

export const set_up_compare_dialog = () => {
  window.isCompareDialogOpen = false;

  const closeButtonOfCompareingDialogNode = document.querySelector('.compare-content__title-close-button');
  const buttonCompareNode = document.querySelector('.button-compare');

  const handleCloseDialog = use_to_close_compare_dialog();
  const handleOpenDialog = use_to_open_compare_dialog();

  buttonCompareNode.addEventListener('click', () => {
    if (window.isSeacrhingDialogOpen) return handleCloseDialog();
    handleOpenDialog();
  });

  closeButtonOfCompareingDialogNode.addEventListener('click', handleCloseDialog);
};

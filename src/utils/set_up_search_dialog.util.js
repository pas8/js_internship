import { use_to_close_seacrhing_dialog } from '@utils/use_to_close_seacrhing_dialog.util.js';
import { use_to_open_seacrhing_dialog } from '@utils/use_to_open_seacrhing_dialog.util.js';
import { set_up_search } from '@utils/set_up_search.util.js';

export const set_up_search_dialog = () => {
  window.isSeacrhingDialogOpen = false;


  const closeButtonOfSearchingDialogNode = document.querySelector('.searching-content__title-close-button');
  const buttonSearchNode = document.querySelector('.button-search');
  
  const handleCloseDialog = use_to_close_seacrhing_dialog();
  const handleOpenDialog = use_to_open_seacrhing_dialog();
  
  buttonSearchNode.addEventListener('click', () => {
    if (window.isSeacrhingDialogOpen) return handleCloseDialog();
    handleOpenDialog();
  });
  
  closeButtonOfSearchingDialogNode.addEventListener('click', handleCloseDialog);
  
  set_up_search(
    [],
    [
      document.querySelector('.searching-content-search__result'),
      document.querySelector('.searching-content-search__svg-container'),
      document.querySelector('.searching-content-search__input'),
    ]
  );

}
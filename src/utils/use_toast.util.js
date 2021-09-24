import '@styles/_toast.scss';

const DEFAULT_CLASS = 'toast';
const toastNode = document.querySelector('.' + DEFAULT_CLASS);

const handleOpenNotification = () => {
  toastNode.classList.remove(`${DEFAULT_CLASS}--closed`);
};

const handleCloseNotification = () => {
  toastNode.classList.add(`${DEFAULT_CLASS}--closed`);
};

export const use_toast = (message, variant) => {
  toastNode.innerHTML = message;
  toastNode.classList.add(`${DEFAULT_CLASS}--${variant}`);

  handleOpenNotification();
  setTimeout(() => {
    handleCloseNotification();
  }, 8000);
};

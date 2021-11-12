import '@styles/_log_in_dialog.scss';
import { set_up_button_ripple } from '@utils/set_up_button_ripple.util.js';
import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';
import { use_toast } from '@utils/use_toast.util.js';
import IMask from 'imask';
import close_svg from '@svgs/close.svg';

export const set_up_log_in_dialog = (is_close_button_hidden ) => {
  const _class = '_log_in_dialog';
  const _node = document.querySelector('.' + _class);

  _node.style.display = 'grid';
  _node.innerHTML = `<div content>
    <div title>
      <p>Log in</p>
    ${is_close_button_hidden ?  '' :  `<button id='_log_in_dialog__close_button'>${close_svg} </button>` }

    </div>
    <div main>
    <input id='_log_in_dialog__email_input' placeholder='email' class='input'/>
    <input id='_log_in_dialog__name_input' placeholder='name' class='input'/>
    <button class='button--contained ' id='_log_in_dialog__submit_button'>Confirm</button>
    </div>
  </div>`;

  const email_mask = IMask(_node.querySelector('#' + _class + '__email_input'), { mask: /^\S*@?\S*$/ });

  const _close_button_node = _node.querySelector('#' + _class + '__close_button');
  const _submit_button_node = _node.querySelector('#' + _class + '__submit_button');

  set_up_button_ripple(_close_button_node, () => {
    _node.remove();
  });
  set_up_button_ripple(_submit_button_node, async () => {
    const email = email_mask.value;
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return use_toast('Email' + 'is not valid', 'error');

    const name = _node.querySelector('#_log_in_dialog__name_input')?.value || email?.split?.('@')?.[0];

    const [res, err] = await use_xml_http_request(`send_auth_email`, 'POST', JSON.stringify({ name, email }));
    if (!!err) {
      if (err === 'Conflict') {
        return use_toast('Check previuous emails with auth token', 'error');
      }
      return use_toast(err, 'error');
    }
    _node.remove();
    use_toast(res, 'info');
  });
};

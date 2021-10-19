import 'regenerator-runtime/runtime.js';
import '@prototypes/map_join.array.js';
import '@styles/admin.scss';

import { use_check_for_auth } from '@utils/use_check_for_auth.util.js';
import { set_up_orders_list } from '@utils/set_up_orders_list.util.js';
import { set_up_search_items } from '@utils/set_up_search_items.util.js';
import { set_up_new_product_dialog } from '@utils/set_up_new_product_dialog.util.js';
import { set_up_list_of_parent_categories } from '@utils/set_up_list_of_parent_categories.util.js';
import { set_up_admin_search } from '@utils/set_up_admin_search.util.js';
import { set_up_new_category_dialog } from '@utils/set_up_new_category_dialog.util.js';

import { defineCustomElements as initSkeleton } from 'skeleton-webcomponent-loader/loader/index.js';

initSkeleton();
use_check_for_auth();
set_up_list_of_parent_categories();
set_up_new_product_dialog();
set_up_orders_list();
set_up_admin_search();
set_up_search_items();
set_up_new_category_dialog();

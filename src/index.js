import { onSubmit } from "./js/requests/onSubmit";
import refs from "./js/services/refs";

refs.loadMoreEl.style.visibility = 'hidden';
refs.formInputEl.addEventListener('submit', onSubmit)
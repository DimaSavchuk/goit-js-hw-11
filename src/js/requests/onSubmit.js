import { Notify } from "notiflix";
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

import refs from "../services/refs";
import { apiRequest } from "./apiRequest";
import { createItemListMarkup } from "../services/markupService";
import { pageScroll } from './pageScroll'

let page = 1;

let simpleLightBox = new SimpleLightbox('.photo-card-link', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
});

const options = {
    root: null,
    rootMargin: '100px',
    threshold: 1.0,
};

const observer = new IntersectionObserver(onLoad, options);

function onLoad(entries, observer) {
    entries.forEach(async element => {
        if (element.isIntersecting) {
            refs.loadMoreEl.style.visibility = 'hidden';
            page += 1;

            try {
                const response = await apiRequest(page);

                if (response.totalHits < response.page * response.per_page) {
                    observer.unobserve(refs.guardEl);
                    Notify.info(`We're sorry, but you've reached the end of search results`);
                    return;
                }
                refs.galleryEl.insertAdjacentHTML('beforeend', createItemListMarkup(response.hits));
                simpleLightBox.refresh();
                pageScroll();

            } catch (error) {
                console.log(error);
            }
        }
    });
}

export function onSubmit(event) {
    event.preventDefault();

    refs.galleryEl.innerHTML = '';

    const request = event.currentTarget.elements.searchQuery.value;
    if (request.trim() === '') {
        Notify.info('Please enter your request');
        return;
    }

    observer.unobserve(refs.guardEl);
    renderCards();
}


async function renderCards() {
    const response = await apiRequest();

    if (response.total === 0) {
        Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
        );

        return;
    } else {
        observer.observe(refs.guardEl);
        Notify.success(`"Hooray! We found ${response.totalHits} images."`);
        refs.galleryEl.insertAdjacentHTML('beforeend', createItemListMarkup(response.hits));
        simpleLightBox.refresh();
        pageScroll();
    }

}
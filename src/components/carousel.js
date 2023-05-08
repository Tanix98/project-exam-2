// Image gallery carousel

async function imgGalleryWait(event) {
    const listingImagesContainer = document.querySelector(
        '.listing-image-container'
    );
    const imageCount = document.querySelector('#image-count');
    const imgGalleryNavigation = document.querySelector(
        '#img-gallery-navigation'
    );
    try {
        const response = await fetch(
            `${apiBaseUrl}/listings/${listingId}?_seller=true&_bids=true`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const data = await response.json();
        if (data.media.length > 1) {
            imgGalleryNavigation.classList.remove('d-none');
            imgGalleryNavigation.classList.add('d-flex');
        }
        /*if (event.type === "click") {
        if ((event.target.id = "img-arrow-left")) {
          currentImageNumber--;
        }
        if ((event.target.id = "img-arrow-right")) {
          currentImageNumber++;
        }
      }*/
        if (data.media) {
            for (let i = 0; i < data.media.length; i++) {
                imageCount.innerHTML = `${currentImageNumber} / ${data.media.length}`;
                listingImagesContainer.innerHTML = `<img
              src="${data.media[0]}"
              class="rounded-2"
              alt="listing image"
          />`;
            }
        }
    } catch (e) {
        console.log(e);
    }
    return currentImageNumber;
}

setTimeout(function () {
    imgGalleryWait();
}, 800);

async function imgGalleryButtonClick() {
    try {
        const listingImagesContainer = document.querySelector(
            '.listing-image-container'
        );
        const imageCount = document.querySelector('#image-count');
        const response = await fetch(
            `${apiBaseUrl}/listings/${listingId}?_seller=true&_bids=true`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const data = await response.json();
        const imgNavigation = window.localStorage.getItem('imgNavigation');
        const add = function (valueToAdd) {
            currentImageNumber += valueToAdd;
            return currentImageNumber;
        };
        if (imgNavigation == 'previous-img' && currentImageNumber > 1) {
            add(-1);
        }
        if (
            imgNavigation == 'next-img' &&
            currentImageNumber < data.media.length
        ) {
            add(1);
        }
        console.log(currentImageNumber);
        imageCount.innerHTML = `${currentImageNumber} / ${data.media.length}`;
        listingImagesContainer.innerHTML = `<img
        src="${data.media[currentImageNumber - 1]}"
        class="rounded-2"
        alt="listing image"
      />`;
    } catch (e) {
        console.log(e);
    }
}

document.addEventListener('click', function (e) {
    const target1 = e.target.closest('#img-arrow-left');
    if (target1) {
        window.localStorage.removeItem('imgNavigation');
        window.localStorage.setItem('imgNavigation', 'previous-img');
        imgGalleryButtonClick(
            `${apiBaseUrl}/listings/${listingId}?_seller=true&_bids=true`
        );
    }
    const target2 = e.target.closest('#img-arrow-right');
    if (target2) {
        window.localStorage.removeItem('imgNavigation');
        window.localStorage.setItem('imgNavigation', 'next-img');
        imgGalleryButtonClick(
            `${apiBaseUrl}/listings/${listingId}?_seller=true&_bids=true`
        );
    }
});

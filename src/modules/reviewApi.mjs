/**
 * Initializes and displays Google reviews.
 *
 * This function fetches Google place details such as reviews and displays them on the UI.
 * It also provides functionalities to duplicate review templates, fade in elements, and hide elements.
 *
 * @param {Function} callback - A callback function to be invoked once reviews have been processed and displayed.
 */
export function initGoogleReviews(callback) {
    /**
     * Duplicates the first review div multiple times, based on the given index.
     * This helps in preparing the UI to display multiple reviews.
     *
     * @param {Number} index - The number of times the first review div should be duplicated.
     */
    function appendReviews(index) {
        // Repeatedly clone the first review div to match the required count
        for (let i = 0; i < index - 1; i++) {
            const firstReviewDiv = document.querySelector('[data-div="review"]:first-child');
            const clonedReviewElement = firstReviewDiv.cloneNode(true);
            const reviewWrapper = document.querySelector('[data-div="review-wrapper"]');
            reviewWrapper.appendChild(clonedReviewElement);
        }
    }

    /**
     * Gradually increases the visibility of a given HTML element.
     * This is achieved by adjusting its opacity in regular intervals.
     *
     * @param {HTMLElement} element - The HTML element to fade in.
     */
    function fadeIn(element) {
        element.style.opacity = 0;
        element.style.display = 'block';

        const fadeInInterval = setInterval(() => {
            if (element.style.opacity < 1) {
                element.style.opacity = parseFloat(element.style.opacity) + 0.1;
            } else {
                clearInterval(fadeInInterval);
            }
        }, 50);
    }

    console.log(placesArr)

    /**
     * Conceals a given HTML element from view.
     *
     * @param {HTMLElement} element - The HTML element to hide.
     */
    function hide(element) {
        element.style.display = 'none';
    }

    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // async function callMapsApi(context) {
    //   const placeID = context;
    //   const fields = 'name,rating,reviews,opening_hours,formatted_address,website,url';
    //   const apiKey = 'AIzaSyD_khPerIUXq2Zj5DUxRuktjJZMx4JYkzw';
    //   const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${apiKey}&place_id=${placeID}&fields=${fields}`;

    //   try {
    //     const response = await fetch(url);
    //     const data = await response.json();
    //     return data.result;
    //   } catch (error) {
    //     console.error('There was an error fetching data:', error);
    //     throw error; // or return an appropriate fallback or error message
    //   }
    // }

    // Fetch Google place details using a custom endpoint
    // $.get('https://dev--d1-spas--candidleap.autocode.dev/', { googleID }).then((res) => {
    //     let { reviews } = res;

    //     if (!reviews) {
    //         const reviewSection = document.querySelector('.section_google-reviews');
    //         reviewSection.remove();
    //     }

    //     if (res.formatted_address) {
    //         document.querySelector('[data-text="address"]').innerHTML = res.formatted_address;
    //     } else {
    //         document.querySelector('[data-text="address"]').remove();
    //     }

    //     if (res.website) {
    //         document.querySelector('[data-button="website"]').setAttribute('href', res.website);
    //     } else {
    //         document.querySelector('[data-button="website"]').remove();
    //     }

    //     if (res.url) {
    //         // Populate place details on the UI
    //         document.querySelector('[data-button="direction"]').setAttribute('href', res.url);
    //     } else {
    //         document.querySelector('[data-button="direction"]').remove();
    //     }

    //     // Proceed if there are reviews to be displayed
    //     if (reviews) {
    //         appendReviews(reviews.length);

    //         // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //         let countedReviews = 0;

    //         // Iterate over the reviews to display them on the UI
    //         reviews.forEach((review, x) => {
    //             if (reviews.rating < 3) {
    //                 return;
    //             }
    //             countedReviews += 1;
    //             // Update review contents
    //             document.querySelectorAll('[data-text="name"]')[x].textContent = review.author_name;
    //             document.querySelectorAll('[data-text="date"]')[x].textContent =
    //                 review.relative_time_description;
    //             document.querySelectorAll('[data-text="review"]')[x].textContent = review.text;

    //             // Set the reviewer's profile picture
    //             const imageElements = document.querySelectorAll('[data-div="image"]');
    //             imageElements[x].setAttribute('src', review.profile_photo_url);
    //             imageElements[x].setAttribute('srcset', review.profile_photo_url);

    //             // Display stars representing the reviewer's rating
    //             const starsDiv = document.querySelectorAll('[data-div="stars"]')[x];
    //             const starIcons = [...starsDiv.children];
    //             starIcons.slice(review.rating).forEach((star) => starsDiv.removeChild(star));
    //         });

    //         if (countedReviews > 3) {
    //             // Execute the callback once all reviews are processed
    //             callback();
    //         }
    //     }
    //     // Display the main content after loading and processing the reviews
    //     hide(document.querySelector('[data-lottie="loading"]'));
    //     fadeIn(document.querySelector('[data-div="main"]'));
    // });

    function placeDetails(res) {
        let reviews = res.reviews;
        let openingObj = res.opening_hours;
        console.log(res);
        // Place Address
        const addressText = document.querySelector('[data-text="address"]');
        const openText = document.querySelector('[data-text="opening"]');
        const websiteBtn = document.querySelector('[data-button="website"]');
        const directionBtn = document.querySelector('[data-button="direction"]');
        const openingHour = document.querySelectorAll('[data-text="day"]');

        addressText.textContent = res.formatted_address;
        websiteBtn.setAttribute("href", res.website);
        directionBtn.setAttribute("href", res.url);
        if (openText) {
            if (openingObj.isOpen()) {
                openText.textContent = "open now";
            } else {
                openText.textContent = "close now";
            }
        }

        // Place opening details
        for (let i = 0; i < openingObj.weekday_text.length; i++) {
            if (openingHour[i]) {
                openingHour[i].textContent = openingObj.weekday_text[i];

            }
        }

        // place total rating
        const ratingDiv = document.querySelector('[data-div="rating"]');
        if (ratingDiv) {
            const children = ratingDiv.children;

            for (let i = 0; i < 5 - res.rating; i++) {
                if (children[i]) {
                    ratingDiv.removeChild(children[i]);
                } else {
                    // No more children to remove
                    break;
                }
            }
        }

        if (reviews.length > 0) {
            // Append review div based on revies total length
            appendReview(reviews.length);

            for (let x = 0; x < reviews.length; x++) {
                // Reviewer name
                const nameElements = document.querySelectorAll('[data-text="name"]');
                nameElements[x].textContent = reviews[x]["author_name"];

                // Review time description
                const dateElements = document.querySelectorAll('[data-text="date"]');
                dateElements[x].textContent = reviews[x]["relative_time_description"];

                // Reviewe text
                const reviewElements = document.querySelectorAll('[data-text="review"]');
                reviewElements[x].textContent = reviews[x]["text"];

                // Reviewer image
                const imageElements = document.querySelectorAll('[data-div="image"]');
                imageElements[x].setAttribute("src", reviews[x]["profile_photo_url"]);
                imageElements[x].setAttribute("srcset", reviews[x]["profile_photo_url"]);

                // Reviewer rating
                const starsDiv = document.querySelectorAll('[data-div="stars"]')[x];
                if (starsDiv) {
                    const children = starsDiv.children;

                    for (let i = 0; i < 5 - reviews[x].rating; i++) {
                        if (children[i]) {
                            starsDiv.removeChild(children[i]);
                        } else {
                            // No more children to remove
                            break;
                        }
                    }
                }

                if (countedReviews > 3) {
                    // Execute the callback once all reviews are processed
                    callback();
                }
            }

            hide(document.querySelector('[data-lottie="loading"]'));
            fadeIn(document.querySelector('[data-div="main"]'));
        }
    }
}
#Hotels CMS

Manage the content of our hotels easily using the Hotel CMS application.

- [Login](#login)
- [Hotels list](#hotel-list)
- [Hotel](#hotel)
  - [Edit](#hotel-edit)
  - [Languages](#hotel-languages)
  - [Hotel modes](#hotel-modes)
  - [History](#hotel-history)
  
  
<h2 id="login">Login</h2>

<a href="https://raw.githubusercontent.com/tajawal/hotel-pim/pim-31/screenshots/login.jpg?token=ABdCBs_KnwNy8tR791a8mu-sfj7cDIN8ks5XDkUCwA%3D%3D" target="_blank">
<img width="350" src="https://raw.githubusercontent.com/tajawal/hotel-pim/pim-31/screenshots/login.jpg?token=ABdCBs_KnwNy8tR791a8mu-sfj7cDIN8ks5XDkUCwA%3D%3D" />
</a>

Login and access the dashboard. From there you can access the Hotels listing.


<h2 id="hotel-list">Hotels list</h2>

<a href="https://raw.githubusercontent.com/tajawal/hotel-pim/pim-31/screenshots/hotel-list.jpg?token=ABdCBhMU62tkXS2R9Q4AW_b08Q9ryc9pks5XDkTXwA%3D%3D" target="_blank">
<img width="350" src="https://raw.githubusercontent.com/tajawal/hotel-pim/pim-31/screenshots/hotel-list.jpg?token=ABdCBhMU62tkXS2R9Q4AW_b08Q9ryc9pks5XDkTXwA%3D%3D" />
</a>

The hotel listing screen provides you *search* and *filtering* of the hotels.

- Search by hotel name
- Filter by hotel status *(original, draft, published)*
- Overview of the history
- Sync status

<h2 id="hotel">Hotel</h2>

The hotel screen has all the information of the hotel, it'll let you edit the current information, save it as draft or publish it, and show/restore previous published versions of the hotel.

<h3 id="hotel-edit">Edit</h3>
---

<a href="https://raw.githubusercontent.com/tajawal/hotel-pim/pim-31/screenshots/hotel-edit.jpg?token=ABdCBup5qr-V6_2APmBTh_XsNi5zV2Y6ks5XDkR0wA%3D%3D" target="_blank">
<img width="350" src="https://raw.githubusercontent.com/tajawal/hotel-pim/pim-31/screenshots/hotel-edit.jpg?token=ABdCBup5qr-V6_2APmBTh_XsNi5zV2Y6ks5XDkR0wA%3D%3D" />
</a>

- Title
- Description
- Main Image / List of images (carousel)
  - Caption
  - Main image (is it the main hotel image?)
  - Active (will it be visible in the website?)
  - Thumbnail image
  - Image
    - If the image is *not active*, it *cannot* be set as *main image*
    - image the image is the *main image*, it *cannot* be *deactivated*
    - to change the main image, select another one from the image list

<h3 id="hotel-languages">Languages</h3>
---

<a href="https://raw.githubusercontent.com/tajawal/hotel-pim/pim-31/screenshots/language.jpg?token=ABdCBspiR05efGacVXwpRxx8OEI9-5tQks5XDkRQwA%3D%3D" target="_blank">
<img width="350" src="https://raw.githubusercontent.com/tajawal/hotel-pim/pim-31/screenshots/language.jpg?token=ABdCBspiR05efGacVXwpRxx8OEI9-5tQks5XDkRQwA%3D%3D" />
</a>

By default the language selected is english, you can choose which hotel version to edit by selecting a language from the dropdown.

If you need to copy the content from one language to the other, for example I want the english version prefilled with the content of the arabic version:

1. Select the arabic version from the `Language` dropdown
2. Click on `Copy to` and choose `English` from the menu
3. Now you can either keep modifiying the content, or save/publish the hotel

<h3 id="hotel-modes">Hotel modes</h3>
---

Based on the source and the status, the hotel can be either *original*, *draft* or *published*.

- **Original:** this hotel has not been modified, the information is the same as the source
- **Draft:** this hotel has been modified, the current information is not published yet, any modification *(Save as Draft)* will be saved, without creating new revisions
- **Published:** this hotel is published and can be *updated* or *saved as draft*.
  - **Update:** will create a new revision, and mark the updates to be published
  - **Save as Draft:** will not create a revision, and the article can be further modified without affecting live content, until it gets published.
  
<h3 id="hotel-history">History</h3>
---
<a href="https://raw.githubusercontent.com/tajawal/hotel-pim/pim-31/screenshots/history.jpg?token=ABdCBiObmsSmvfI9OZdn9aVIkx7IfBqDks5XDkO3wA%3D%3D" target="_blank">
<img style="float:left; margin-right: 20px" width="150" src="https://raw.githubusercontent.com/tajawal/hotel-pim/pim-31/screenshots/history.jpg?token=ABdCBiObmsSmvfI9OZdn9aVIkx7IfBqDks5XDkO3wA%3D%3D" />
</a>

Every time an hotel get published, a new revision gets created. The old version get pushed to the history to be later compared to the current version, or it can be restored.

- **Load:** will load a revision, when loading a revision, you can either *save as draft* and coninue editing and the publish, or you can directly *restore*, which will load the revision and publish simultaneously.


  
  
  
  
  
  
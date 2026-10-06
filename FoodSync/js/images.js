/* Images are stored separately on every menu item in data.js.
   Change item.image for a food photo and item.bannerImage for its restaurant banner. */
function getFoodImage(item) {
  return item && item.image ? item.image : "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80";
}
function getRestaurantBanner(items) {
  return items && items[0] && items[0].bannerImage ? items[0].bannerImage : getFoodImage(items && items[0]);
}

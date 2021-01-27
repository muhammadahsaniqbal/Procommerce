# Procommerce
A simple e-commerce react native app.

Following is list of features and components. Implemented features are marked with checked boxes and incomplete ones with un-checked boxes.

Known issues are mentioned at the end.

## Foundation
- [x] First time app open, ask user to allow notification
- [x] Build 2 bottom tabs - home & profile
- [x] Build api loader
- [x] Build api error toast
- [x] Build api empty response screen

## Home
- [x] Build product listing screen
- [x] Build pull to refresh
- [x] Build infinite scrolling with loading more products

## Product detail
- [x] Build product detail screen
- [ ] Open a deeplink from outside the app will open the app and redirect user to product detail screen

## Cart
- [x] Implement Add to cart
- [x] Build Cart detail screen

## Profile
- [x] There are 4 buttons in profile screen - toggle rtl & enable notification & enable location & addresses

## Toggle rtl
- [x] Toggle rtl button will change the whole app layout without re-start the app

## Enable notification & location
- [x] Enable notification and location button will lead user to the permission setting screen in your phone

## Addresses
- [x] Addresses button will lead to address listing screen with add address button
- [x] Add address button will lead to map view screen, and ask user to allow location fist time
- [ ] In map view screen, default address will be user's current location, and user can change location through a pin which is in the center of the screen
- [ ] After user add address in map view, the address will be reflected in address listing screen

## Stack
- Used @react-navigation
- Used @reduxjs/toolkit
- Used RN CLI
- Used javascript
- Used https://fakestoreapi.com/

## Notes / Known Issues
- RTL toggle is implemented but couldn't enforce without app reload
- Deep linking is not handled (Open a deeplink from outside the app will open the app and redirect user to product detail screen)
- User location is retrieved in Address Listing screen but not passed to Map View screen.
- Map View screen is pending.
- Tested on iOS Simulator only. Mobile capabilities such as notifications & location have been properly configured for iOS but not tested for Android.
- App logo updated only for iOS.

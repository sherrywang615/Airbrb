ReactJS: AirBrB

## 1. Project Description

This project is a ReactJS project that provides an online booking platform for hosts and guests. It allows users to register, log in, and manage listings. Hosts can create, edit, publish, and remove property listings, and manage booking requests from guests. Guests can browse and search available listings, make bookings, and leave reviews. The application ensures dynamic state updates without page refreshes, offering a seamless user experience. The backend handles authentication, booking management, and other data persistence tasks.

Key features include user authentication, creating and managing listings, booking functionality, and review submissions.

## 2. Features

### 2.1. Feature Set 1. Admin Auth 

This focuses on the basic user interface to register and log in to the site. Login and registration are required to gain access to making bookings as a guest, leave reviews and to manage your own listings as a host.

#### 2.1.1. Login Screen
 * A unique route exists for this screen
 * User is able to enter their `email` and `password`.
 * If the form submission fails, a reasonable error message is shown
 * A button that allows submission of form

#### 2.1.2. Register Screen
 * A unique route exists for this screen
 * User is able to enter their `email` and `password` and `name`
 * A confirm `password` field exists where user re-enters their password.
 * If the two passwords don't match, the user should receive an error popup before submission.
 * If the form submission fails, a reasonable error message is shown
 * A button that allows submission of form

#### 2.1.3. Logout Button
 * A logout button, when clicked, returns the user to the landing screen whilst being no longer logged in.

#### 2.1.4. Items on all screens
 * On all screens, for a user who is logged in / authorised:
   * There is a logout button.
   * A button that takes the user to the screen to view their hosted listings.
   * A button that takes the user to the screen to view all listings.

### 2.2. Feature Set 2. Creating & Editing & Publishing a Hosted Listing

For logged in users, they are able to create their own listings (as a host) that will become visible to all other users who have the option of booking it.

#### 2.2.1. Hosted Listings Screen
* A unique route exists for this screen
* A screen of all listings is displayed, where each listing shows the:
	- Title
	- Property Type
	- Number of beds
	- Number of bathrooms
	- Thumbnail of the listing
	- SVG rating of the listing (based on user ratings)
	- Number of total reviews
	- Price (per night)
* Each listing has a clickable element relating to it that takes the user to the screen to edit that particular listing.
* A button exists on this screen that allows the user to delete a particular listing.

#### 2.2.2. Hosted Listing Create
* On the hosted listing screen, there is a button that allows users to create a new listing. When clicked, users are taken to another screen that requires users to provide the following details:
	- Listing Title
	- Listing Address
	- Listing Price (per night)
	- Listing Thumbnail
	- Property Type
	- Number of bathrooms on the property
	- Property bedrooms (e.g. each bedroom could include number of beds and their type)
	- Property amenities
* Using a button, a new listing on the server is created and visibly added to the dashboard (the Hosted Listings Screen) once all of the required fields have been filled out correctly.

#### 2.2.3. Edit AirBrB Listing
* A unique route exists for this screen that is parameterised on the listing ID.
* The user should be able to edit the following: 
	- Title
	- Address
	- Thumbnail
	- Price (per night)
	- Type
	- Number of bathrooms
	- Bedrooms (incorporate editing of beds as part of bedrooms)
	- Amenities
	- List of property images
* Updates can auto-save, or a save button can exist that saves the updates and returns you to the hosted listings screen.

#### 2.2.4. Publishing a listing
 * For a listing to "go live" means that the listing becomes visible to other AirBrB users on the screen described in ``2.4``.
 * On the hosted listings screen, add the ability to make an individual listing "go live".
 	- A listing has at least one availability date range.

### 2.3. Feature Set 3. Landing Page: Listings and Search

When the app loads, regardless of whether a user is logged in or not, they can access the landing screen. The landing screen displays a number of listings that you as a guest may be able to book (on another screen).

#### 2.3.1. Listings Screen
* A unique route exists for this screen.
* This is the default screen that is loaded when a user accesses the root URL.
* This screen displays a list of all published listings (rows or thumbnails). The information displayed in each listing is:
  * Title
  * Thumbnail of property
  * Number of total reviews
* In terms of ordering of displayed published listings:
  * Listings that involve bookings made by the customer with status `accepted` or `pending` appear first in the list (if the user is logged in).
  * All remaining listings are displayed in alphabetical order of title.

#### 2.3.2. Search Filters
* On this listings screen, a search section exists for the user to filter via search parameters. 
* The search section will consists of an input text box:
  * The input text box will take in a search string, and will search title and city location properties of listings, and only display those that match.
* Other form inputs should also exist that allow the user to search by:
	* Number of bedrooms (a minimum and maximum number of bedrooms, expressed either via text fields or a slider)
	* Date range (two date fields) - only display bookings that are available for the entire date range as inputted by the user.
	* Price (a minimum and maximum price, expressed either via text fields or a slider)
	* Review ratings:
		- Sort results from highest to lowest review rating **or** from lowest to highest review rating depending
		- If there is more than one listing with the same rating, their order does not matter
* The search section must have an associated search button that will action the search to reload the results given the new filters.

### 2.4. Feature Set 4. Viewing and Booking Listings

#### 2.4.1. View a Selected Listing
 * A unique route exists for this screen that is parameterised on the Listing ID
 * When a listing is clicked on, this screen should appear and display information about a specific listing.
 * On this screen the user is given the listing they have decided to view in 2.4.1. This consists of:
	- Title
	- Address (displayed as a string, e.g. 1/101 Kensington Street, Kensington, NSW)
	- Amenities
	- Price:
		- If the user used a date range for search in `2.3.2` - display **price per stay**
		- If the user did not use a date range for search in `2.3.2` - display **price per night**
	- All images of the property including the listing thumbnail 
	- Type
	- Reviews
	- Review rating
	- Number of bedrooms
	- Number of beds
	- Number of bathrooms
 * On this screen if the user is logged in and they have made booking for this listing, they should be able to see the status of their booking.
 * If the user has made more than 1 booking for a listing, display the status of all the bookings

#### 2.4.2. Making a booking and checking its status
 * On the screen described in `2.4.1`, a **logged in** user should be able to make a booking for a given listing they are viewing between the dates they are after. The user enters two dates (this includes day, month and year), and assume the dates describe a valid booking, a button allows for the confirmation of the booking.
 * A user can make an unlimited number of bookings per listing even on overlapping date ranges and even if other users have already booked the property for those dates. It is up to the host to check if they have double booked their listing and accept/deny the bookings accordingly.
 * A booking's length (in days) is defined based on _how many nights_ a user spends at the listed property. 
 * Once a booking is made, the user receives some kind of temporary confirmation on screen.

#### 2.4.3 Leaving a listing review
* A logged in user should be able to leave a review for listings they've booked that will immidiately appear on the listing screen after it's been posted by the user. The review will consist of a score (number) and a comment (text). You can leave an unlimited number of reviews per listing.

### 2.5. Feature Set 5. Removing a Listing, Managing Booking Requests 

#### 2.5.1. Removing a live listing
 * Add the ability to remove a live listing from being visible to other users. 
 * Once un-published, those who had made bookings for a removed listing will no longer be able to view it on their landing screen

#### 2.5.2. Viewing booking requests and history for a hosted listing
 * A unique route exists for this screen that is parameterised on the listing ID
 * This screen should be accessed via a button or link on the hosted listings screen.
 * On this screen, a list of booking requests are provided for the listing they are viewing. For each booking request, the host is able to accept/deny it.
 * The screen should also display the following information about a listing:
	* How long has the listing been up online
	* The booking request history for this listing consisting of all booking requests for this listing and their status (accepted/denied)
	* How many days this year has the listing been booked for
	* How much profit has this listing made the owner this year

### 2.7. Linting

* Linting can be run from inside the `frontend` folder by running `npm run lint`.

### 2.8. Testing

Use cypress for component testing and UI testing.

#### Running tests

Tests can be run from inside the `frontend` folder by running `npm run test`.

## 3. Getting Started

### 3.1. The Frontend

Navigate to the `frontend` folder and run `npm install` to install all of the dependencies necessary to run the ReactJS app. Then run `npm start` to start the ReactJS app. Then use the live server in VS code to view the front end.

### 3.2. The Backend (provided)

Run `npm install` in `backend` directory once.

To run the backend server, simply run `npm start` in the `backend` directory. This will start the backend.

To view the API interface for the backend, navigate to the base URL of the backend (e.g. `http://localhost:5005`). This will list all of the HTTP routes that can be interacted with.

Once the backend has started, you can view the API documentation by navigating to `http://localhost:[port]` in a web browser.

The port that the backend runs on (and that the frontend can use) is specified in `frontend/src/config.js`. 




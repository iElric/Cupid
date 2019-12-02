# **Cupid - A Modern Dating App** 

# Meta

## Who was on your team?
Yexin Wang, Sikang Hu, Lingmiao Qiu, Hongjie Li

## What’s the URL of your deployed app？
 * http://cupid.lilydevelop.com/
 * http://cupid.ielric.com/

## What’s the URL of your GitHub repository with the code for your deployed app?
 https://github.com/iElric/Cupid

## Is your app deployed and working?
Yes

## For each team member, what work did that person do on the project?
**Yexin Wang:**
* Created database tables and constructed corresponding schemas in
  elixir
* Wrote the backend logic of uploading photos, fetching photos, liking
  a user
* Wrote the backend logic of recommending users that potentially can
  become a match
* Debugged an asynchronous problem of getting recommendations 

**Sikang Hu:** 
* Implemented user signup and login
* Enabled chat functionalities and push real-time notifications when
  the users become a match

**Lingmiao Qiu:** 
* Handled location API call, get the current location and transfer
  between the location and address.
* Improved database to store data related to API calls. Implemented
  feature of finding people nearby for the recommendations 

**Hongjie Li:**
* Wrote most of the front-end with react and redux
* implemented several functionalities include enable users to see,
  edit their profiles
* Improved UI with CSS and react-icons

# App

## What does your project 2 app do?
Cupid is a location-based dating app that provides users with a way to
connect with others who share the same interests and who live nearby.
The app allows users to like or dislike recommended people and chats
if both parties liked each other (become a match). 

## How do users interact with your application? What can they accomplish by doing so?
* If a user is a first-time user, he or she will need to go to the
  signup page, which is located at the bottom of the home page. On the
  signup page, the user needs to type his/her information according to
  the form requirements to register an account. 
* If a user is not a first-time user, he or she can log in to the
  account by clicking the “Log In” on the right top corner.
* After logs in, a user can modify his/her profile, including upload
  photos, edit person description and add interest in the profile
  page. A good self-description can show a user’s personality and
  helps other people to discover him or her. He/she can also view all
  the photos that have been uploaded. The profile page can be entered
  by clicking the “profile” icon at the top of the page. 
* When selecting the “discover” icon next to the “profile” icon, a
  user will enter a page in which Cupid recommends people who are
  nearby(within 5km) and who share the same interests(two or more)
  with the user(these parameters can be changed easily). When first
  enter this page, please allow page to access the location(can modify
  this settings in browse/privacy/location). The recommended people
  are shown one by one with detailed information including name, city,
  photos, self-description. The user can click the arrow icons on both
  sides to view photos of recommended people. Users can choose whether
  to like the recommended people or not by clicking the “face” icons
  at the bottom. After the user chooses to like or pass, the next
  recommended user will show up. If the user has already “liked” the
  people or the people is already one of the user’s matches, then the
  people can not show in the recommended list. What’s more, only
  people with the opposite gender will be recommended. If both parties
  liked each other, the app will automatically match them together. 
* Both users can then find their new matches on their match list which
  are under the “matches” icon, users can start a conversation with
  any matched person by clicking the people in the match list of left.
  Once people are matched, they can find and contact anyone on their
  matches at any time. In addition, our app saves user chat messages
  on a backup agent. So users can always go back and pick up past
  conversations. 

## For each project requirement above, how does your app meet that requirement?
* We do feel that our application is more ambitious and fun than
  previous assignments. We improved the aesthetics of our UI. We
  follow the model of twitter and using the blue and white as our
  theme color, which looks both modern and fashionable. Our
  application, Cupid, has all the needed features that a dating app
  should have, including discovering people with share interest,
  discovering people nearby, chatting with matched people, and etc.
* Our application idea was approved by the professor on the piazza
* Our project is written by Elixir and Phoenix
* Our project does have significant back-end logic. We implement the
  back end logic for features like upload photos, update profiles,
  discover people nearby or with the same interest, chat and etc. We
  utilized channels and backup agent for chat functionality. 
* The application is deployed in the VPS. And the URL can be found at
  the beginning of the doc. We don’t use any assets from any CDN.
* Users can sign up for an account on our application website, and
  later use that account to log in. We enabled the password hash to
  protect user privacy.
* All the persistent data is stored in the Postgres database. We have
  7 tables in total, they are -- users, tags, photos, messages,
  matches, likes, interests. The constraints and relationships are
  defined in and among tables, e.g.: photos table has users as its
  foreign key, the user’s name is unique, there is a default value for
  photo descriptions. 
* Our application uses Google’s Geocode API for getting the current
  location address based on the given latitude and longitude, which is
  tracked through HTML Geolocation GPS. When a user’s browsing through
  other users’ profiles, he or she will be able to see which region
  other users are from. This could be helpful if a user only want to
  connect with people nearby, even when they don’t share the same
  interests.
* The API access is server to server.
* We did implement two additional features, please see below section
  for more details.

## What’s the complex part of your app? How did you design that component and why?
**Recommendations:** The core function of a dating app is to recommend
people for users. We decide that people nearby or have the same
interests will be recommended. If the user doesn’t allow the website
to access his/her location, then only the people with the same
interests will be showed.

If the user allowed the location access, the front-end will send the
coordinates of current user to backend. Otherwise the latitude and
longitude will be sent as 0. In backend, if the true coordinates is
provided, we will update the coordinates stored in the users table,
fetch the address via geolocation api and store it in user table as
well. In this way, we always save the most recent location the user
provided. Then all the users within 5km with current user will be
retrieved from database. We used certain complex mathematics equation
to calculate the exact distance between two set of latitude and
longitude. 

We union this list of users with the “same interest” user list, then
filter out those has been liked or matched. This strategy enables us
to do one ajax call to get the recommendation list instead of retrieve
two kinds of list separately. And it allows us to filter only once.   

**Chat:** Once matched, our user can begin to chat with his/her new
friends. User can choose a friend to chat with from a contact list,
and all the messages are real-time. 

We leverage the full duplex communication feature of WebSocket to
implement this instant message system. After login, the front-end will
get all the user’s friends from the server. The client-side will
initialize a socket and get authorized by the server, then for each
match, it will join a corresponding channel(representing a
conversation with a friend the user matched with). On joining, the
client-side will also retrieve the chat history for each conversation.
Then, the user can choose a friend and send/receive messages through
the channel to/from him/her. 

Each friend will be map to a NavLink in the sidebar on the left and a
Route in the Switch on the right. In this way, when the user clicks
the conversation on the left, the URL will be changed, and the
react-router will render a corresponding ChatView in the Switch on the
right. This strategy enables us to separate components (Contact,
Message and etc.) and generate them dynamically. Also, separating
components makes it easier to modify their.

## What additional features did you implement?
* We did use the HTML location API. Our application is a
  location-based dating app. When a user opens the app, the app will
  ask whether the user wants to share the location with our app. If
  permission is granted, the HTML location API will return the user’s
  location and send that information to the back end. Then the back
  end will find the nearby people for that user. If the user is moving
  around, the HTML location API will return the user’s real-time
  location.
* We used Phoenix Channels to push real time updates to users in the
  matches chat page. Users can chat with their matches in our
  application. The message is sent from the sender to the receiver
  with real time updates. What’s more, a notification will be sent
  when two users become a match
* We build our app entirely as a Single Page Application with Redux
  and React-Router.

## What interesting stuff does your app include beyond the project requirements?
Beyond the project requirement, we also did more things to complete
and optimize our projects.
* we adapted the React-Icons in our javascript to beautify the page
  which we haven’t utilized in the past assignments. The React-Icons
  makes the page easier to navigate than the page with just plain
  text. 
* We use private router to ensure the user can only see the login page
  when he/she has logged out.
* To prevent the redux contains the previous state after the user
  returned to this change, we use componentDidMount to reset the
  corresponding state. 
* We also do some improvement on sign up page to give user hint about
  what is wrong, such as wrong email format, the passwords
  conformation is different as the previous typed one. 
* We used both ajax and channel for communication between client and
  server.

## What was the most significant challenge you encountered and how did you solve it?
* When doing recommendations, we found an asynchronous bug that ajax
  function will be called twice. The problem is browser need time to
  get the gps location. When calling ajax, the location has not been
  set yet. When the latitude and longitude has been set in the store,
  the rerender triggered and ajax call will be called again. To solve
  this problem, we initialize the latitude and longitude as null. If
  the user allowed location access, we change the latitude and
  longitude with true values. Otherwise we set them to 0. In render
  method, we use a if condition to check if the latitude and longitude
  are still null. We proceed only we get the value. In this way, we
  solve the asynchronous problem.
* Compared to the game project, the channel part is more complex since
  we implement the chat functionality. Instead using a single channel
  and using handle out to filter by id. We let the user to join
  multiple channel. For each matched people, the user have to join a
  channel with him/her. By doing this, the speed of passing message
  should be faster since each channel process its own message. What’s
  more, it simplify the code complexity. The messages are sent through
  channel and can be backuped in a backup agent.   





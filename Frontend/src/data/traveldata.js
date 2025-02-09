// this file make it easier to fetch and upload data to a data base...
import dashboard from '../assets/images/dashboard3.gif';
import memoryimg from '../assets/images/memory.png';

import place1 from "../assets/images/img.jpg";
import place2 from "../assets/images/img2.webp";
import place3 from "../assets/images/img3.webp";
import place4 from "../assets/images/img4.webp";
import place5 from "../assets/images/img5.jpg";
import place6 from "../assets/images/img6.webp";
import place7 from "../assets/images/img7.webp";
import place8 from "../assets/images/img8.webp";
import place9 from "../assets/images/img9.webp";
import place10 from "../assets/images/img10.webp";
import place11 from "../assets/images/img1.webp";
import place12 from "../assets/images/img2.webp";


import facebook from '../assets/images/facebook.svg';
import instagram from '../assets/images/instagram.svg';
import twitter from '../assets/images/twitter.svg';
import youtube from '../assets/images/youtube.svg';

export const hero = {
  'title':'The world is here...',
  'subTitle':'Where are You?',
  'text':'The true New Yorker secretly believes that people living anywhere else have to be, in some sense, kidding.”',
  'btn1':'Get Started',
  'btn2':'Explore',
  'img': dashboard,
}

export const navlinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Explore', path: '/explore' },  
  { label: 'Contact', path: '/contact' }
];




export const memory = {
  'title':'My Memories',
  'subtitle':'Come To Life Again',
  'text':'The gladdest moment in human life, methinks, is a departure into unknown lands',
  'img':memoryimg,
  'experience': [
    {'number':'10', 'title':'Years Experience'},
    {'number':'400', 'title':'Year Collaboration'},
    {'number':'30k+', 'title':'Happy Customer'},
  ]
};

export const placesAPI = [
  { "placeImg": place1, "location": "Delhi" },
  { "placeImg": place2, "location": "Bangalore"},
  { "placeImg": place3, "location": "Ahmedabad" },
  { "placeImg": place4, "location": "Jaipur" },
  { "placeImg": place5, "location": "Mumbai" },
  { "placeImg": place6, "location": "Manali" },
  { "placeImg": place7, "location": "Chennai" },
  { "placeImg": place8, "location": "Ranchi" },
  { "placeImg": place9, "location": "Kolkata" },
  { "placeImg": place10, "location": "Dehradun" },
  { "placeImg": place11, "location": "Kochi" },
  { "placeImg": place12, "location": "Goa" },
];

export const footerAPI = {
  "titles": [
    { "title": "About" },
    { "title": "Company" },
    { "title": "Support" }
  ],
  "links": [
    [
      { "link": "About Us", "url": "/about" },
      { "link": "Features", "url": "/about" },
      { "link": "Explore", "url": "/explore" },
      { "link": "Menu", "url": "/" }
    ],
    [
      { "link": "Why Travel Hogs", "url": "/about" },
      { "link": "Partner with Us", "url": "/contact" },
      { "link": "FAQ", "url": "/contact" },
      { "link": "Blog", "url": "/explore" }
    ],
    [
      { "link": "Account", "url": "/signup" },
      { "link": "Support Center", "url": "/contact" },
      { "link": "Feedback", "url": "/contact" },
      { "link": "Contact Us", "url": "/contact" },
      { "link": "Accessibility", "url": "/about" }
    ]
  ],
  "sociallinks": [
    { "icon": facebook, "link": "https://www.facebook.com" },
    { "icon": instagram, "link": "https://www.instagram.com" },
    { "icon": twitter, "link": "https://www.twitter.com" },
    { "icon": youtube, "link": "https://www.youtube.com" }
  ]
};
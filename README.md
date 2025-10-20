# Shop Demo Project

This is a simple e-commerce demo web app built with HTML, CSS, and JavaScript.  
It features a product shop, login/signup, profile panel, cart, points system, and day/night mode.

## Features

- **Product Shop:**  
  Products are loaded dynamically from [Fake Store API](https://fakestoreapi.com/).  
  You can search products by name and add them to your cart.

- **Cart & Points:**  
  Every time you add a product to the cart, it is saved in your browser's localStorage.  
  You earn 100 points for each product added.

- **Profile Panel:**  
  Shows your orders (cart), total price, points, and last login date.  
  You can also see your achievements and account info.

- **Login/Signup:**  
  Simple login and signup forms (no backend, just for demo).  
  Last login date is saved and shown in your profile.

- **Day/Night Mode:**  
  Toggle between day and night mode.  
  Your preference is remembered.

- **Responsive Design:**  
  Works on desktop and mobile.

## How to Run

1. **Clone or Download this repository.**
2. Open `index.html` in your browser to view the shop.
3. Use the navigation bar to access your profile, login, or change password.

## File Structure

```
/css
    logIn.css
    profile.css
    shop.css
/js
    logIn.js
    profile.js
    shop.js
/views
    changePass.html
    footer.html
    loginPage.html
    profile.html
index.html
```

## Tech Stack

- HTML5
- CSS3 (Flexbox, Grid, custom themes)
- JavaScript (ES6, localStorage, fetch API)

## Credits

- Product data: [Fake Store API](https://fakestoreapi.com/)
- Icons and images: Bing, Vecteezy, PNGTree, etc.

---

**This project is for educational/demo purposes only. No real authentication or payment is implemented.**

## [PureMVC](http://puremvc.github.com/) [JavaScript](https://github.com/PureMVC/puremvc-js-multicore-framework/wiki) [React](https://en.wikipedia.org/wiki/React_(JavaScript_library)) Demo - Employee Admin [![Node.js CI](https://github.com/saadshams/puremvc-js-demo-react-employeeadmin/actions/workflows/node.js.yml/badge.svg)](https://github.com/saadshams/puremvc-js-demo-react-employeeadmin/actions/workflows/node.js.yml)

This demo illustrates techniques for performing routine client-side maintenance operations in a PureMVC-based application.

## Installation
```shell
git clone https://github.com/PureMVC/puremvc-js-demo-microservice-employeeadmin
cd puremvc-js-demo-microservice-employeeadmin
docker compose up

cd ..

git clone https://github.com/PureMVC/puremvc-js-demo-react-employeeadmin 
cd puremvc-js-demo-react-employeeadmin 
npm install && npm run build && npm run preview
```

## Adminer
* Launch [Adminer](http://localhost:8080/?server=mysql&username=mysql&db=employeeadmin) pwd: password

## Screenshot
![PureMVC JavaScript Demo: Employee Admin](http://puremvc.org/pages/images/screenshots/PureMVC-Shot-JS-EmployeeAdmin2.png?github)

## Semantic HTML Components

```html
<section id="module">
  <div>
    <header></header>
    <main></main>
    <footer></footer>
  </div>
</section>
```

## CSS Property Order Reference

### Layout
- **System**: `display`, `content`
- **Grid**: `grid-template-columns`, `grid-template-rows`, `grid-column`, `grid-row`, `grid-gap`, `row-gap`, `column-gap`, `grid-template-areas`, `grid-area`, `justify-items`, `align-items`, `justify-content`, `align-content`
- **Flexbox**: `flex`, `flex-grow`, `flex-shrink`, `flex-basis`, `flex-direction`, `flex-wrap`, `flex-flow`, `justify-content`, `align-items`, `align-self`, `order`
- **Position**: `position`, `top`, `right`, `bottom`, `left`, `transform`, `float`, `clear`
- **Dimensions**: `width`, `height`, `min-width`, `min-height`, `max-width`, `max-height`, `box-sizing`, `scale`, `block-size`, `aspect-ratio`
- **Margin**: `margin`, `margin-top`, `margin-right`, `margin-bottom`, `margin-left`
- **Padding**: `padding`, `padding-top`, `padding-right`, `padding-bottom`, `padding-left`
- **Clipping**: `overflow-x`, `overflow-y`, `clip-path`, `mask`
- **Visibility**: `visibility`, `z-index`, `opacity`, `backface-visibility`, `appearance`

### Typography, Table, Column, List
- **Color**: `color`, `accent-color`, `color-scheme`
- **Font**: `font-family`, `font-style`, `font-variant`, `font-weight`, `font-size`, `line-height`
- **Text**: `text-align`, `text-decoration`, `text-indent`, `text-shadow`, `text-transform`, `text-rendering`, `text-size-adjust`, `writing mode`, `quotes`, `hyphens`, `tab-size`
- **Spacing & Alignment**: `letter-spacing`, `word-spacing`, `word-wrap`, `white-space`, `vertical-align`
- **Table**: `table`, `table-caption`, `table-cell`, `table-header-group`, `table-footer-group`, `table-row`, `table-row-group`, `table-column`, `table-column-group`, `table-layout`, `caption-side`
- **Column**: `column-count`, `column-gap`, `column-rule-style`, `column-rule-width`, `column-rule-color`, `column-rule`, `column-span`, `column-width`
- **List**: `list-style`, `list-style-position`, `list-style-image`, `list-style-type`

### Border & Outline
- **Border**: `border`, `border-top`, `border-right`, `border-bottom`, `border-left`, `border-width`, `border-style`, `border-color`
- **Border Radius & Spacing**: `border-radius`, `border-collapse`, `border-spacing`
- **Outline**: `outline`, `outline-color`, `outline-style`, `outline-width`, `outline-offset`

### Background & Effects
- **Background**: `background-color`, `background-image`, `background-position`, `background-size`, `background-clip`, `background-repeat`, `background-origin`, `background-attachment`
- **Effects**: `box-shadow`, `filter`, `backdrop-filter`
- **Animation**: `transition`, `prefers-reduced-motion`

### Interaction
- `cursor`, `caret-color`, `pointer-events`, `user-select`, `touch-action`, `tap-highlight-color`

## Open and Closed media queries

```css
@media screen and (max-width: 320px) { /* X-Small screens (phones) */ }
@media screen and (max-width: 576px) { /* X-Small screens (phones) */ }
@media screen and (max-width: 767px) { /* Small screens (phones) */ }

@media screen and (min-width: 768px) and (max-width: 1023px) { /* Medium screens (tablets) */ }

@media screen and (min-width: 1024px) { /* large screens (desktops) */ }
@media screen and (min-width: 1200px) { /* XX-Large devices (larger desktops) */ }
@media screen and (min-width: 1920px) { /* XX-Large devices (larger desktops) */ }
@media screen and (min-width: 2560px) { /* XXX-Large devices (larger desktops) */ }
@media screen and (min-width: 3840px) { /* X4K-Large devices (larger desktops) */ }

/* High-resolution displays (Retina, etc.) */
@media screen and (-webkit-min-device-pixel-ratio: 2),
screen and (min--moz-device-pixel-ratio: 2),
screen and (-o-min-device-pixel-ratio: 2/1),
screen and (min-resolution: 192dpi),
screen and (min-resolution: 2dppx) {}
```

## Status
Production - [Version 1.0.0](https://github.com/PureMVC/puremvc-js-demo-react-employeeadmin/blob/master/VERSION)

## Platforms / Technologies
* [React](https://en.wikipedia.org/wiki/React_(JavaScript_library))
* [JavaScript](http://en.wikipedia.org/wiki/JavaScript)
* [ECMA](https://en.wikipedia.org/wiki/ECMAScript)

## License
* PureMVC Javascript React Demo - Employee Admin - Copyright © 2024 [Saad Shams](https://www.linkedin.com/in/muizz), [Cliff Hall](https://www.linkedin.com/in/cliff)
* PureMVC - Copyright © 2024 Futurescale, Inc.
* All rights reserved.

* Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
    * Neither the name of Futurescale, Inc., PureMVC.org, nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

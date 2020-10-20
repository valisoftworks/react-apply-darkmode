# react-apply-darkmode

Apply dark mode directly to your React website or web app in one step; no manual
theming required! Reduce component complexity and CSS while still delivering a
high-quality dark mode experience that your users will greatly appreciate.

`react-apply-darkmode` is a wrapper around
[@darkreader/darkreader](https://github.com/darkreader/darkreader)'s ES6 API,
allowing you to control the dark mode functionality it provides with React
bindings. Your users **do NOT** need to have the Dark Reader extension installed
for dark mode to work.

## Installation

`npm i react-apply-darkmode`

`yarn add react-apply-darkmode`

## Usage

Use the `Interpolator` component to wrap your app at the top level:

##### `App.js`

```javascript
import {Interpolator} from 'react-apply-darkmode';

export default function App() {
  return (
    <Interpolator
      appearance='dark'
      watchSystem={false}
      filter={{brightness: 100, contrast: 90, sepia: 10}}>
      <MyApp />
    </Interpolator>
  );
}
```

## Props

| Prop        | Values                                                  | Purpose                                                                                                                                                                                                                                         |
| ----------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appearance  | `'dark'`, `'light'`, or `undefined`                     | `Interpolator` will apply this theme to your site; this is your manual control for dark mode. `appearance` is `undefined` by default; if `undefined`, no theme will be applied on mount (you can still use `watchSystem` to control dark mode). |
| watchSystem | `true` or `false`                                       | Apply dark mode based on the device's color scheme. This will override `appearance` if you've set it. `watchSystem` defaults to `false`. Not all browsers are supported; see Notes for more.                                                    |
| filter      | `{brightness: number, contrast: number, sepia: number}` | Dark mode's appearance filter. You can supply any number of these values or none at all; default is 100 brightness, 90 contrast, and 10 sepia.                                                                                                  |

## Notes

- `Interpolator` (or a component that utilizes it) should always your top-level
  component, such as in `App` in `App.js` if using Create React App or via
  `wrapRootElement` if using Gatsby. This will ensure that dark mode is ready
  before your components render, preventing undesirable flashes.

  You will only need to define `wrapRootElement` for Gatsby's browser API in
  `gatsby-browser.js`; you do not need do this in `gatsby-ssr.js`.

- `watchSystem` relies on the `prefers-color-scheme` CSS media feature, which
  some browsers may not support; privacy settings can also influence the value
  of `prefers-color-scheme`.

  Mozilla has compiled a list of compatible browsers
  [here](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme#Browser_compatibility).

## Tips

### Persistence

You will need to implement your own wrapper component or container to persist
dark mode across browser sessions by changing values supplied to the
`appearance` prop. `localStorage` and `redux` (with `redux-persist`) are both
good solutions.

### Colors

`react-apply-darkmode` will tone down bright colors and reduce contrast. Don't
assume that a color is going to work optimally in light and dark mode; always do
a visual test by switching between both modes!

### Images

Maximize transparency of image assets! `react-apply-darkmode` will not invert
images (to preserve your sanity), so make sure your images have transparent
backgrounds and transparency where color isn't needed.

Also, try to use colors that have good contrast in both light and dark mode.

### Theming Conflicts

Don't use another dark mode theming solution alongside `react-apply-darkmode`
(i.e. with React context/providers, CSS classes, or another package). This can
cause undesirable flickering effects when solutions try to compensate for each
other's changes.

### Component Library Issues

Certain UI component libraries don't work well with `react-apply-darkmode`.
Audit a library before choosing it! Installing the Dark Reader browser extension
(Chrome or Firefox, for best results) and exploring a component library's site
will give you a good idea of how well it works.

You can view a list of issue libraries
[here](https://github.com/valisoftpdx/react-apply-darkmode/wiki/Issue-Component-Libraries).

## Credits

This package was created by [Victor Li](https://github.com/victorli08), an avid
and longtime user of the Dark Reader extension.

`react-apply-darkmode` is made possible by open source code from
[@darkreader](https://github.com/darkreader/darkreader). If you like this
package, please give a shoutout to Dark Reader's developers and consider
sponsoring their project!

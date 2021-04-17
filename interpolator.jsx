import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

const defaultFilter = {
  brightness: 100,
  contrast: 90,
  sepia: 10
};

export default function Interpolator({
  appearance,
  watchSystem = false,
  filter,
  children
}) {
  if (window) {
    const {
      enable: enableDarkMode,
      disable: disableDarkMode
    } = require('darkreader');
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const [watchIsDark, setWatchIsDark] = useState(mq.matches);

    function updateWatch(update) {
      setWatchIsDark(update.matches);
    }

    useEffect(() => {
      mq.addEventListener('change', updateWatch);
      return () => mq.removeEventListener('change', updateWatch);
    }, [mq]);

    const filterProps = filter ? filter : defaultFilter;
    const {
      brightness = defaultFilter.brightness,
      contrast = defaultFilter.contrast,
      sepia = defaultFilter.sepia
    } = filterProps;

    if (
      (watchSystem && watchIsDark) ||
      (!watchSystem && appearance === 'dark')
    ) {
      enableDarkMode({brightness, contrast, sepia});
    } else if (
      (watchSystem && !watchIsDark) ||
      (!watchSystem && appearance !== 'dark')
    ) {
      disableDarkMode();
    }
  }

  return children;
}

Interpolator.propTypes = {
  appearance: PropTypes.string,
  watchSystem: PropTypes.bool,
  filter: PropTypes.shape({
    brightness: PropTypes.number,
    contrast: PropTypes.number,
    sepia: PropTypes.number
  }),
  children: PropTypes.node
};

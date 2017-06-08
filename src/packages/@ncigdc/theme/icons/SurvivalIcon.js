// @flow
import React from 'react';

export default ({ style, ...props }) =>
  <svg
    viewBox="0 0 2048 1536"
    style={{
      height: '0.8em',
      fill: 'currentcolor',
      ...style,
    }}
    {...props}
  >
    <path d="m 1917.282,1250.0708 0,-435.00002 c 0,-14 -6.5,-23.83333 -19.5,-29.5 -13,-5.66667 -24.8333,-3.16667 -35.5,7.5 l -121,121.00002 -632.9999,-633.00002 c -6.6667,-6.66667 -14.3334,-10 -23,-10 -8.6667,0 -16.3334,3.33333 -23,10 l -233.00004,233 -416,-416 -192,192 585,585.00002 c 6.66667,6.6667 14.33333,10 23,10 8.66667,0 16.33333,-3.3333 23,-10 l 233.00004,-233.00002 463.9999,464.00002 -121,121 c -10.6667,10.6667 -13.1667,22.5 -7.5,35.5 5.6667,13 15.5,19.5 29.5,19.5 l 435,0 c 9.3333,0 17,-3 23,-9 6,-6 9,-13.6667 9,-23 z" />
    <path d="m 2048,1408 0,128 L 0,1536 0,0 l 127.99999,0 0,1408 z" />
  </svg>;

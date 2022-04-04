import contextualise from '../contextualise/src/contextualise';
import React, { useState } from 'react';

const useBanner = () => {
  const [banner, setBanner] = useState(<></>);
  return { banner, setBanner };
};

let [useBannerGlobal, BannerProvider] = contextualise(useBanner, [], undefined);

export { BannerProvider, useBannerGlobal as useBanner };
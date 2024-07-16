"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import React from "react";

const BarProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#fffd00"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default BarProviders;

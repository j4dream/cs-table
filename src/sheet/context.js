import React, { useState } from 'react';

const CSSheetContext = React.createContext({});

export const CSSheetProvider = (props) => {

  const { children, ctx } = props;

  return (
    <CSSheetContext.Provider ctx={ctx}>{children}</CSSheetContext.Provider>
  );
}

import React, { useState } from 'react';

const CSSheetContext = React.createContext({});

export const CSSheetProvider = (props) => {

  const { children } = props;

  const [state, setState] = useState({

  });

  return (
    <CSSheetContext.Provider>{children}</CSSheetContext.Provider>
  );
}

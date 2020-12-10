import React, { useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { ErrMsg } from './validateElements';

export const Error = (err, name) => {
  const [isShown, setIsShown] = useState(true);

  const shown = () => {
    const timeout = setTimeout(
      () => {
        setIsShown(!isShown);
      },
      5000,
      setIsShown(!isShown)
    );
    return () => {
      clearTimeout(timeout);
    };
  };

  return (
    <>
      <ErrorMessage
        errors={err}
        name={name}
        as={<ErrMsg show={shown} />}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <p key={type}>{message}</p>
          ))
        }
      />
    </>
  );
};

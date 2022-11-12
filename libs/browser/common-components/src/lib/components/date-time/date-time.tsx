import React from 'react';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';

interface Props {
  value?: string;
}

export function DateTime({ value }: Props) {
  if (!value) {
    return null;
  }

  const dateTime = format(parseISO(value), 'M月dd日 H:mm');

  return <span>{dateTime}</span>;
}

import { errorExchange as urqlErrorExchange } from 'urql';

export const errorExchange = urqlErrorExchange({
  onError: (error, operation) => {
    if (operation.kind === 'query') {
      throw error;
    }
  },
});

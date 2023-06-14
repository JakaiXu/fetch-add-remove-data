import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { serializeError } from "serialize-error";
function useThunk(thunk: any) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const runThunk = useCallback(
    (arg: any) => {
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap()
        .catch((err: typeof serializeError) => setError(err))
        .finally(() => {
          setIsLoading(false);
        });
    },
    [dispatch, thunk]
  );
  return [runThunk, isLoading, error] as const;
}
export { useThunk };

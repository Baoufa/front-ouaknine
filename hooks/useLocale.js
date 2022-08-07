import { useRouter } from 'next/router';

function useLocale() {
  const router = useRouter();
  return router.locale;
}

export default useLocale;
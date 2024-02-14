import Head from 'next/head';
import { useRouter } from 'next/router';

type Props = {
  title?: string;
  description?: string;
};

export default function SEO({ title, description }: Props) {
  const router = useRouter();

  const pageTitle = title ? `${title} | 너는, 나는` : '너는, 나는';
  const pageDescription =
    description ||
    "너는 어떻게 생각해? 나는… '너는, 나는'으로 일상의 작은 궁금증부터 깊은 대화까지, 서로를 더 가까이에서 알아가세요";
  const pageUrl = 'https://youare-iam.vercel.app' + router.asPath;
  const pageImage = '/default-og.png';

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:url" content={pageUrl} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@youare_iam_" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
    </Head>
  );
}

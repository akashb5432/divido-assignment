import { GetServerSideProps, NextPage } from 'next';
import LenderName from 'components/lenderName';
import fetchUtil from 'utils/fetchUtil';
import { lenderUrl } from 'utils/urlUtil';
import { LenderGetResponse } from 'lib/types';

interface LenderNamePageProps {
  formData: LenderGetResponse;
}

const LenderNamePage: NextPage<LenderNamePageProps> = (props) => {
  return <LenderName {...props} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const lenderSlug = context?.params?.lenderName?.toString();
  const getFormData = await fetchUtil(`${lenderUrl}/${lenderSlug}`, 'GET', {});
  return {
    props: {
      formData: getFormData,
    },
  };
};

export default LenderNamePage;

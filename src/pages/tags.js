
import Layout from '@/components/Layout';
import { useStore } from '@/store';
import { useRouter } from 'next/router';

const Tags = () => {
    const { tab, setTab } = useStore(state => state)

    const router = useRouter();


    return (
        <Layout>
            Tags

        </Layout>
    )

}
export default Tags;
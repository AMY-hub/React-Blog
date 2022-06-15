import { useState } from 'react';

import { FilterPanel } from '../../components/FilterPanel';
import { PostsSection } from '../../components/PostsSection';

import styles from './style.module.scss';

export const MainPage = () => {

    const [selectedPosts, setSelectedPosts] = useState('Latest posts');

    return (
        <main className={styles.main}>
            <FilterPanel
                selectedPosts={selectedPosts}
                setSelectedPosts={setSelectedPosts}
            />
            <PostsSection selectedPosts={selectedPosts} />
        </main>
    )
}

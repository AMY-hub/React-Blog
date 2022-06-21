import { useState } from 'react';

import { FilterPanel } from '../../components/FilterPanel';
import { PostsSection } from '../../components/PostsSection';

import styles from './style.module.scss';

export const MainPage = () => {

    return (
        <main className={styles.main}>
            <FilterPanel />
            <PostsSection />
        </main>
    )
}

import Link from "next/link";
import React from "react";
import styles from "./menuCategories.module.css";

const MenuCategories = () => {
  return (
		<div className={styles.categoryList}>
			<Link
				href="/blog?cat=software+development"
				className={`${styles.categoryItem} ${styles.style}`}
			>
				Software Development
			</Link>
			<Link
				href="/blog?cat=copywriting"
				className={`${styles.categoryItem} ${styles.fashion}`}
			>
				Copy Writing
			</Link>
			<Link
				href="/blog?cat=UI/UX"
				className={`${styles.categoryItem} ${styles.food}`}
			>
				UI/UX
			</Link>
			<Link
				href="/blog?cat=creative+writing"
				className={`${styles.categoryItem} ${styles.travel}`}
			>
				Creative Writing
			</Link>
			<Link
				href="/blog?cat=travel"
				className={`${styles.categoryItem} ${styles.culture}`}
			>
				Travel
			</Link>
			<Link
				href="/blog?cat=coding"
				className={`${styles.categoryItem} ${styles.coding}`}
			>
				Coding
			</Link>
		</div>
	);
};

export default MenuCategories;

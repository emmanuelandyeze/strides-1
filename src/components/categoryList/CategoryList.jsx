import React from "react";
import styles1 from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";
import MenuCategories from "../menuCategories/MenuCategories";
import styles from '../../components/menuCategories/menuCategories.module.css'

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const CategoryList = async () => {
  const data = await getData();
  return (
		<div className={styles1.container}>
			{/* <h1 className={styles.title}>Popular Categories</h1> */}

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
		</div>
	);
};

export default CategoryList;

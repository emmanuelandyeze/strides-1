"use client";

import Image from "next/image";
import styles from "./writePage.module.css";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import dynamic from "next/dynamic";

const WritePage = () => {
  const { status } = useSession();
	const router = useRouter();
	const ReactQuill = dynamic(() => import('react-quill'), {ssr: false})

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");

  const formats = [
		'header',
		'font',
		'size',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
		'link',
		'image',
		'color',
		'code-block',
	]; 

  useEffect(() => {
    const storage = getStorage(app);
    const upload = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };

    file && upload();
  }, [file]);

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug || "general", //If not selected, choose the general category
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    }
  };

  return (
		<div className={styles.container}>
			<input
				type="text"
				placeholder="Title"
				className={styles.input}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<select
				className={styles.select}
				onChange={(e) => setCatSlug(e.target.value)}
			>
				<option value="">--Select Category--</option>
				<option value="software development">Software development</option>
				<option value="copywriting">Copywriting</option>
				<option value="UI/UX">UI/UX</option>
				<option value="creative writing">Creative writing</option>
				<option value="travel">Travel</option>
				<option value="coding">Coding</option>
			</select>
			<div className={styles.editor}>
				<button
					className={styles.button}
					onClick={() => setOpen(!open)}
				>
					<Image
						src="/plus.png"
						alt=""
						width={16}
						height={16}
					/>
				</button>
				{open && (
					<div className={styles.add}>
						<input
							type="file"
							id="image"
							onChange={(e) => setFile(e.target.files[0])}
							style={{ display: 'none' }}
						/>
						<button className={styles.addButton}>
							<label htmlFor="image">
								<Image
									src="/image.png"
									alt=""
									width={16}
									height={16}
								/>
							</label>
						</button>
						<button className={styles.addButton}>
							<Image
								src="/external.png"
								alt=""
								width={16}
								height={16}
							/>
						</button>
						<button className={styles.addButton}>
							<Image
								src="/video.png"
								alt=""
								width={16}
								height={16}
							/>
						</button>
					</div>
				)}
				<ReactQuill
					className={styles.textArea}
					theme="bubble"
					value={value}
					onChange={setValue}
					formats={formats}
					modules={{
						toolbar: [
							[{ header: [1, 2, 3, 4, 5, 6, false] }],
							[
								'bold',
								'italic',
								'underline',
								'strike',
								'blockquote',
								'code-block',
							],
							[
								{ list: 'ordered' },
								{ list: 'bullet' },
								{ indent: '-1' },
								{ indent: '+1' },
							],
							['link', 'image'],
							['clean'],
						],
					}}
					placeholder="Share your thoughts..."
				/>
			</div>
			<button
				className={styles.publish}
				onClick={handleSubmit}
			>
				Publish
			</button>
		</div>
	);
};

export default WritePage;

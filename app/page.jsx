"use client";

import styles from "../styles/home.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SideNav from "@/components/SideNav";
import ContactsSection from "@/components/ContactsSection";
import PostInputBtn from "@/components/PostInputBtn";
import PostCardModal from "@/components/PostCardModal";
import PostedCard from "@/components/PostedCard";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [postedCardList, setPostedCardList] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPostCardModalOpen, setIsPostCardModalOpen] = useState(false);
  const [newPost, setNewPost] = useState(false);

  const user = useSelector((state) => state.user.value);

  if (!user.token) {
    redirect("/login");
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts");
        if (response.ok) {
          const data = await response.json();
          console.log(data.posts);
          setPostedCardList(data.posts.reverse());
        }
      } catch (error) {
        console.error("Error during getting posts", error);
      }
    };
    fetchPosts();
  }, [newPost]);

  const openPostCardModal = () => setIsPostCardModalOpen(true);
  const closePostCardModal = () => setIsPostCardModalOpen(false);

  const messages = postedCardList.map((post, i) => (
    <PostedCard key={i} author={post.author} content={post.content} date={post.createdAt} />
  ));

  return (
    <div className={styles.page}>
      <Header isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} />
      <div className={styles.main}>
        <SideNav />
        <Footer />
        <div className={styles.fluxContainer}>
          <div className={styles.flux}>
            <PostInputBtn onOpenPostCardModal={openPostCardModal} />
            {isPostCardModalOpen && <PostCardModal onClosePostCardModal={closePostCardModal} onNewPost={() => setNewPost(true)} />}
            {messages}
          </div>
        </div>
        <ContactsSection isDropdownOpen={isDropdownOpen} />
      </div>
    </div>
  );
}

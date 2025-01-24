"use client";

import styles from "../styles/home.module.css";
import Footer from "@/components/Footer";
import FollowingSection from "@/components/FollowingSection";
import ContactsSection from "@/components/ContactsSection";
import PostInputBtn from "@/components/PostInputBtn";
import PostCardModal from "@/components/PostCardModal";
import PostedCard from "@/components/PostedCard";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useHeader } from "@/contexts/HeaderContext";

export default function Home() {
  const [postedCardList, setPostedCardList] = useState([]);
  const [isPostCardModalOpen, setIsPostCardModalOpen] = useState(false);
  const [newPost, setNewPost] = useState(false);
  const [refreshPost, setRefreshPost] = useState(false);
  const { isSearchListOpen } = useHeader();

  const user = useSelector((state) => state.user.value);

  if (!user.publicId) {
    redirect("/login");
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/posts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPostedCardList(data.posts);
        }
      } catch (error) {
        console.error("Error during getting posts", error);
      }
    };
    fetchPosts();
  }, [newPost, refreshPost]);

  const openPostCardModal = () => setIsPostCardModalOpen(true);
  const closePostCardModal = () => setIsPostCardModalOpen(false);

  const handlePostDeleted = (deletedPostId) => {
    setPostedCardList((prevPosts) => prevPosts.filter((post) => post._id !== deletedPostId));
  };

  const handleRefresh = () => {
    setRefreshPost(!refreshPost);
  };

  const messages = postedCardList.map((post) => (
    <PostedCard
      key={post._id}
      author={post.author}
      content={post.content}
      date={post.createdAt}
      postId={post._id}
      likes={post.likes.length}
      onPostDeleted={handlePostDeleted}
      onRefresh={handleRefresh}
    />
  ));

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <FollowingSection />
        <Footer />
        <div className={styles.fluxContainer} style={{ position: "relative", zIndex: isSearchListOpen ? -1 : 1 }}>
          <div className={styles.flux}>
            <PostInputBtn onOpenPostCardModal={openPostCardModal} placeholder={`What's up, ${user.firstname} ?`} />
            {isPostCardModalOpen && <PostCardModal onClosePostCardModal={closePostCardModal} onNewPost={() => setNewPost(!newPost)} />}
            {messages}
          </div>
        </div>
        <ContactsSection />
      </div>
    </div>
  );
}

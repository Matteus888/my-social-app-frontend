import styles from "@/styles/searchBar.module.css";

import ContactCard from "./ContactCard";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SearchBar({ placeholder }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const pathname = usePathname();

  useEffect(() => {
    setSearchQuery("");
    setSearchResults([]);
  }, [pathname]);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length === 0) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/users/search?query=${query}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) {
        console.error("Failed to fetch search results:", res.status);
        throw new Error("User not found or unauthorized.");
      }
      const data = await res.json();
      setSearchResults(data.users);
    } catch (err) {
      console.error("Error during search:", err);
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input type="text" className={styles.input} placeholder={placeholder} onChange={handleSearch} value={searchQuery} />
      <div className={styles.searchResultsContainer}>
        {searchResults.map((user) => (
          <ContactCard
            key={user.publicId}
            name={user.fullName}
            image={user.avatar}
            imgWidth={25}
            imgHeight={25}
            fontSize={14}
            txtWidth={200}
            link={`/profile/${user.publicId}`}
          />
        ))}
      </div>
    </div>
  );
}
